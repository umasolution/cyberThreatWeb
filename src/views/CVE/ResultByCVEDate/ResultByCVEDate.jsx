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
    },
    list:{
        width: '100%',
    maxWidth: 800,
    backgroundColor: theme.palette.background.paper
    }
}));

const ResultByCVEDate = ({ cveResultByDate}) => {

    const classes = useStyles();


    /* const getCVEExpansionPanel = () => {
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
    } */

    const getCVEHeaderGrid12 = () => {
        return (
<Grid item xs={12}>
{
    cveResultByDate.CVEs.map(result => {
return (
<Grid container spacing={1}>
                    <ExpansionPanel
                      key={result.CVE_ID}
                      style={{width: '100%'}}
                    >
                        <ExpansionPanelSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                            <ListItem key={result.CVE_ID}>
                                <ListItemText
                                color="primary"
                                  primary={result.CVE_ID}
                                />
                            </ListItem>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                        <List className={classes.list} dense={false}>
                        {
Object.keys(result).map(key => {
return (
   key !== 'CVE_ID' ? (
       <>
    <ListItem key={key}>
        {
            key !== 'urls' ?
            (
<ListItemText
                                  primary={`${key} :  ${result[key]}`}
                                />
            )
            :
            (
                <ExpansionPanel
                  key={key}
                >
                    <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                        <ListItem key={key}>
                            <ListItemText
                              primary={key}
                            />
                        </ListItem>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{display: 'inline-block'}}>
                        {result[key].map( url => {
                            return (
                                <div>
                                <div>
                                <ListItem key={url}>
                                <ListItemText
                                  primary={url.name}
                                />
                            </ListItem>
                            <List className={classes.list}  dense={false}>
                                {
                                    url.url.map(u => {
                                        return (
                                            <>
<ListItem key={u}>
                                <ListItemText
                                  primary={<a target="_blank" href={u}>{u}</a>}
                                />
                            </ListItem>
                            <br/>
</>
                                        )
                                    })
                                }
                            
                            </List>
                            </div>
                            <br/>
                            </div>
                            )
                        })}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
        }
                                
    </ListItem>
    <Divider/>
    </>
  )
                            : ''
   /*  <Grid item xs={1}>
                    <Paper color="primary.main" className={classes.paper}>
                        <Typography
                        >
                            {key}: { key !== 'urls' && key !== 'Description' ? result[key] : ''}
                        </Typography>
                    </Paper>
                </Grid> */
)
})
}
                        </List>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                
</Grid>
)
            ;
    })
}
</Grid>
);
    }

    const getCVENVDDetails = () => {
        return (
            <div>
                <Grid container spacing={1}>
                {getCVEHeaderGrid12()}
                </Grid>
            </div>
        );
    }

    const getByCVEData = () => {
        return (
            <>
                {getCVENVDDetails()}
            </>
        )
    }

    return (
        getByCVEData()
    );
};

export default ResultByCVEDate;