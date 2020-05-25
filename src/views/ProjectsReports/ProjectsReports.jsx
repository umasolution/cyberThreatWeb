import {
    Box, Container, Grid, LinearProgress, makeStyles, Typography, ExpansionPanel, ExpansionPanelSummary,
    ListItem, ListItemIcon, ListItemText, ExpansionPanelDetails, Divider
} from '@material-ui/core';
import ExpandMoreIcon  from '@material-ui/icons/ExpandMore';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import authService from 'src/services/authService';
import MySnackbar from "../../Shared/Snackbar/MySnackbar";
import CONSTANTS from "../../Util/Constants";
import { useParams, Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'inherit' //theme.palette.background.paper,
    },
}));

const ProjectsReports = () => {
    const classes = useStyles();

    const {reportType} = useParams();
    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [projectListResponse, setProjectListResponse] = useState();


    useEffect(() => {
        fetchProjectsList();
    }, [reportType]);

    const fetchProjectsList = async () => {
        try {
            setLoading(true);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA);
            const url = "http://cyberthreatinfo.ca/report/project/" + reportType;
            const response = await Axios.post(url,
                {
                    emailAdd: authService.getUserName()
                });
                // check response exist
            if (Object.keys(response.data.results).length === 0) {
                updateSnackbar(true, CONSTANTS.DATA_NOT_FOUND);
                setLoading(false);
                return;
            }
            setProjectListResponse(response.data.results);
            console.log(response.data.results);
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

    const getPanelDetails = (histories) => {
        return histories.map(history => {
            return Object.keys(history).map(historyKey => {
                return (
                    <>
                    <div style={{ display: 'block' }}>
                    <Typography
                      variant="h6"
                      color="textPrimary"
                      style={{ display: 'inline' }}
                    >
                        {historyKey}
                    </Typography>
                    {' '}
                            :
                            {historyKey !== 'severity'
                        ? (
                            <>
                            {
                                historyKey !== 'Report Name' ? ( 
                                     
                                    history[historyKey] 
                                    
                                ) : (
                                    <Link target="_blank" to={`/ProductsReports/${reportType}/${history[historyKey]}`}>{history[historyKey]}</Link>
                                )
                            }
                                
                            </>
                        )
                        :
                        Object.keys(history[historyKey]).map(severity => {
                            return (
                                <div style={{ display: 'block' }}>
                                    <Typography
                                      variant="h6"
                                      color="textSecondary"
                                      style={{ display: 'inline', marginLeft: '15px' }}
                                    >
                                        {severity}
                                    </Typography>
                                    {' '}
                                    :
                                    {' '}
                                    {history[historyKey][severity]}
                                </div>
    
                            )
                        })}
                </div>
                <Divider/>
                </>
                         
                )
            })
        })

    }

    const getHeader = (project) => {
        return (
        <ListItem key={project.header['Report Name']}>
        <ListItemText
          primary={`Project Name ${project.header['Project Name']}`}
          secondary={
<div>
                    {
                        Object.keys(project.header).map(headerValue => {
                            return (
                                headerValue !== 'Project Name' ?
                                <>
                                    <div style={{ display: 'inline'}}>
                                        <Typography
                                          variant="h6"
                                          color="textPrimary"
                                          style={{ display: 'inline' }}
                                        >
                                            {headerValue}
                                        </Typography>
                                        {' '}
                                                :
                                                {headerValue !== 'severity'
                                            ? (
                                                <p style={{ display: 'inline'}}>
                                                    {' '}
                                                    {project.header[headerValue]}
                                                    {' '}
                                                </p>
                                            )
                                            :
                                            Object.keys(project.header[headerValue]).map(severity => {
                                                return (
                                                    <div style={{ display: 'inline'}}>
                                                        <Typography
                                                          variant="h6"
                                                          color="textSecondary"
                                                          style={{ display: 'inline', marginLeft: '15px' }}
                                                        >
                                                            {severity}
                                                        </Typography>
                                                        {' '}
                                                        :
                                                        (
                                                        <p style={{ display: 'inline'}}>
                                                        {project.header[headerValue][severity]}
                                                        </p>
                                                        )
                                                    </div>

                                                )
                                            })}

                                    </div>



                                </>
                                : ''
                            )
                        })
                    }

            </div>
          }
        >
            
        </ListItemText>
    </ListItem>);
    }

    const getProjectsResponses = () => {
        return (
<>
            {
                projectListResponse.map(project => {
                    return (
                        <>
                        <ExpansionPanel
                          key={project.header['Report Name']}
                        >
                            <ExpansionPanelSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1a-content"
                              id="panel1a-header"
                            >
                                {getHeader(project)}
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails style={{display:'block', width: '100%'}}>
                                 {getPanelDetails(project.history)} 
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    <Divider/>
</>
                    )
                })
            }
</>
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
                    {projectListResponse ?

                        getProjectsResponses()


                        : ''}

                    {loading ? getLoader() : null}
                    <MySnackbar closeSnackbar={() => updateSnackbar(false, '')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />

                </Box>
            </Grid>
        </Container>

    );
};

export default ProjectsReports;