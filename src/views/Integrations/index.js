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
import { useDispatch, useSelector } from 'react-redux';
import { setIntegrations } from 'src/actions/integrationActions';

const Integrations = () => {

    const dispatch = useDispatch();

   // const [integrations, setIngerations] = useState([]);
    const integrations = useSelector(state =>{
        console.log(state);
        return state.integrations.integrationDetails;
    });
    useEffect(() => {

        const getIntegrations = async () => {
            const response = await Axios.get('/get/integrations');
            dispatch(setIntegrations(response.data))
           // setIngerations(Object.entries(response.data));
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