import React, { useState, useEffect } from 'react';
import MySnackbar from 'src/Shared/Snackbar/MySnackbar';
import { LinearProgress, Box, Grid, Container, Paper, Divider } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import CONSTANTS from "../../Util/Constants";
import SeverityBarChart from './../ProductsReports/ReportSummary/SeverityBarChart/SeverityBarChart';
import CWEPieChart from './../ProductsReports/ReportSummary/CWEPieChart/CWEPieChart';
import './Library.css';

const Library = () => {
  const { app, product } = useParams();
  const [loading, setLoading] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState({ open: false, message: '' });
  const [productReportResponse, setProductReportResponse] = useState();

  useEffect(() => {
    fetchProductsReports();
  }, [app, product]);

  const fetchProductsReports = async () => {
    try {
      setLoading(true);
      updateSnackbar(true, CONSTANTS.FETCHING_DATA);
      const url = `/getDetails`;
      const response = await Axios.post(url, {
        product,
        application: app,
      });
      const res = response.data;
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
    setSnackbarStatus({
      open,
      message
    })
  }

  const getLoader = () => {
    if (loading) {
      return <LinearProgress style={{ margin: '15px' }} />
    }
    return null;
  }

  const printResponse = () => {
    return (
      <div className="container">
        <Paper className="header">
          <h6 className="details-header">
            {product}
          </h6>
        </Paper>
        <Paper className="total-vul">
          <h6 className="details-header">
            Total Vulnerabilities
{' '}
            {productReportResponse['Total Vulnerabilities']}
          </h6>
        </Paper>
        <div className="flex justifyAround">
          {productReportResponse.Severity ? (
            <SeverityBarChart
              severity={productReportResponse.Severity}
              divId="barChart"
              bgColor="white"
            />
          ) : ''}
          {productReportResponse.CWE ? (
            <CWEPieChart
              cwe={productReportResponse.CWE}
              divId="pieChart"
              bgColor="white"
            />
          ) : ''}
        </div>
        <div style={{ marginTop: '10px'}}>
        {
          productReportResponse.results.map(result => {
            return <Paper elevation={3} className="paper-elevation space">
              {Object.keys(result).map(oo => {
                return (
                  <p className="details">
                    <div>
                      <h6 className="details-header">
                        {oo}
                      </h6>
                      {result[oo]}
                    </div>
                  </p>
                )
              })}
            </Paper>
          })
        }
        </div>


      </div>
    )
  }
  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={1}
      >
        <Box
          justifyContent="left"
          height="100%"
          width="100%"
          style={{ marginTop: '25px' }}
        >
          {productReportResponse ?
            (
              <Grid  xs={12}>
                <Paper>
                  {printResponse()}
                </Paper>
              </Grid>
            )
            : ''}

          {(loading && !productReportResponse) ? getLoader() : null}


          <MySnackbar
            closeSnackbar={() => updateSnackbar(false, '')}
            snackbarMessage={snackbarStatus.message}
            snackbarOpen={snackbarStatus.open}
          />

        </Box>
      </Grid>
    </Container>

  );
};

export default Library;