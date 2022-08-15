import React, { useEffect } from 'react';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import NiahFlexi from './NiahFlexi';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setPricingConfigurations, setSubcriptionNew, setTotalScans, setUsers } from 'src/actions/pricingAction';
import NiahLite from './NiahLite';
import NiahEnterprise from './NiahEnterprise';
import SubscriptionNew from './SubscriptionNew';
import { licenseURL } from 'src';
import { setLicenseDetails } from 'src/actions/licensingAction';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

const Pricing = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const isAdmin = useSelector(state => state.account.isAdmin)
  const profile = useSelector(state => state.account)
  const subscription = useSelector(state => state.pricing.subscriptionNew)
  const update = useSelector(state => state.pricing.updateSubscription)

  useEffect(() => {

    getSubscriptionValues()
  /*  const getPricingData = async () => {
      const pricingData = await Axios('/data/subscription');
      dispatch(setPricingConfigurations(pricingData));
    }

    getPricingData(); */

  }, [update]);

  const getSubscriptionValues = async () => {
    try{
      const response = await Axios.get(`${licenseURL}get/subscription`)
      dispatch(setSubcriptionNew(response.data))
      const filterFlexi = response.data.filter(s => s.subscription_name == "NiahFlexi")[0]
      dispatch(setTotalScans(filterFlexi.scans))
      dispatch(setUsers(filterFlexi.users))
      if(isAdmin == 'yes'){
        try{
          const response = await Axios.post(`${licenseURL}get/license`,
          {
            code : profile.profileDetails.code,
            emailid :profile.profileDetails.email_id
          })
          dispatch(setLicenseDetails(response.data))
        } catch(error){
          console.log(error)
        }
      }
    } catch(error){
      console.log(error)
    }
  }
const handleChange = (event, newValue) => {
  setValue(newValue);
};
return (
  <Page title="Pricing">
    <SubscriptionNew subscription={subscription} />
    {
      /*
       <div className={classes.root}>

      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
        <Tab label="Free" />
        <Tab label="Niah Lite" />
        <Tab label="Niah Enterprise" />
        <Tab label="Niah Flexi" />
      </Tabs>

      <TabPanel value={value} index={0}>
        This is a basic subscription and to take advantage of our awesome premium features, please explore other subscription models.
      </TabPanel>
      <TabPanel value={value} index={1}>
        <NiahLite />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <NiahEnterprise />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <NiahFlexi />
      </TabPanel>
    </div>
      */
    }
  </Page>
);
}


export default Pricing;










