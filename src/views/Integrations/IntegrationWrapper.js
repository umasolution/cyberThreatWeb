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

const IntegrationWrapper = ({name, integrations}) => {
    const styles = useStyles();

    return (
        <Grid container spacing={1}>
            <Grid item spacing={12} className = {styles.title}>
                {name}
            </Grid>
          
            {
                integrations.map(integration => {
                    return <Integration name={integration.name} desc = {integration.description} />
                })
            }
         
        </Grid>
 
    )
}

export default IntegrationWrapper;