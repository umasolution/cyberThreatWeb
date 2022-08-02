import React, { useEffect } from 'react';
import Page from 'src/components/Page';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import { setPricingConfigurations } from 'src/actions/pricingAction';
import NiahFlexi from '../NiahFlexi';
import { licenseURL } from 'src';


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

const NiahFlexiSubscription = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);

  useEffect(() => {


    const getPricingData = async () => {
      const pricingData = await Axios.get(`${licenseURL}get/subscription`);
      console.log(pricingData)
    }

    getPricingData();

  }, []);


const handleChange = (event, newValue) => {
  setValue(newValue);
};
return (
  <Page title="Flexi-Pricing">
    <div className={classes.root}>

      <Tabs value={value} onChange={handleChange} aria-label="simple tabs example" centered>
        <Tab label="Niah Flexi" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <NiahFlexi />
      </TabPanel>
    </div>
  </Page>
);
}


export default NiahFlexiSubscription;










