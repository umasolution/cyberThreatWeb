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
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.primary,
        overflow: 'auto'
    }
}));

const ResultByCVE = ({ cveNVDDetails, cveTables, cve }) => {

    const classes = useStyles();


    const getCVEExpansionPanel = () => {
        if (cveTables && cveTables.length > 0) {
            return cveTables.map((table) => {
                return (
                    <ExpansionPanel
                      key={table.tableHeader}
                    >
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                            <ListItem key={table.tableHeader}>
                                <ListItemText
                                  primary={table.tableHeader}
                                />
                            </ListItem>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <MaterialTable
                              key={table.tableHeader}
                              title=""
                              columns={table.columns}
                              data={table.data}
                            //   style={{ width: "100%" }}
                            />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );

            });
        }
        return null;
    }

    const getCVEHeaderGrid12 = () => {
        return (
<Grid item xs={12}>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Paper color="primary.main" className={classes.paper}>
                        <Typography
                          variant="h1"
                          color="secondary"
                        >
                            {cve}
                        </Typography>
                    </Paper>
                </Grid>
                {
                    cveNVDDetails.Product ? (
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>

                                <Typography
                                  variant="h5"
                                  style={{ display: 'inline', marginRight: '5px' }}
                                >
                                    Product:
                                </Typography>
                                {cveNVDDetails.Product}
                            </Paper>
                        </Grid>
                    )
                        : null
                }
                {
                    cveNVDDetails.Vendor ? (
                        <Grid item xs={2}>
                            <Paper className={classes.paper}>
                                <Typography
                                  variant="h5"
                                  style={{ display: 'inline', marginRight: '5px' }}
                                >

                                    Vendor:
                                </Typography>
                                {cveNVDDetails.Vendor}
                            </Paper>
                        </Grid>
                    )
                        : null
                }
            </Grid>

</Grid>
);
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
                                          style={{ display: 'inline', marginRight: '5px' }}
                                        >
                                            {key}
                                        </Typography>
:
{cveNVDDetails.Dashboard[key]}
                                    </Paper>
                                    <Divider />
                                </>
                            )
                        })}

                    </Grid>
                    <Grid item xs={6}>
                        {cveNVDDetails.Metadata['Base Score'] ?
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
                          style={{ display: 'inline'}}
                        >
                           {cveNVDDetails.Metadata['Base Score']}
                        </Typography>
                                        
                                    </Paper>
                                    <Divider />
                                    </>
                         : ''}
                        
                        {Object.keys(cveNVDDetails.Metadata).map(key => {
                            return key !== 'Base Score' ? (
                                <>
                                    <Paper key={key} elevation={3} className={classes.paper}>
                                        <Typography
                                          variant="h5"
                                        >
                                            {key}
                                        </Typography>
                                        {cveNVDDetails.Metadata[key]}
                                    </Paper>
                                    <Divider />
                                </>
                            ) : ''
                        })}
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
                {getCVEExpansionPanel()}
            </>
        )
    }

    return (
        getByCVEData()
    );
};

export default ResultByCVE;