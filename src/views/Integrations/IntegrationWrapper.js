import React from 'react';
import {Box,
    Grid,  
    Card,
    CardContent,
    CardHeader,
    makeStyles} from '@material-ui/core';
import Integration from './Integration';


const useStyles = makeStyles(theme=>({
    title : {
        margin : '10px',
        width : '100%',
        fontWeight : 'bold'
    }
}));

const IntegrationWrapper = ({name,integrations}) => {
    const styles = useStyles();


    return (
        <Grid container spacing={1}>
            <Grid item spacing={12} className = {styles.title}>
                {name}
            </Grid>
          
            {
                integrations.map((integration, index) => {
                    return <Integration data={integration} group={name} index = {index} />
                })
            }
         
        </Grid>
 
    )
}

export default IntegrationWrapper;