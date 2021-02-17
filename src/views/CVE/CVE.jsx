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
import CVEInput from './CVEInputlogin/CVEInput';
import ResultByCVEDate from './ResultByCVEDate/ResultByCVEDate';
import authService from 'src/services/authService';
import { useLocation } from 'react-router-dom';

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
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: ""
    });
    const [searchByCVE, setSearchByCVE] = useState(true);
    const [cveSearchStartDate, setCVESearchStartDate] = useState(null);
    const [cveSearchEndDate, setCVESearchEndDate] = useState(null);
    let location = useLocation();
    const [isAuthenticatedURL, setIsAuthenticatedURL] = useState(location.pathname.includes('/app/'));
    const [canSetAlert, setCanSetAlert] = useState(false);
    const [alarmAlreadySet, setAlarmAlreadySet] = useState(false);

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
            let url = `/cve?cve=${cveParams}`;
            if (isAuthenticatedURL) {
                url = `auth/cve?cve=${cveParams}`;
            }
            const response = await Axios.get(url);

            if (!response.data) return;
            if (isAuthenticatedURL) {
                setAlarmAlreadySet(response.data.alert);
            }    
            /*if (response.data.tables) {
                setCVETables(response.data.tables);
            }
            setAlarmAlreadySet(response.data.alert);
            if (response.data.NVD) {
                setCVENVDDetails(response.data.NVD);
            }*/
            console.log(response.data);
            console.log(response.data.Reference);
            if (response.data) {
                setCVENVDDetails(response.data);
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
            const url = `/cve?start_date=${moment(cveStartDateParam).format("YYYY-MM-DD")}&end_date=${moment(cveEndDateParam).format("YYYY-MM-DD")}`;
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
        setSnackbar({
            open,
            message
        })
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

    const setAlert = async () => {
        try {
            setloadingData(true);
            const response = await Axios.post(!alarmAlreadySet ? '/setalert' : '/delalert',
                {
                    "alert_name": cveInput,
                     "alert_type":"cve_id",
                     "alert_mode":"all" 
                });
            updateSnackbar(true, response.data.message);
            setAlarmAlreadySet(!alarmAlreadySet);
            setloadingData(false);
        } catch (error) {
            console.error(error);
            updateSnackbar(true, 'Error while setting Alert');
            setloadingData(false);
        }
    }

    return (
        <Container maxWidth="lg">
            <Grid
                container
                spacing={1}
            >
            {isAuthenticatedURL && (
            <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="left"
                    height="100%"
                    style={{ marginTop: '25px', width: '100%' }}
                >
                    {isLoadingData && isAuthenticatedURL && getLoader()}

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
                        setAlert={setAlert}
                        canSetAlert={isAuthenticatedURL && cveNVDDetails && !isLoadingData}
                        alarmAlreadySet={alarmAlreadySet}
                    />
                    <MySnackbar
                        closeSnackbar={() => updateSnackbar(false, '')}
                        snackbarMessage={snackbar.message}
                        snackbarOpen={snackbar.open} />
                </Box>)}
                
                <ResultByCVE
                    cveNVDDetails={cveNVDDetails}
                    cveTables={cveTables}
                    cve={cveInput}
                />
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