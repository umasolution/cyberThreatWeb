import {
    Box, Container, Grid, LinearProgress, makeStyles, Typography, ExpansionPanel, ExpansionPanelSummary,
    ListItem, ListItemIcon, ListItemText, ExpansionPanelDetails, Divider, Paper
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import authService from 'src/services/authService';
import { useParams, Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CONSTANTS from "../../Util/Constants";
import MySnackbar from "../../Shared/Snackbar/MySnackbar";
import Copy from '../../Util/Copy';
import { getBackgroundColorBySeverity, getFontColorBySeverity } from '../../Util/Util';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'inherit', // theme.palette.background.paper,
        paddingLeft: '16px !important',
        paddingRight: '16px !important',
    },
    projectHeader: {
        color: theme.palette.primary.light
    },
    panelMainDiv: {
        border: '1px solid',
        borderRadius: '10px',
        padding: '10px',
        marginBottom: '5px'
    },
    checkBoxes: {
        display: 'inline',
        margin: '0 10px 10px 0',
        textTransform: 'capitalize'

    }
}));

const ProjectsReports = () => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [projectListResponse, setProjectListResponse] = useState();
    const [reportTypes, setReportTypes] = useState([]);


    useEffect(() => {
        fetchProjectsList();
    }, []);

    const fetchProjectsList = async () => {
        try {
            setLoading(true);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA);
            const url = "/report/project";
            let response = await Axios.post(url,
                {
                    emailAdd: authService.getUserName()
                });
            // check response exist
            if (Object.keys(response.data['report type']).length === 0) {
                updateSnackbar(true, CONSTANTS.DATA_NOT_FOUND);
                setLoading(false);
                return;
            }
            response = response.data['report type'];
            response.forEach(res => res.isShowing = true);
            setProjectListResponse(response);
            const reportTypes = response.map(d => d['report type'])
            setReportTypes(reportTypes);
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

    const getPanelDetails = (histories, reportType) => {
        return histories.map(history => {
            return (
<Paper elevation={3} style={{ padding: '8px' }}>
                {Object.keys(history).map(historyKey => {
                    return (
                        <>
                            <div className="odd-even-background" style={{ display: 'block' }}>
                                <Typography
                                  variant="h6"
                                  color="textPrimary"
                                  style={{ display: 'inline' }}
                                >
                                    {historyKey} 
{' '}
{' '}
                                </Typography>
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
                                            <div style={{ display: 'inline' }}>
                                                <Typography
                                                  variant="h6"
                                                  color="textSecondary"
                                                  style={{ display: 'inline', marginLeft: '15px', marginRight: '5px' }}
                                                >
                                                    {severity}
                                                </Typography>
                                                <span
                                                  className="severity-div"
                                                  style={{
                                                    backgroundColor: getBackgroundColorBySeverity(severity),
                                                    color: getFontColorBySeverity(severity)
                                                }}
                                                >
                                                    {history[historyKey][severity]}
                                                </span>

                                            </div>

                                        )
                                    })}
                            </div>
                        </>

                    )
                })}
</Paper>
)
        })

    }

    const getHeader = (project, reportType) => {
        return (
            <ListItem key={project.header['Report Name']}>
                <ListItemText
                  primary={(
<Typography type="body2" className={classes.projectHeader}>
                        <Link target="_blank" to={`/ProductsReports/${reportType}/${project.header['Report Name']}`}>{`${project.header['Project Name']}`}</Link>
</Typography>
)}
                  secondary={(
                        <div>
                            {
                                Object.keys(project.header).map(headerValue => {
                                    return (
                                        headerValue !== 'Project Name' && headerValue !== 'Report Name' ? (
                                            <>
                                                <div style={{ display: 'inline' }}>
                                                    <Typography
                                                      variant="h6"
                                                      color="textPrimary"
                                                      style={{ display: 'inline', textTransform: 'capitalize', marginRight: '5px' }}
                                                    >
                                                        {headerValue !== 'dependencies' ? headerValue : `Scanned ${headerValue}`}
                                                    </Typography>

                                                    {headerValue !== 'severity'
                                                        ? (
                                                            <p style={{ display: 'inline', marginRight: '10px' }}>

                                                                {project.header[headerValue]}

                                                            </p>
                                                        )
                                                        :
                                                        Object.keys(project.header[headerValue]).map(severity => {
                                                            return (
                                                                <div style={{ display: 'inline', marginRight: '10px' }}>
                                                                    <Typography
                                                                      variant="h6"
                                                                      color="textSecondary"
                                                                      style={{ display: 'inline', marginLeft: '15px' }}
                                                                    >
                                                                        {severity}
                                                                    </Typography>

                                                                    <p style={{ display: 'inline' }}>
                                                                        <span
                                                                          className="severity-div"
                                                                          style={{
                                                                            backgroundColor: getBackgroundColorBySeverity(severity),
                                                                            color: getFontColorBySeverity(severity)
                                                                        }}
                                                                        >
                                                                            {project.header[headerValue][severity]}
                                                                        </span>

                                                                    </p>

                                                                </div>

                                                            )
                                                        })}

                                                </div>



                                            </>
                                          )
                                            : ''
                                    )
                                })
                            }

                        </div>
                      )}
                />
            </ListItem>
);
    }

    const handleCheckBoxChange = (event, type) => {
        const copy = Copy(projectListResponse);
        const report = copy.find(data => data['report type'] === type);
        if (report) {
            report.isShowing = event.target.checked;
            setProjectListResponse(copy);
        }

    }

    const getProjectsResponses = () => {
        return (
            <>
                <div className={classes.checkBoxes}>
                    {
                        reportTypes.map(type => (
<FormControlLabel
  control={(
                                <Checkbox
                                  color="red"
                                  checked={projectListResponse.findIndex(res => res['report type'] === type && res.isShowing) !== -1}
                                  onChange={(event) => handleCheckBoxChange(event, type)}
                                  name={type}
                                  color="primary"
                                />
                            )}
  label={type}
/>
)
                        )
                    }
                </div>

                {
                    projectListResponse.map(project => {
                        return project.isShowing ? project.results.map(result => {
                            return (
                                <>
                                    <ExpansionPanel
                                      key={result.header['Report Name']}
                                      style={{ borderLeft: `15px solid  ${project.bgcolor}` }}
                                    >
                                        <ExpansionPanelSummary
                                          expandIcon={<ExpandMoreIcon />}
                                          aria-controls="panel1a-content"
                                          id="panel1a-header"
                                        >

                                            {getHeader(result, project['report type'])}
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails style={{ display: 'block', width: '100%' }}>
                                            {getPanelDetails(result.history, project['report type'])}
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                    <Divider />
                                </>
                            )

                        }) : ''
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
                  style={{ marginTop: '25px', width: '100%' }}
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