import { makeStyles,
         Card,
         CardContent,
         Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles ((theme) => ({
    card: {
        width: '100%',
        padding: '10',
        overflow: 'auto'
    }
}))

const IntroCard = () => {
    const classes =useStyles();
    return (
        <div>
            <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h5" component="h4">
                            NIAH Vulnerability Alerts			
                            </Typography>
                            <Typography variant="h5" component="h2">
                            Get alerts for vulnerabilities in Operating Systems, Applications and Libraries.								
                            </Typography>
                            <Typography variant="body2" component="p">
                            Niah Alerts monitors a library and alerts you when there is a new vulnerability in that library 
                            or there is new information available for an existing vulnerability in existing package.										
                            Monitor Application and Operating System vulnerabilities for new exploits, 
                            change in severity and other information.										
                           </Typography>
                        </CardContent>
            </Card>
        </div>
    )
};

export default IntroCard;