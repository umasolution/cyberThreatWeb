import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Container, Grid, Box, LinearProgress, makeStyles } from '@material-ui/core';
import LoadingScreen from 'src/components/LoadingScreen';
import CONSTANTS from "../../../Util/Constants";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    borderDiv: {
        border: '1px',
        borderStyle: 'solid',
        borderRadius: '10px',
        borderColor: 'brown',
        marginTop: '5px',
        width: '1000px',
        overflow: 'auto',
        scrollBehavior: 'auto'
    }
}));

const Language = () => {
    const classes = useStyles();

    const [isLoadingData, setloadingData] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [languages, setLanguages] = useState();
    const { panelType } = useParams();


    useEffect(() => {
        fetchLanguages();
    }, [panelType]);

    const fetchLanguages = async () => {
        try {
            updateLoadingData(true);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA);
            const url = `http://cyberthreatinfo.ca/admin/api/${panelType}`;
            const response = await Axios.get(url);
            // check response exist
            if (Object.keys(response.data).length === 0 && response.data.constructor === Object) {
                updateSnackbar(true, CONSTANTS.DATA_NOT_FOUND);
                updateLoadingData(false);
                return;
            }
            setLanguages(response.data[panelType]);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_SUCCESS);
            updateLoadingData(false);
        } catch (error) {
            console.error(error);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_FAILED);
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
            return <LoadingScreen />;
        }
        return null;
    }

    const printLanguages = () => {
        return (
            <>
                {languages.map(language => {
                    return (
                        <div className={classes.borderDiv}>
                            {Object.keys(language).map(lan => {
                                return (
                                    <p>
                                        <span style={{ marginRight: '10px' }}> {lan} </span>
                                        {lan !== 'product' ? (language[lan]) :
                                            (
                                                <Link target="_blank" to={`/app/admin/editLanguage/${panelType}/${language[lan]}`}>{language[lan]}</Link>
                                            )}
                                    </p>
                                )
                            })}
                        </div>
                    )
                })}
            </>
        )
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
                    {!isLoadingData && languages && printLanguages()}
                </Box>
            </Grid>
        </Container>
    );
};

export default Language;