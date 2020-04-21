import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { LinearProgress, Container, Grid, Box, Divider } from '@material-ui/core';
import CONSTANTS from "../../Util/Constants";
import MySnackbar from "../../Shared/Snackbar/MySnackbar";
import ReportHeader from './ReportHeader/ReportHeader';

import { makeStyles } from '@material-ui/core';
import Issues from './Issues/Issues';
import authService  from 'src/services/authService';
import { useParams, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const ProductsReports = () => {
    const classes = useStyles();

    const { reportName } = useParams();
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [productReportResponse, setProductReportResponse] = useState();


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
                    <Divider/>

                    <Issues issues={productReportResponse.Issues} />
                    <Divider/>

                    </>
                    )
                    : ''}

                    {loading ? getLoader() : null}
                    <MySnackbar closeSnackbar={() => updateSnackbar(false, '')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />

                </Box>
            </Grid>
        </Container>

    );
};

export default ProductsReports;