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
    },
    heading:{
        color:"#3579DC",
        margin:"10px",
     
    }
}))

const IntroCard = () => {
    const classes =useStyles();
    return (
        <div>
            <Card className={classes.card}>
                        <CardContent>
                            <Typography variant="h3" className={classes.heading}>
                            NIAH Vulnerability Alerts			
                            </Typography>
                            <Typography variant="h5"  style={{margin:'10px'}}>
                            Get alerts for vulnerabilities in Operating Systems, Applications and Libraries.								
                            </Typography>
                            <Typography variant="body1" component="p" gutterBottom style={{margin:'10px',fontSize:'14px',fontWeight:'500'}}>
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