import React from 'react';
import {Grid,
    Card,
    Typography,
    makeStyles} from '@material-ui/core';
import { mergeClasses } from '@material-ui/styles';

const useStyles = makeStyles ((theme) => ({
    card: {
        width: '100%',
        padding: '10',
        marginTop:'10px'
       
    },
    grid:
    {
        margin: '10px',
    }
}));

const AlertTableHeader = ({columns}) => {
    const classes= useStyles();
    return (
        <Card className = {classes.card}>
        <Grid className= {classes.grid} container spacing={3}>
            <Grid item xs={2}>
            <Typography style={{marginLeft:'15px'}} variant="h5" component="h4">
            {columns[0]}
            </Typography>
            </Grid>
            <Grid item xs={2}>
            <Typography   variant="h5" component="h4">
            {columns[1]}
            </Typography>
            </Grid>
            <Grid item xs={7}>
            <Typography  variant="h5" component="h4">
            {columns[2]}
            </Typography>
            </Grid>
        </Grid>
        </Card>
    )
};

export default AlertTableHeader;