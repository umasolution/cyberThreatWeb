import { Box, Container, Divider, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authService from 'src/services/authService';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import MySnackbar from "../../Shared/Snackbar/MySnackbar";
import CONSTANTS from "../../Util/Constants";
import Issues from './Issues/Issues';
import ReportHeader from './ReportHeader/ReportHeader';
import JsonFiles from './JsonFiles/JsonFiles';
import TabPanel from "../Feed/TabPanel/TabPanel";
import Dependencies from './Issues/Dependencies';
import DockerIssues from './DockerIssues/DockerIssues';
import File from './Issues/File/File';
import Remediation from './Remediation/Remediation';
import ReportSummary from './ReportSummary/ReportSummary';
import DockerSummaries from './DockerSummaries/DockerSummaries';
import DockerPackages from './DockerPackages/DockerPackages';
import Page from 'src/components/Page';
import './ProductsReports.css';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#fafafc',
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    [theme.breakpoints.up('lg')]: {
    },
    paddingLeft: 45,
    paddingRight: 45 
  },
  scanBtn : {
    marginLeft :'auto',
    height : '35px',
    marginBottom : '10px !important',
    padding : '10px !important'
  }
}));

const ProductsReports = () => {
  const classes = useStyles();

  const { reportName, projectId  } = useParams();
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [productReportResponse, setProductReportResponse] = useState();
  const [tabValue, setTabValue] = React.useState(0);
  const [isDocker, setIsDocker] = React.useState(false);
  const [scanStatus,setScanStatus] = useState(false);

  const tasks = useSelector(state=>state.tasks.tasks);

  const dispatch = useDispatch();


  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    fetchProductsReports();
    dispatch({type:"POLL_DATA_SAGA"});

    return function cleanUp(){
      dispatch({type:"CANCEL_POLLING"});
    }
  }, [reportName, projectId]);

  const fetchProductsReports = async () => {
    try {
      setLoading(true);
      
      const url = `/report/reportname`;
      /*const url = `/report/project/reportname`;*/
      const response = await Axios.post(url, {
        project_id: projectId,
        report_name: reportName
      });
      const res = response.data;
      if (res.header.report_type) {
        setReportType(res.header.report_type);
      }
      if (res.header.scanner_type) {
        setReportType(res.header.scanner_type);
      }
      if (res.header.docker && res.header.docker === 'True') {
        setIsDocker(true);
      }
      setProductReportResponse(res);
      
      setLoading(false);
    } catch (error) {
      console.error(error);
      updateSnackbar(true, CONSTANTS.FETCHING_DATA_FAILED);
      setLoading(false);
    }
  }

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

  const onScan = async () => {
    setScanStatus(false);
    console.log(productReportResponse);
    let url = "/offline/scan";
    let response = null;
    if(productReportResponse.header.repoType != 'local'){
      url = '/online/scan';
      response = await Axios.post(url,
                                    {
                                      projectId : projectId
                                    })
    }else{
     
       response = await Axios.post(url,
                                      {
                                        //  reportname : scanData.option.scan_insights.reportname,
                                          projectid : projectId
                                        });
    }

    setScanStatus(false);
  }

  const getDockerTabs = () => {
    return (
      <>
        <AppBar style={{ width: '100%' }} className="tabs" position="static">
          <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Summary" />
            <Tab label="Issues" />
            <Tab label={"Inventory"} />
          </Tabs>
          
        </AppBar>
        
        <TabPanel value={tabValue} index={0}>
          
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <DockerIssues reportType={reportType} reportName={reportName} issues={productReportResponse.images} />
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          <DockerPackages
            reportType={reportType}
            packages={productReportResponse.packages}
          />

        </TabPanel>
        
      </>
    );
  }

  const getNonDockerTabs = () => {
    return (
      <>
        <AppBar style={{ width: '100%',    boxShadow: 'none' }} className="tabs" position="static">

          <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
            {productReportResponse.summary ? <Tab  className="summary-tab" label="Summary" /> : ''}
            <Tab className="issue-tab" label="Issues" />
            <Tab className="inventory-tab" label="Inventory" />
            {((reportType === 'platform' || reportType === 'system' )) ? <Tab className="remediation-tab" label="Remediation" /> : ''}
            <Button className={classes.scanBtn} 
                    disabled = {!(tasks.findIndex(d => d.project_id == projectId) == -1) }
                    variant="outlined" onClick={onScan}>
                      { tasks.findIndex(d => d.project_id == projectId) == -1 ? 'Scan' : 'Scanning ...'}
              </Button>
          </Tabs>
        
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          {productReportResponse.summary ? (
            <ReportSummary
              summary={productReportResponse.summary}
              headerDate={productReportResponse.header.Date}
              projectName={productReportResponse.header.Project}
            />
          ) : ''}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <Issues reportType={reportType} 
                  reportName={reportName} 
                  issues={productReportResponse.Issues} 
                  counter={productReportResponse.summary.counter} 
                  historydata={productReportResponse.summary.history} 
                  projectId={projectId}
                  notification = {productReportResponse.notification}
                  issueData = {productReportResponse.issue_data}/>
                  

        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {productReportResponse.inventory ? (<Dependencies issues={reportType === 'application' ? productReportResponse.inventory : productReportResponse.inventory} reportType={reportType} reportName={reportName} counter={productReportResponse.summary.counter} historydata={productReportResponse.summary.history} projectId={projectId}  />) : ''}             
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Remediation remediation={productReportResponse.remediation} counter={productReportResponse.summary.counter} reportName={reportName} historydata={productReportResponse.summary.history} projectId={projectId} />
        </TabPanel>
      </>
    );
  }

  const getTabs = () => {
    return (
      <div className={classes.root}>
        {getNonDockerTabs()}
      </div>
    );
  }


  return (
  <Page
          className={classes.root}
          title="My Report"
        >
    <Container className={classes.container} maxWidth={false}>
      <Grid
        container
        spacing={1}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="left"
          height="100%"
          style={{ marginTop: '25px',width: '100%' }}
        >
          {productReportResponse ?
            (
              <>
                <Box className="report-header-data"><ReportHeader header={productReportResponse.header} projectId = {projectId} /></Box>
                <Box className="report-tabs-data">{getTabs()}</Box>
              </>
            )
            : ''}

          {(loading && !productReportResponse) ? getLoader() : null}
          <MySnackbar closeSnackbar={() => updateSnackbar(false, '')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />

        </Box>
      </Grid>
    </Container>
    </Page>

  );
};

export default ProductsReports;