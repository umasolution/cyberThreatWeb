import React, {useEffect, useState} from 'react';
import {Box,
        Grid,  
        Card,
        CardContent,
        CardHeader} from '@material-ui/core';
import './Integrations.css';
import Integration from './Integration';
import Axios from 'axios';
import IntegrationWrapper from './IntegrationWrapper';

const Integrations = () => {

    const [integrations, setIngerations] = useState([])
    useEffect(() => {

        const getIntegrations = async () => {
            const response = await Axios.get('/get/integrations');
            setIngerations(Object.entries(response.data));
        };

        getIntegrations();
        
    }, []);

    return (
        <Grid container spacing={1}>
            {
                integrations.map(integ=>{
                    return <IntegrationWrapper name = {integ[0]} integrations = {integ[1]} />
                })
            }
           
    </Grid>
    )
}

export default Integrations;