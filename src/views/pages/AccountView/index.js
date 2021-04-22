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
  const [currentTab, setCurrentTab] = useState('general');
  const [userProfileData, setUserProfileData] = useState();
  const tabs = [
    { value: 'general', label: 'General' },
    { value: 'subscription', label: 'Subscription' },
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
        updateSnackbar(true, CONSTANTS.FETCHING_DATA);
        const url = `/getProfile`;
        let response = await Axios.get(url);        
        setUserProfileData(response.data);       
        
        updateSnackbar(true, CONSTANTS.FETCHING_DATA_SUCCESS);
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
    setCurrentTab(value);
  };

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
            {tabs.map((tab) => (
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
          {currentTab === 'subscription' && userProfileData && <Subscription subscription={userProfileData.subscription} />}
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
