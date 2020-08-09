import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  LinearProgress
} from '@material-ui/core';
import Page from 'src/components/Page';
import Axios from 'axios';
import authService from 'src/services/authService';
import Header from './Header';
import LatestProjects from './LatestProjects';
import NewProjects from './NewProjects';
import PerformanceOverTime from './PerformanceOverTime';
import RealTime from './RealTime';
import RoiPerCustomer from './RoiPerCustomer';
import SystemHealth from './SystemHealth';
import TeamTasks from './TeamTasks';
import TodaysMoney from './TodaysMoney';
import CONSTANTS from "../../../Util/Constants";
import MySnackbar from "../../../Shared/Snackbar/MySnackbar";



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  },
  container: {
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 64,
      paddingRight: 64
    }
  }
}));

function DashboardView() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dashboardData, setDashboardData] = useState();


  useEffect(() => {
    const updateSnackbar = (open, message) => {
      setSnackbarOpen(open);
      setSnackbarMessage(message)
    }
    const fetchDashboardDetails = async () => {
      try {
        setLoading(true);
        updateSnackbar(true, CONSTANTS.FETCHING_DATA);
        const url = `/dashboard/${authService.getUserName()}`;
        const response = await Axios.get(url);
        setDashboardData(response.data);
        updateSnackbar(true, CONSTANTS.FETCHING_DATA_SUCCESS);
        setLoading(false);
      } catch (error) {
        console.error(error);
        updateSnackbar(true, CONSTANTS.FETCHING_DATA_FAILED);
        setLoading(false);
      }
    }
    fetchDashboardDetails();
  }, []);

  const updateSnackbar = (open, message) => {
    setSnackbarOpen(open);
    setSnackbarMessage(message)
  }

  const getLoader = () => {
    if (loading) {
      return <LinearProgress style={{ margin: '15px' }} />
    }
    return null;
  }



  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container
        maxWidth={false}
        className={classes.container}
      >
        {
          dashboardData && (
            <>
              <Header />
              <Grid
                container
                spacing={1}
              >

                {
                  dashboardData.headers.map(header => {
                    return (
                      <Grid
                        item
                        lg={3}
                        sm={6}
                        xs={12}
                      >
                        {Object.keys(header).map(key =>
                          <TodaysMoney header={key} value={header[key]} />
                        )}

                      </Grid>
                    )
                  })

                }
              </Grid>
              <Grid
                container
                spacing={1}
              >
                <Grid
                  item
                  lg={3}
                  xs={12}
                >
                  <RealTime lib_details={dashboardData['Open Source Libraries Details']} />
                </Grid>
                <Grid
                  item
                  lg={9}
                  xs={12}
                >
                  <PerformanceOverTime chartsData={dashboardData.charts}/>
                </Grid>
                <Grid
                  item
                  lg={3}
                  xl={3}
                  xs={12}
                >
                  <TeamTasks project_vuln_details={dashboardData.project_vuln_details} />
                </Grid>
                <Grid
                  item
                  lg={9}
                  xl={9}
                  xs={12}
                >
                  <LatestProjects project_details={dashboardData.project_details} />
                </Grid>
              </Grid>
            </>
          )
        }
        {loading ? getLoader() : null}
        <MySnackbar closeSnackbar={() => updateSnackbar(false, '')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />

      </Container>
    </Page>
  );
}

export default DashboardView;
