import React from 'react';
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
import MaterialTable from 'material-table';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Link } from 'react-router-dom';
import './ResultByCVE.css';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        paddingTop: 200,
        paddingBottom: 200,
        [theme.breakpoints.down('md')]: {
            paddingTop: 60,
            paddingBottom: 60
        }
    },
    image: {
        perspectiveOrigin: 'left center',
        transformStyle: 'preserve-3d',
        perspective: 1500,
        '& > img': {
            maxWidth: '90%',
            height: 'auto',
            transform: 'rotateY(-35deg) rotateX(15deg)',
            backfaceVisibility: 'hidden',
            boxShadow: theme.shadows[16]
        }
    },
    shape: {
        position: 'absolute',
        top: 0,
        left: 0,
        '& > img': {
            maxWidth: '90%',
            height: 'auto'
        }
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.primary,
        overflow: 'auto',
    },
    title: {
        color: theme.palette.primary.light,
        display: 'inline',
        marginRight: '5px',
        textTransform: 'capitalize'
    },
    // borderDiv: {
    //     border: '1px',
    //     borderStyle: 'solid',
    //     borderRadius: '10px',
    //     borderColor: 'brown',
    //     marginTop: '5px',
    //     overflow: 'auto',
    //     scrollBehavior: 'auto',
    //     padding: '10px'
    // }
}));

const ResultByCVE = ({ cveNVDDetails, cveTables, cve }) => {

    const classes = useStyles();


    const getCVEExpansionPanel = () => {
        if (cveTables && cveTables.length > 0) {
            return cveTables.map((table) => {
                return (
                    <div key={table} style={{ margin: '16px 0 10px 0' }}>
                        {
                            table.data.map(data => {
                                return (
                                    // <div key={data} className={classes.borderDiv} style={{ width: '100%' }}>
                                    <Paper style={{ overflow: 'inherit',  }} className="paper">
                                        <div className="background-shadow background-margin">
                                            {table.tableHeader}
                                        </div>
                                        {Object.keys(data).map(lan => {
                                            return (
                                                <p key={lan} className="odd-even-background">
                                                    <span style={{ marginRight: '10px' }}>


                                                        <Typography
                                                            variant="h6"
                                                            className={classes.title}
                                                        >
                                                            {lan}
                                                        </Typography>

                                                    </span>
                                                    <Typography
                                                        className={classes.secondaryText}
                                                    >
                                                        {!(data[lan].includes && (data[lan].includes('https://') || data[lan].includes('http://'))) ? (data[lan]) :
                                                            (
                                                                <a target="_blank" rel="noopener noreferrer" href={data[lan]}>{data[lan]}</a>
                                                            )}
                                                    </Typography>

                                                </p>
                                            )
                                        })}
                                    </Paper>
                                    // {/* </div> */ }
                                )
                            })
                        }
                    </div>

                );

            });
        }
        return null;
    }

    const getCVEHeaderGrid12 = () => {
        return (
            <Grid item xs={12}>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Paper color="primary.main" style={{ overflow: 'inherit' }} className={[classes.paper].join(' ')}>
                            <div className="flex">
                                <div className="background-shadow background-margin">
                                    C
                            </div>
                                <Typography className="secondaryText right-p" >
                                    {cve}
                                </Typography>
                            </div>

                        </Paper>
                    </Grid>
                    {
                        cveNVDDetails.Product ? (
                            <Grid item xs={4}>
                                <Paper style={{ overflow: 'inherit' }} className={[classes.paper].join(' ')}>
                                    <div className="flex">
                                        <div className="background-shadow background-margin">
                                            P
                            </div>
                                        <Typography className="secondaryText right-p" >
                                            {cveNVDDetails.Product}
                                        </Typography>
                                    </div>

                                </Paper>
                            </Grid>
                        )
                            : null
                    }
                    {
                        cveNVDDetails.Vendor ? (
                            <Grid item xs={4}>
                                <Paper style={{ overflow: 'inherit' }} className={[classes.paper, classes.borderDiv].join(' ')}>
                                    <div className="flex">
                                        <div className="background-shadow background-margin">
                                            V
                            </div>
                                        <Typography className="secondaryText right-p" >
                                            {cveNVDDetails.Vendor}
                                        </Typography>
                                    </div>
                                </Paper>
                            </Grid>
                        )
                            : null
                    }
                </Grid>

            </Grid>
        );
    }

    const getReference = (cveNVDDetails, key) => {
        return (
            <Typography className={classes.secondaryText}>
                {cveNVDDetails.Dashboard[key].split(',').map(url => <a target="_blank" style={{ display: 'inline-block' }} href={url}>{url}</a>)}
            </Typography>
        )
    }


    const getCVENVDDetails = () => {
        return (
            <div>
                <Grid container spacing={1}>
                    {getCVEHeaderGrid12()}
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={6}>
                                {Object.keys(cveNVDDetails.Dashboard).map(key => {
                                    return (
                                        <>
                                            <Paper style={{ overflow: 'inherit', marginTop: '16px' }} key={key} elevation={3} className={classes.paper}>
                                                <div className="background-shadow background-margin">
                                                    {key}
                                                </div>

                                                {
                                                    key === 'Reference' ? getReference(cveNVDDetails, key) : (
                                                        <Typography className={classes.secondaryText}>
                                                            {cveNVDDetails.Dashboard[key]}
                                                        </Typography>
                                                    )
                                                }


                                            </Paper>
                                            <Divider />
                                        </>
                                    )
                                })}

                            </Grid>
                            <Grid item xs={6}>
                                {cveNVDDetails.Metadata['Base Score'] ? (
                                    <>
                                        <Paper style={{ overflow: 'inherit', marginTop: '16px', marginLeft: '2px', }} elevation={3} className={classes.paper}>
                                            <div className="flex">
                                                <div className="background-shadow background-margin">
                                                    Base Score
                                                </div>
                                                <Typography
                                                    variant="h1"
                                                    color="secondary"
                                                    className="base-score-value"
                                                >
                                                    {cveNVDDetails.Metadata['Base Score']}
                                                </Typography>
                                            </div>
                                        </Paper>
                                        <Divider />
                                    </>
                                )
                                    : ''}
                                <Grid container spacing={0}>
                                    <Grid item xs={6}>
                                        {Object.keys(cveNVDDetails.Metadata).map((key, index) => {
                                            return index > 4 && key !== 'Base Score' ? (
                                                <>
                                                    <Paper style={{ overflow: 'inherit', marginTop: '16px', marginLeft: '2px', }} key={key} elevation={3} className={classes.paper}>
                                                        <div className="flex">
                                                            <div className="background-shadow background-margin">
                                                                {key}
                                                            </div>
                                                            <Typography
                                                                className={classes.secondaryText}

                                                            >
                                                                {cveNVDDetails.Metadata[key]}
                                                            </Typography>
                                                        </div>

                                                    </Paper>
                                                    <Divider />
                                                </>
                                            ) : ''
                                        })}
                                    </Grid>
                                    <Grid item xs={6}>
                                        {Object.keys(cveNVDDetails.Metadata).map((key, index) => {
                                            return index < 4 && key !== 'Base Score' ? (
                                                <>
                                                    <Paper style={{ overflow: 'inherit', marginTop: '16px', marginLeft: '10px', }} key={key} elevation={3} className={classes.paper}>
                                                        <div className="flex">
                                                            <div className="background-shadow background-margin">
                                                                {key}
                                                            </div>
                                                            <Typography
                                                                className={classes.secondaryText}
                                                            >
                                                                {cveNVDDetails.Metadata[key]}
                                                            </Typography>
                                                        </div>

                                                    </Paper>
                                                    <Divider />
                                                </>
                                            ) : ''
                                        })}
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Grid>

                    </Grid>

                </Grid>
            </div>
        );
    }

    const getByCVEData = () => {
        return (
            <>
                {cveNVDDetails ? (
                    <div>
                        {getCVENVDDetails()}
                    </div>
                )
                    :
                    null}
                <div style={{ margin: '10px 0 10px 0', width: '100%' }} >
                    {getCVEExpansionPanel()}
                </div>
            </>
        )
    }

    return (
        getByCVEData()
    );
};

export default ResultByCVE;