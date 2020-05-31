import {
    Box, Container, Divider, Grid, LinearProgress, makeStyles, TextField, Typography,
    List,
    ExpansionPanel,
    ExpansionPanelSummary,
    ListItem,
    ListItemIcon,
    ListItemText,
    ExpansionPanelDetails,
    Paper
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';
import Axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import MySnackbar from "../../Shared/Snackbar/MySnackbar";
import CONSTANTS from "../../Util/Constants";
import ResultByCVE from './ResultByCVE/ResultByCVE';
import CVEInput from './CVEInput/CVEInput';
import ResultByCVEDate from './ResultByCVEDate/ResultByCVEDate';


const useStyles = makeStyles((theme) => ({
}));

const CVE = () => {

    const classes = useStyles();

    const { cve } = useParams();
    const { cveStartDate } = useParams();
    const { cveEndDate } = useParams();
    const [cveInput, setCVEInput] = useState("");
    const [isLoadingData, setloadingData] = useState(false);
    const [cveNVDDetails, setCVENVDDetails] = useState();
    const [cveTables, setCVETables] = useState();
    const [cveResultByDate, setCVEResultByDate] = useState();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [searchByCVE, setSearchByCVE] = useState(true);
    const [cveSearchStartDate, setCVESearchStartDate] = useState(null);
    const [cveSearchEndDate, setCVESearchEndDate] = useState(null);


    useEffect(() => {
        if (cve) {
            setCVEInput(cve);
            setSearchByCVE(true);
            fetchCVEData(cve);
        }

    }, [cve]);

    useEffect(() => {
        if (cveStartDate) {
            setCVESearchStartDate(cveStartDate)
        }

    }, [cveStartDate]);

    useEffect(() => {
        if (cveEndDate) {
            setCVESearchEndDate(cveEndDate);
            setSearchByCVE(false);
            fetchCVEDataByDate(cveStartDate, cveEndDate);
        }

    }, [cveEndDate]);

    const updateLoadingData = (value) => {
        setloadingData(value);
    }

    const fetchCVEData = async (cveParams) => {
        try {
            updateLoadingData(true);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA);
            const url = `http://cyberthreatinfo.ca/cve?cve=${cveParams}`;
            const response = await Axios.get(url);
            if (!response.data) return;
            if (response.data.tables) {
                setCVETables(response.data.tables);
            }
            if (response.data.NVD) {
                setCVENVDDetails(response.data.NVD);
            }
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_SUCCESS);
            updateLoadingData(false);
        } catch (error) {
            console.error(error);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_FAILED);
            updateLoadingData(false);
        }

    }

    const fetchCVEDataByDate = async (cveStartDateParam, cveEndDateParam) => {
        try {
            if (!cveStartDateParam || !cveEndDateParam) return;

            updateLoadingData(true);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA);
            const url = `http://cyberthreatinfo.ca/cve?start_date=${moment(cveStartDateParam).format("YYYY-MM-DD")}&end_date=${moment(cveEndDateParam).format("YYYY-MM-DD")}`;
            const response = await Axios.get(url);
            if (!response.data) return;
            setCVEResultByDate(response.data);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_SUCCESS);
            updateLoadingData(false);
        } catch (error) {
            console.error(error);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_FAILED);
            updateLoadingData(false);
        }
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


    const handleChangeCVE = (event) => {
        setCVEInput(event.target.value);
    }
    const keyPress = (event) => {
        if (event.keyCode === 13) {
            fetchCVEData(cveInput);
        }
    }


    const onSearchClicked = () => {
        if (searchByCVE) {
            fetchCVEData(cveInput);
        } else {
            fetchCVEDataByDate(cveSearchStartDate, cveSearchEndDate);
        }
    }

    const changeSearchByCVE = (event) => {
        setSearchByCVE(event.target.checked);
    };

    const setCVESearchDate = (dateType, date) => {
        if (dateType === 'startDate') {
            setCVESearchStartDate(date);
        } else {
            setCVESearchEndDate(date);
        }
    }

    return (
        <Container maxWidth="lg">
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
                    {isLoadingData && getLoader()}

                    <CVEInput
                      searchByCVE={searchByCVE}
                      cveInput={cveInput}
                      changeSearchByCVE={changeSearchByCVE}
                      keyPress={keyPress}
                      handleChangeCVE={handleChangeCVE}
                      onSearchClicked={onSearchClicked}
                      isSearching={isLoadingData}
                      setCVESearchDate={setCVESearchDate}
                      cveSearchStartDate={cveSearchStartDate}
                      cveSearchEndDate={cveSearchEndDate}
                    />
                    <MySnackbar closeSnackbar={() => updateSnackbar(false, '')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />
                </Box>
                {searchByCVE
                    && !isLoadingData && cveTables
                    && (
                        <ResultByCVE
                          cveNVDDetails={cveNVDDetails}
                          cveTables={cveTables}
                          cve={cveInput}
                        />
                    )}

                {!searchByCVE
                    && !isLoadingData && cveResultByDate
                    && (
                        <ResultByCVEDate
                          cveResultByDate={cveResultByDate}
                        />
                    )}
            </Grid>
        </Container>
    );
}

export default CVE;