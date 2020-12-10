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
import ChartSecond from './ChartSecond';
import RealTime from './RealTime';
import TableList from './TableList';
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
    paddingBottom: theme.spacing(3),
  },
  container: {
    [theme.breakpoints.up('lg')]: {
    },
    paddingLeft: 45,
    paddingRight: 45 
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
        /*const url = `/dashboard/${authService.getUserName()}`;*/
        const url = `/dashboard`;
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
              <Grid
                container
                style={{ marginTop: 10,marginBottom: 10 }}
                spacing={2}
              >

                {
                  dashboardData.headers.map((header,index) => {
                    return (
                      <Grid
                        item
                        lg={3}
                        sm={6}
                        xs={12}
                      >
                        {Object.keys(header).map(key => 
                          <TodaysMoney header={key} index={index%4} value={header[key]} />
                        )}
                      </Grid>
                    )
                  })  

                }
              </Grid>
              <Grid
                container
                spacing={2}
              >
                <Grid
                  item
                  lg={3}
                  xs={12}
                >
                  <Grid
                        item
                        style={{ marginBottom: 10 }}
                        lg={12}
                        xs={12}
                      >
                  <TableList lib_details={dashboardData['products_summary']} />

                  </Grid>
                  <Grid
                        item
                        style={{ marginBottom: 10 }}
                        lg={12}
                        xs={12}
                      >
                  <TableList lib_details={dashboardData['products_summary']} />
                  
                  </Grid>
                </Grid>
                <Grid
                    item
                    lg={9}
                    xs={12}
                  >
                
                  {
                    Object.entries(dashboardData.charts).map(([rkey, row],i) =>(
                      Object.entries(row).map(([ckey, charts],k) =>(<>
                        <Grid
                          item
                          style={{ marginBottom: 10 }}
                          lg={12}
                          xs={12}
                        >
                         {ckey=='chart1'?(<PerformanceOverTime chartsMainKey={k} chartsKey={ckey} chartsData={charts}/>):(<ChartSecond chartsMainKey={k} chartsKey={ckey} chartsData={charts}/>)}
                         </Grid>
                        </>))
                    ))
                  } 
                  </Grid>
              </Grid>
              <Grid
                container
                spacing={2}
              >
              <Grid
                  item
                  lg={12}
                  xl={12}
                  xs={12}
                >
                  <LatestProjects project_details={dashboardData.open_vulnerabilities} />
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
