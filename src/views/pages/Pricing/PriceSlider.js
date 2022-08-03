import { Paper, Grid, makeStyles, Slider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

import React, { useState } from 'react';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
       
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        display: 'flex',
        marginBottom : '15px'
    },
    label : {
        textAlign : 'left'
    }
}));

const PriceSlider = ({label, 
                     max,
                     footerText,
                    callback}) => {
    const classes = useStyles();

    const [value, setValue] = useState(0)

    const handleSliderChange = (event, newValue) => {
        setValue(newValue);
        callback(label,newValue);
    };

    return (
        <Paper className={classes.paper}>
           
                <Grid container spacing={3}>
                    <Grid item xs={4} >
                        <div className = {classes.label}>
                            <Typography variant="h4" gutterBottom>{label}</Typography>
                            <Typography variant="body2" gutterBottom>per developer per month</Typography>
                        </div>
                        
                    </Grid>
                    <Grid item xs={4}>
                        <Slider value={typeof value === 'number' ? value : 0}
                                onChange={(e,v) => handleSliderChange(e,v)}
                                max = {max}/>
                    </Grid>
                    <Grid item xs={4} className = {classes.label}>
                        <Typography variant="h2" gutterBottom>{value}</Typography>
                    </Grid>
                    <Typography variant="body2" gutterBottom>
                        {footerText}
                    </Typography>
                </Grid>
              </Paper>
    )
}

export default PriceSlider;