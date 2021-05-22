import React from 'react';
import {
    Grid,
    Typography,
    makeStyles,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tooltip
} from '@material-ui/core';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import clsx from 'clsx';

import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './AlertList.css';
import PopoverContent from './PopoverContent';

const useStyles = makeStyles((theme) => ({
    grid:{
      marginTop:'3px'
    },
    icon:{

        margin:'3px'
    },
    accordion :
    {
    
        /*padding:'10px',
        marginLeft:'11px'*/
        width:'100%'
    },
    readMail:{
        backgroundcolor:theme.palette.grey[300],
        color:theme.palette.text.secondary


    }
}));

const AlertList = ({ alertList }) => {

    const classes = useStyles();
    var read=0;

    return (
        <Grid container spacing={0} className={classes.grid}>
            {
                alertList.map((alert, index) => {
                    return (
                        <>
                        
                        <Accordion className={classes.accordion}>
                            <AccordionSummary style={{width:'100%'}}expandIcon={<ExpandMoreIcon />}>
                                <Grid item xs={2}>
                                    <Typography variant="h5" component="h4">
                                        {alert.alert_name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="h5" component="h4">
                                        {alert.alert_type}
                                    </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Grid container>
                                        <Grid item  xs={9}>
                                        <Typography variant="h5" component="h4">
                                            {alert.alert_message}
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Grid container justify="flex-end">
                                        <Tooltip title="Mark unread">
                                            <MarkunreadIcon className={classes.icon} color="action" />
                                        </Tooltip>
                                        <PopoverContent />
                                        <Tooltip title="Delete">
                                        <DeleteIcon className={classes.icon} color="action" />
                                        </Tooltip>
                                        </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                                    sit amet blandit leo lobortis eget.
                            </Typography>
                            </AccordionDetails>
                        </Accordion>
                        </>
                    )
                })
            }

        </Grid>
    )
};

export default AlertList;