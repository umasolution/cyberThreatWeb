import { Box, Container, Divider, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import authService from 'src/services/authService';
import MySnackbar from "../../Shared/Snackbar/MySnackbar";
import CONSTANTS from "../../Util/Constants";
import Issues from './Issues/Issues';
import ReportHeader from './ReportHeader/ReportHeader';
import JsonFiles from './JsonFiles/JsonFiles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './../Feed/TabPanel/TabPanel';
import Dependencies from './Issues/Dependencies';
import DockerIssues from './DockerIssues/DockerIssues';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'inherit' // theme.palette.background.paper,
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
      const url = `http://cyberthreatinfo.ca/report/project/reportname`;
      const response = await Axios.post(url, {
        emailAdd: authService.getUserName(),
        reportName
      });
      const res = response.data;
      // const res = {
      //   "header": {
      //     "Date": "28-06-2020_22:50:39",
      //     "Owner": "jays",
      //     "Project": "composerDocker",
      //     "Severity": {
      //       "Critical": 0,
      //       "High": 2,
      //       "Low": 0,
      //       "Medium": 0
      //     },
      //     "Target": "azure",
      //     "Tested With": "composer.json,composer.lock",
      //     "Total Scanned Dependancies": 26,
      //     "Total Scanned Images": 7,
      //     "Total Scanned Namespaces": 2,
      //     "Total Vulnerabilities": 2,
      //     "Total Vulnerable Dependencies": 2,
      //     "docker": "True"
      //   },
      //   "images": {
      //     "jaysnpael.azurecr.io/jaysnpael/debian": {
      //       "Issues": {}
      //     },
      //     "jaysnpael.azurecr.io/jaysnpael/django": {
      //       "Issues": {}
      //     },
      //     "jaysnpael.azurecr.io/jaysnpael/drupal": {
      //       "Issues": {}
      //     },
      //     "jaysnpael.azurecr.io/jaysnpael/flask-hello": {
      //       "Issues": {}
      //     },
      //     "jaysnpael.azurecr.io/jaysnpael/node": {
      //       "Issues": {}
      //     },
      //     "jaysnpael.azurecr.io/jaysnpael/wordpress": {
      //       "Issues": {
      //         "High": [
      //           {
      //             "Introduced through": "",
      //             "Versions": "7.5.20",
      //             "cve_id": "CVE-2017-9841",
      //             "patch": "None",
      //             "product": "phpunit",
      //             "pub_date": "13 Nov, 2016",
      //             "recommendation": "None",
      //             "reference": "https://packagist.org/packages/phpunit/phpunit,",
      //             "severity": "High",
      //             "vectorString": "CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
      //             "vendor": "phpunit",
      //             "vuln_name": "Arbitrary Code Execution"
      //           }
      //         ]
      //       }
      //     },
      //     "jaysnpael.azurecr.io/jaysnpael1/drupal": {
      //       "Issues": {
      //         "High": [
      //           {
      //             "Introduced through": "",
      //             "Versions": "3.7.38",
      //             "cve_id": "CVE-2017-9841",
      //             "patch": "None",
      //             "product": "PHPUnit",
      //             "pub_date": "13 Nov, 2016",
      //             "recommendation": "None",
      //             "reference": "https://packagist.org/packages/phpunit/phpunit,",
      //             "severity": "High",
      //             "vectorString": "CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
      //             "vendor": "phpunit",
      //             "vuln_name": "Arbitrary Code Execution"
      //           }
      //         ]
      //       }
      //     }
      //   }
      // }
      // setProductReportResponse(res);
      if(res.header['docker'] && res.header['docker'] === 'True'){
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

  const getTabs = () => {
    const jsonFiles = [];
    if (productReportResponse && productReportResponse['package.json']) {
      jsonFiles.push({ name: 'package.json', data: productReportResponse['package.json'] });
    }
    if (productReportResponse && productReportResponse['package-lock.json']) {
      jsonFiles.push({ name: 'package-lock.json', data: productReportResponse['package-lock.json'] });
    }
    if (productReportResponse && productReportResponse['applications']) {
      jsonFiles.push({ name: 'applications', data: productReportResponse['applications'] });
    }
    return (
      <div className={classes.root}>
        <AppBar style={{ width: '100%' }} position="static">
          <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Issues" />
            {(reportType === 'language' && !isDocker )? <Tab label="Dependencies" /> : reportType === 'application' ? <Tab label="Applications" /> : ''}
          </Tabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          {!isDocker 
          ? <Issues reportType={reportType} reportName={reportName} issues={productReportResponse.Issues} />
        : <DockerIssues reportType={reportType} reportName={reportName} issues={productReportResponse.images}/>
        }

        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {/* <JsonFiles jsonFiles={jsonFiles} /> */}
          <Dependencies issues={productReportResponse.files} reportType={reportType} reportName={reportName}/>
        </TabPanel>
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
                <Divider />
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