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
    secondaryText: {
        color: "inherit",
        display: 'inline',
        textTransform: 'capitalize'
    },
    borderDiv: {
        border: '1px',
        borderStyle: 'solid',
        borderRadius: '10px',
        borderColor: 'brown',
        marginTop: '5px',
        overflow: 'auto',
        scrollBehavior: 'auto',
        padding: '10px'
    }
}));

const ResultByCVE = ({ cveNVDDetails, cveTables, cve }) => {

    const classes = useStyles();


    const getCVEExpansionPanel = () => {
        if (cveTables && cveTables.length > 0) {
            return cveTables.map((table) => {
                return (
                    <div style={{ margin: '10px 0 10px 0'}}>
                        <Typography
                            variant="h5"
                            className={classes.title}
                        >
                            {table.tableHeader}
                        </Typography>
                        {
                            table.data.map(data => {
                                return (
                                    <div className={classes.borderDiv} style={{ width: '100%' }}>
                                        {Object.keys(data).map(lan => {
                                            return (
                                                <p>
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
                                    </div>
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
                        <Paper color="primary.main" className={[classes.paper, classes.borderDiv].join(' ')}>
                            <Typography
                                variant="h5"
                                color="textPrimary"
                                className={classes.title}
                            >
                                CVE
                            </Typography>
                            <Typography className={classes.secondaryText}>
                                {cve}
                            </Typography>
                        </Paper>
                    </Grid>
                    {
                        cveNVDDetails.Product ? (
                            <Grid item xs={4}>
                                <Paper className={[classes.paper, classes.borderDiv].join(' ')}>
                                    <Typography
                                        variant="h5"
                                        color="textPrimary"
                                        className={classes.title}
                                    >
                                        Product
                                    </Typography>
                                    <Typography className={classes.secondaryText}>
                                        {cveNVDDetails.Product}
                                    </Typography>
                                </Paper>
                            </Grid>
                        )
                            : null
                    }
                    {
                        cveNVDDetails.Vendor ? (
                            <Grid item xs={4}>
                                <Paper className={[classes.paper, classes.borderDiv].join(' ')}>
                                    <Typography
                                        variant="h5"
                                        color="textPrimary"
                                        className={classes.title}
                                    >
                                        Vendor
                                    </Typography>
                                    <Typography className={classes.secondaryText}>
                                        {cveNVDDetails.Vendor}
                                    </Typography>

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
                                            <Paper key={key} elevation={3} className={classes.paper}>
                                                <Typography
                                                    variant="h5"
                                                    className={classes.title}
                                                >
                                                    {key}
                                                </Typography>
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
                                        <Paper elevation={3} className={classes.paper}>
                                            <Typography
                                                variant="h5"
                                                style={{ display: 'inline', marginRight: '5px' }}
                                            >
                                                Base Score
                                            </Typography>
                                            <Typography
                                                variant="h1"
                                                color="secondary"
                                                style={{ display: 'inline' }}
                                            >
                                                {cveNVDDetails.Metadata['Base Score']}
                                            </Typography>

                                        </Paper>
                                        <Divider />
                                    </>
                                )
                                    : ''}
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        {Object.keys(cveNVDDetails.Metadata).map((key, index) => {
                                            return index > 4 && key !== 'Base Score' ? (
                                                <>
                                                    <Paper key={key} elevation={3} className={classes.paper}>
                                                        <Typography
                                                            variant="h5"
                                                            className={classes.title}
                                                        >
                                                            {key}
                                                        </Typography>

                                                        <Typography
                                                            className={classes.secondaryText}
                                                        >
                                                            {cveNVDDetails.Metadata[key]}
                                                        </Typography>
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
                                                    <Paper key={key} elevation={3} className={classes.paper}>
                                                        <Typography
                                                            variant="h5"
                                                            className={classes.title}
                                                        >
                                                            {key}
                                                        </Typography>
                                                        <Typography
                                                            className={classes.secondaryText}
                                                        >
                                                            {cveNVDDetails.Metadata[key]}
                                                        </Typography>

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