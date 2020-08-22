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
import './ProductsReports.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: '#f1f1f1',
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
}));

const ProductsReports = () => {
  const classes = useStyles();

  const { reportType, reportName } = useParams();
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [productReportResponse, setProductReportResponse] = useState();
  const [tabValue, setTabValue] = React.useState(0);
  const [isDocker, setIsDocker] = React.useState(false);


  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    fetchProductsReports();
  }, [reportName]);

  const fetchProductsReports = async () => {
    try {
      setLoading(true);
      updateSnackbar(true, CONSTANTS.FETCHING_DATA);
      const url = `/report/project/reportname`;
      const response = await Axios.post(url, {
        emailAdd: authService.getUserName(),
        reportName
      });
      const res = response.data;
      if (res.header.docker && res.header.docker === 'True') {
        setIsDocker(true);
      }
      setProductReportResponse(res);
      updateSnackbar(true, CONSTANTS.FETCHING_DATA_SUCCESS);
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
          <DockerSummaries
            reportType={reportType}
            reportName={reportName}
            summary={productReportResponse.images}
            headerDate={productReportResponse.header.Date}
            projectName={productReportResponse.header.Project}
          />
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
            {!isDocker ? <Tab className="inventory-tab" label="Inventory" />  : ''}
            {((reportType === 'platform') && !isDocker) ? <Tab className="remediation-tab" label="Remediation" /> : ''}
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
          {!isDocker
            ? <Issues reportType={reportType} reportName={reportName} issues={productReportResponse.Issues} />
            : <DockerIssues reportType={reportType} reportName={reportName} issues={productReportResponse.images} />}

        </TabPanel>
        <TabPanel value={tabValue} index={2}>
          {(reportType === 'language' || reportType === 'application') ?

            productReportResponse.filesArray ? <File name="" file={productReportResponse.filesArray} />
              :
              <Dependencies issues={reportType === 'application' ? productReportResponse.applications : productReportResponse.files} reportType={reportType} reportName={reportName} />

            :
            reportType === 'platform' ?
              <File name="" file={productReportResponse.packages?.pkgDetails} />
              : ''}
        </TabPanel>
        <TabPanel value={tabValue} index={3}>
          <Remediation data={productReportResponse.remediation} />
        </TabPanel>
      </>
    );
  }

  const getTabs = () => {
    return (
      <div className={classes.root}>

        {
          isDocker ?
            getDockerTabs()
            :
            getNonDockerTabs()
        }


      </div>
    );
  }


  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid
        container
        spacing={1}
      >
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="left"
          height="100%"
          style={{ marginTop: '25px' }}
        >
          {productReportResponse ?
            (
              <>
                <ReportHeader header={productReportResponse.header} />
                {getTabs()}
              </>
            )
            : ''}

          {(loading && !productReportResponse) ? getLoader() : null}
          <MySnackbar closeSnackbar={() => updateSnackbar(false, '')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />

        </Box>
      </Grid>
    </Container>

  );
};

export default ProductsReports;