import React from 'react';
import {
   Card,
   CardHeader,
   Divider,
   CardContent,Box,Typography,makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

}));

const ErrorDisplay = ({ title, content }) => {
    const classes =useStyles();
    return(
    <Card>
        <CardHeader
            title={title}
        />
        <Divider />
        <CardContent className="chart-data">
            <Box className={classes.box}>

                <Typography gutterBottom variant="h5" component="h2">
                   {content}
                </Typography>
            </Box>
        </CardContent>
    </Card>
    );

};

export default ErrorDisplay;