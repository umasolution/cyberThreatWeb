import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Divider,
  Tab,
  Tabs,
  makeStyles,
  LinearProgress
} from '@material-ui/core';
import Page from 'src/components/Page';
import Axios from 'axios';
import Header from './Header';
import General from './General';
import Subscription from './Subscription';
import Notifications from './Notifications';
import Security from './Security';
import CONSTANTS from "../../../Util/Constants";
import authService from "../../../services/authService";
import MySnackbar from './../../../Shared/Snackbar/MySnackbar';
import { useDispatch, useSelector } from 'react-redux';
import { setSubcriptionNew, setTotalScans, setUsers } from 'src/actions/pricingAction';
import SubscriptionNew from '../Pricing/SubscriptionNew';
import PricingView from '../PricingView';
import { licenseURL } from 'src';
import { setLicenseDetails } from 'src/actions/licensingAction';



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function AccountView() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [currentTab, setCurrentTab] = useState('general');
  const [userProfileData, setUserProfileData] = useState();
  const isAdmin = useSelector(state => state.account.isAdmin)
  const profile = useSelector(state => state.account)
  const subscription = useSelector(state => state.pricing.subscriptionNew)
  const adminTabs = [
    { value: 'general', label: 'General' },
    { value: 'subscription', label: 'Subscription' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Security' }
  ];
  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'notifications', label: 'Notifications' },
    { value: 'security', label: 'Security' }
  ];
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


  useEffect(() => {
    const updateSnackbar = (open, message) => {
      setSnackbarOpen(open);
      setSnackbarMessage(message)
    }
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        
        const url = `/getProfile`;
        let response = await Axios.get(url);        
        setUserProfileData(response.data);       
        
        
        setLoading(false);
      } catch (error) {
        console.error(error);
        updateSnackbar(true, CONSTANTS.FETCHING_DATA_FAILED);
        setLoading(false);
      }
    }
    fetchUserProfile();
  }, []);



  const handleTabsChange = (event, value) => {
    if(value == 'subscription'){
      getSubscriptionValues()
    }
    setCurrentTab(value);
  };

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
          dispatch(setLicenseDetails(response))
        } catch(error){
          console.log(error)
        }
      }
    } catch(error){
      console.log(error)
    }
  }

  const getLoader = () => {
    if (loading) {
        return <LinearProgress style={{ margin: '15px' }} />
    }
    return null;
}

const updateSnackbar = (open, message) => {
  setSnackbarOpen(open);
  setSnackbarMessage(message)
}

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container maxWidth>
        <Header />
        <Box mt={3}>
          <Tabs
            onChange={handleTabsChange}
            scrollButtons="auto"
            value={currentTab}
            variant="scrollable"
            textColor="secondary"
            className={classes.tabs}
          >
            {isAdmin ?
              adminTabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              )) :
              tabs.map((tab) => (
                <Tab
                  key={tab.value}
                  label={tab.label}
                  value={tab.value}
                />
              ))}
          </Tabs>
        </Box>
        <Divider />
        <Box mt={3}>
          {currentTab === 'general' && userProfileData && <General general={userProfileData.general} />}
          {/*currentTab === 'subscription' && userProfileData && <Subscription subscription={userProfileData.subscription} />*/}
          {currentTab === 'subscription' && userProfileData && <SubscriptionNew subscription={subscription} />}
          {currentTab === 'notifications' && userProfileData && <Notifications general={userProfileData.general} notification={userProfileData.notification} />}
          {currentTab === 'security' && userProfileData && <Security security={userProfileData.Security} />}
        </Box>
        {loading ? getLoader() : null}
        <MySnackbar closeSnackbar={() => updateSnackbar(false, '')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />

      </Container>
    </Page>
  );
}

export default AccountView;
