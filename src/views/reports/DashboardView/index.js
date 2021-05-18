import React, { useState, useEffect } from 'react';
import { Link as RouterLink ,useHistory } from 'react-router-dom';
import {
  Container,
  Grid,
  makeStyles,
  LinearProgress,
  Breadcrumbs,
  Button,
  Link,
  Menu,
  MenuItem,
  SvgIcon,
  Typography,
  Switch
  ,FormControl,Select,InputLabel
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
import ProjectList from './ProjectList';
import RoiPerCustomer from './RoiPerCustomer';
import SystemHealth from './SystemHealth';
import TeamTasks from './TeamTasks';
import TodaysMoney from './TodaysMoney';
import CONSTANTS from "../../../Util/Constants";
import MySnackbar from "../../../Shared/Snackbar/MySnackbar";
import NavigateNextIcon from '@material-ui/icons/NavigateNext';



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
  },formControl: {
    margin: 0,
    minWidth: 120,
  },
}));



function DashboardView() {

  let history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [dashboardData, setDashboardData] = useState();
  const [mainData, setMainData] = useState();
  const [selectData, setSelectData] = useState('dependancies');
  const [switchData, setSwitchData] = useState(false);
  const [countData, setCountData] = useState(false);
  const query  = new URLSearchParams(window.location.search);

  useEffect(() => {
    const updateSnackbar = (open, message) => {
      setSnackbarOpen(open);
      setSnackbarMessage(message)
      const list = query.get('list')
      if(list=='org'){
        setSwitchData(true);
      } else {
        setSwitchData(false);
      }
    }

    const fetchDashboardDetails = async () => {
      try {
        setLoading(true);
        
        /*const url = `/dashboard/${authService.getUserName()}`;*/
        const url = `/dashboard`;
        const response = await Axios.get(url);
        setMainData(response.data);
        const list = query.get('list');
        const type = query.get('type');
        setCountData(Object.keys(response.data).length);
        if(response.data.user_id) {          
          sessionStorage.setItem("loginuserid", response.data.user_id);
          localStorage.setItem('loginuserid', response.data.user_id);
        } 
        
        if(type){
          setSelectData(type);
          if(list=='org'){
            setDashboardData(response.data[type].org);
          } else {
            setDashboardData(response.data[type].user);
          }   
        } else {
          if(list=='org'){
            setDashboardData(response.data.dependancies.org);
          } else {
            setDashboardData(response.data.dependancies.user);
          }
        }
        
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

  const handleChange = (event) => {
    const checked = event.target.checked;  
    if(checked){
      query.set('list', 'org');
      history.push('/app/reports/dashboard/?'+query.toString());
    } else {
      query.delete('list');
      if(query.toString()){
        history.push('/app/reports/dashboard/?'+query.toString())
      } else {
        history.push('/app/reports/dashboard')  
      } 
    }
    history.go(0);
  };

  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectData(value);     
    /*const list = query.get('list');
    const list = query.get('list');*/
    if(value!='dependancies'){
      query.set('type', value);
      history.push('/app/reports/dashboard/?'+query.toString());
    } else {
      query.delete('type');
      if(query.toString()){
        history.push('/app/reports/dashboard/?'+query.toString())
      } else {
        history.push('/app/reports/dashboard')  
      }      
    }
    history.go(0);
  };

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
      <Grid
      container
      spacing={3}
      justify="space-between"
      className="dashboardtitle"
    >
      {
          countData > 1 && (
            <>
            <Grid xs={12} container justify="flex-end">
            <FormControl variant="outlined" className={classes.formControl}>
              <Select native value={selectData} onChange={handleSelect.bind(this)} handleSelect >
              {Object.entries(mainData).map(([key, value]) => {
                  return (
                      key!='user_id'?<option value={key} key={key} >{key}</option>:''  
                      
                  );
              })}
            </Select>
            </FormControl> 
          </Grid>
            </>
           )
      }     
      
      <Grid item>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link
            variant="body1"
            color="inherit"
            to="/app"
            component={RouterLink}
          >
            Dashboard
          </Link>
        </Breadcrumbs>
      </Grid>
      <Grid item
      className="pubdate-button"
      >  
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>          
          <Grid item>Private Reports</Grid>
          <Grid item>
            <Switch
            checked={switchData}
            onChange={handleChange}
            name="checkorg"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
          </Grid>
          <Grid item>Organization </Grid>
        </Grid>
      </Typography>
      </Grid>      
    </Grid>
      
        {
          dashboardData && (
            <>
              <Grid
                container
                style={{ marginTop: 10,marginBottom: 10 }}
                spacing={2}
                className="dashboardData"
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
                        className="products_summary"
                      >
                  <RealTime headtitle="Libraries with most vulnerabilities" lib_details={dashboardData['products_summary']} />

                  </Grid>
                  <Grid
                        item
                        style={{ marginBottom: 10 }}
                        className="projects_summary"
                        lg={12}
                        xs={12}
                      >
                  <ProjectList lib_details={dashboardData['projects_summary']} />
                  
                  </Grid>
                </Grid>
                <Grid
                    item
                    lg={9}
                    xs={12}
                    className="chartlist"
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
                  className="open_vulnerabilities"
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

