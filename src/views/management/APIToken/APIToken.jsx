import { Box, Button, Divider, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import authService from 'src/services/authService';
import MySnackbar from "../../../Shared/Snackbar/MySnackbar";

const useStyles = makeStyles((theme) => ({
    table: {
      width: 'fit-content',
    },
  }));
  
const APIToken =  () => {

    const classes = useStyles();

    const [isLoadingData, setloadingData] = useState(true);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [apiResponse, setAPIResponse] = useState(null);

    useEffect(() => {
        getAPIToken();
    },[]);

    const getAPIToken =  async () => {
        try {
            updateLoadingData(true);
            const url = `http://cyberthreatinfo.ca/getAPIToken`;
            const response = await Axios.post(url,
                {
                  "emailAdd" :   authService.getUserName()
                });
            if (!response.data) {
                updateLoadingData(false);
                return;
            }
            setAPIResponse(response.data);
            updateLoadingData(false);
        } catch (error) {
            console.error(error);
            updateLoadingData(false);
        }
    }

    const generateAPIToken = async () => {
        try {
            updateLoadingData(true);
            const url = `http://cyberthreatinfo.ca/genAPIToken`;
            const response = await Axios.post(url,
                {
                  "emailAdd" :   authService.getUserName(),
                  "applications" : "all",
                  "subscriptionType" : "Free"
                });
            if (!response.data) {
                updateLoadingData(false);
                return;
            }
            setAPIResponse(response.data);
            updateLoadingData(false);
        } catch (error) {
            console.error(error);
            updateLoadingData(false);
        }
    }

    const updateLoadingData = (value) => {
        setloadingData(value);
    }

    const updateSnackbar = (open, message) => {
        setSnackbarOpen(open);
        setSnackbarMessage(message)
    }

    const getLoader = () => {
        if (isLoadingData) {
            return <LinearProgress style={{ margin: '15px', width: '100%' }} />
        }
        return null;
    }

    return (
        <div style={{    marginLeft: '10px'}}>
            <Box mt={2}>
                <Button
                  color="secondary"
                  size="large"
                  type="button"
                  variant="contained"
                  onClick={generateAPIToken}
                  // status: "Expire"
                  disabled={isLoadingData || apiResponse['status'] !== 'Expire'}
                >
                    Generate Token
                </Button>
            </Box>
           { !isLoadingData && apiResponse && apiResponse['status'] !== 'Expire' && (
           <Box mt={2}>
               <TableContainer className={classes.table} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Property</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(apiResponse).map(key => (
            <TableRow key={key}>
              <TableCell component="th" scope="row">
                {key}
              </TableCell>
              <TableCell> 
{' '}
{apiResponse[key] }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
               </TableContainer>
           </Box>
         )}
            {isLoadingData && getLoader()}
            <MySnackbar closeSnackbar={() => updateSnackbar(false,'')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />

        </div>
    );
};

export default APIToken;