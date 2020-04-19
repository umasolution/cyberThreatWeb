import { Box, Container, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import authService from 'src/services/authService';
import MySnackbar from "../../Shared/Snackbar/MySnackbar";
import CONSTANTS from "../../Util/Constants";


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

const ProjectsReports = () => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [projectListResponse, setProjectListResponse] = useState();


    useEffect(() => {
        fetchProjectsList();
    }, []);

    const fetchProjectsList = async () => {
        try {
            setLoading(true);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA);
            const url = "http://cyberthreatinfo.ca/report/project/";
            const response = await Axios.post(url,
                {
                    emailAdd: authService.getUserName()
                });
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
                        (
                            <>
                                {
                                    projectListResponse.map(project => {
                                        return (
                                            <div>
                                                {
                                                    Object.keys(project).map(projectValue => {
                                                        return (
                                                            <>


                                                                <div>
                                                                    <Typography
                                                                      variant="h6"
                                                                      color="textPrimary"
                                                                      style={{ display: 'inline' }}
                                                                    >
                                                                        {projectValue}
                                                                    </Typography>
                                                                    {' '}
                                                                            :
                                                                            {projectValue !== 'severity'
                                                                        ?
                                                                       <> {' '} {project[projectValue]} </>
                                                                        :
                                                                        Object.keys(project[projectValue]).map(pValue => {
                                                                            return (
                                                                                <div style={{ display: 'block' }}>
                                                                                    <Typography
                                                                                      variant="h6"
                                                                                      color="textSecondary"
                                                                                      style={{ display: 'inline', marginLeft: '15px' }}
                                                                                    >
                                                                                        {pValue}
                                                                                    </Typography>
                                                                                    {' '}
                                                                                    :
                                                                                    {' '}
                                                                                    {project[projectValue][pValue]}
                                                                                </div>

                                                                            )
                                                                        })}

                                                                </div>



                                                            </>
                                                        )
                                                    })
                                                }

                                            </div>
                                        )
                                    })
                                }
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

export default ProjectsReports;