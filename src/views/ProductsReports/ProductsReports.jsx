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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  tabRoot: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  }
}));

const ProductsReports = () => {
    const classes = useStyles();

    const { reportType,reportName } = useParams();
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [productReportResponse, setProductReportResponse] = useState();
    const [tabValue, setTabValue] = React.useState(0);

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
            const response = await Axios.post(url,{
                emailAdd: authService.getUserName(),
                reportName
            });
            setProductReportResponse(response.data);
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
        return (
            <div className={classes.root}>
            <AppBar style={{    minWidth: '900px'}} position="static">
            <Tabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Issues"   />
              { reportType === 'language' ? <Tab label="Dependencies"  /> : ''}
            </Tabs>
          </AppBar>
          <TabPanel value={tabValue} index={0}>
            <Issues reportType={reportType} reportName={reportName} issues={productReportResponse.Issues} />
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
          <JsonFiles jsonFiles={productReportResponse.jsonFiles}/>
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