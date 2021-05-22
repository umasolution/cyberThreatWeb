import React from 'react';
import {Card,
        CardContent,
        Box,
        Typography,
        makeStyles
    } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    box: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }

}));


const FirstTimeUserMsg = ( ) => {

    const classes= useStyles();

    return(
        <Card>
        <CardContent className="chart-data">
            <Box className={classes.box}>

                <Typography gutterBottom variant="h5" component="h2">
                You dont have any alerts set.<br/>		
                Search for a CVE in the Vulnerabilities DB section 		
                </Typography>
            </Box>
        </CardContent>
    </Card>
    )
};

export default FirstTimeUserMsg;