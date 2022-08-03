
import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import PriceSlider from './PriceSlider';
import TotalCost from './TotalCost';
import {setAlerts, 
        setTotalScans,
        setUsers,
        getTotalCost,
        setCosts} from '../../../actions/pricingAction';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    root : {
        marginLeft : '300px',
        marginRight : '300px'
    }
});

const NiahFlexi = () => {
    const popup = useSelector(state => state.pricing.flexiPopup)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(setCosts(0,0))
    },[]);
    const classes = useStyle();

    const totalScanText = "All scan types cost the same. Depedency Scan, Container Image, Operating system)";
    const usersText = "The number of accounts on Niah Portal. The Total Scans above are spread across all developers as a floating limit.";
    const alertsText = "How many vulnerability and product alerts would you like to subscribe? You can choose the maximum number of alerts your team can use as a floating limit.";

    const onSliderChange = (label,value) => {
        if(label === "Total Scans / developer")
        dispatch(setTotalScans(value));
        else if (label === "Users")
        dispatch(setUsers(value));
        else 
        dispatch(setAlerts(value));

        dispatch(getTotalCost());

    }
    return (
        <div className = {popup ? '' : classes.root}>
            <PriceSlider label="Total Scans / developer" 
                            max = {300} 
                            footerText = {totalScanText}
                            callback = {onSliderChange} />
            <PriceSlider label = "Users" 
                            max = {150}
                            footerText = {usersText}
                            callback = {onSliderChange}/>
           {/* <PriceSlider label = "Alerts" 
                            max = {100}
                            footerText = {alertsText}
                            callback = {onSliderChange}/> */}
            <Typography variant = "body2">
                *Floating Limits are a combined total across all developers/accounts on Niah Security Premium. e.g. If you purchase 200 scans, all developers can run a combined total of 200 scans. It could be 200 scans from one account or 20 scans from 10 accounts.
            </Typography>
            <TotalCost />
        </div>
    );
};

export default NiahFlexi;