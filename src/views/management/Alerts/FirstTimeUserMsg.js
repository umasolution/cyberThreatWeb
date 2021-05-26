import React from 'react';
import {Card,
        CardContent,
        Box,
        Typography,
        makeStyles
    } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    box: {
        
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:'4%'
      
        
    },
    card:{
        height:'150px',
        width:'100%',
        margin:'50px auto',
        alignItems:'center',
        
        borderRadius: '5px'
    },
    textColor:{
        color:"#3579DC"
    }
   

}));


const FirstTimeUserMsg = ( ) => {

    const classes= useStyles();

    return(
            <Card className={classes.card}>  
            <Box className={classes.box}>

                <Typography align="center" variant="body1" component="p" gutterBottom style={{margin:'10px',fontSize:'14px',fontWeight:'500'}}>
                You dont have any alerts set.
                </Typography>	
               	
                <Typography  align="center" variant="h5" className={classes.textColor}>
                Search for a CVE in the Vulnerabilities DB section 
                </Typography>	
                
            
            </Box>
            
            </Card>
        
    )
};

export default FirstTimeUserMsg;