import { Box, Container, Divider, Grid, makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingScreen from 'src/components/LoadingScreen';
import CONSTANTS from "../../../../Util/Constants";
import EditLanguageForm from './EditLanguageForm/EditLanguageForm';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'block',
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        width: '100%'
    },
    borderDiv: {
        border: '1px',
        borderStyle: 'solid',
        borderRadius: '10px',
        borderColor: 'brown',
        marginTop: '5px'
    }
}));

const EditLanguage = () => {
    const classes = useStyles();


    const [isLoadingData, setloadingData] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [languageData, setLanguageData] = useState();
    const { panel } = useParams();
    const { panelType } = useParams();
    const [state, setState] = React.useState({
        isApprovedChecked: true,
        isNewChecked: true,
        isOpenChecked: true,
        isUpdatedChecked: true,
        isRejectedChecked: true,
    });

    const [value, setValue] = React.useState();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    useEffect(() => {
        fetchLanguages();
    }, [panel]);

    const fetchLanguages = async () => {
        try {
            updateLoadingData(true);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA);
            let url = `/admin/api/${panelType}/${panel}`;
            const response = await Axios.get(url);
            // check response exist
            if (Object.keys(response.data).length === 0 && response.data.constructor === Object) {
                updateSnackbar(true, CONSTANTS.DATA_NOT_FOUND);
                updateLoadingData(false);
                return;
            }
            if (response.data) {
                setLanguageData(response.data);
                if(Object.keys(response.data)[0]){
                    setValue(Object.keys(response.data)[0]);
                }
                // setLanguageData(data);
            }
            console.log(response.data);
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

    const propertyChange = (event, type, id) => {
        const languageDataCopy = JSON.parse(JSON.stringify(languageData));
        const languageDataTypeCopy = [...languageDataCopy[type]];
        const langData = languageDataTypeCopy.find(l => l.id === id);
        if (langData) {
            langData[event.target.name] = event.target.value;
            languageDataCopy[type] = languageDataTypeCopy;
            setLanguageData(languageDataCopy);
        }
    }

    const onApprovOrReject = async (type, id, action) => {
        console.log(type, id);
        updateLoadingData(true);
        const languageDataCopy = JSON.parse(JSON.stringify(languageData));
        let languageDataTypeCopy = [...languageDataCopy[type]];
        const langData = languageDataTypeCopy.find(l => l.id === id);
        if (langData) {
            langData.action = action;
            let url = `/admin/api/${panelType}/${panel}/edit`;
            const response = await Axios.post(url,
                langData);
            if (!response.data) {
                updateLoadingData(false);
                return;
            }
            console.log(response.data);
            if (response.data.results === true) {
                languageDataTypeCopy = languageDataTypeCopy.filter(l => l.id !== id);
                languageDataCopy[type] = languageDataTypeCopy;
                if (action !== 'approved') {
                    if (!languageDataCopy.rejected) {
                        languageDataCopy.rejected = [];
                    }
                    languageDataCopy.rejected.push(langData);
                }
            }
            updateLoadingData(false);
            setLanguageData(languageDataCopy);
        } else {
            updateLoadingData(false);
        }
    }

    const printLanguage = () => {
        return (
            <>
                <div className={classes.root}>
                    <div style={{ display: 'flex' }}>
                        <List component="nav" aria-label="main mailbox folders">
                            <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                                {
                                    Object.keys(languageData).map(lang => {
                                        return <ListItem key={lang} button>
                                        <FormControlLabel value={lang} control={<Radio />} label={lang} />
                                    </ListItem>;
                                    })
                                }
                            </RadioGroup>
                        </List>
                        <div>
                        {
                                    Object.keys(languageData).map(lang => {
                                        return (<>
                                            {lang === value ?  
                                             <EditLanguageForm
                                             type={lang}
                                             key={lang}
                                             data={languageData[lang]}
                                             propertyChange={propertyChange}
                                             onApprovOrReject={onApprovOrReject}
                                         />
                                            : ''}
                                        </>
                                        )
                                    })
                                }
                        </div>
                    </div>
                </div>

            </>
        );
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
                    {!isLoadingData && languageData && printLanguage()}
                </Box>
            </Grid>
        </Container>
    );
};

export default EditLanguage;