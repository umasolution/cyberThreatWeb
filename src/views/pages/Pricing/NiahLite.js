import React, { useState, useEffect } from 'react';
import { Grid, Switch, Checkbox, Button, Paper, makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { setCosts, setSubscriptionModel } from 'src/actions/pricingAction';


const useStyle = makeStyles({
    root : {
        marginTop : '10px',
        padding : '10px'
    },
    valueStyle : {
        marginLeft : '10px',
        marginRight : '10px',
        marginBottom :'20px'
    },
    textContent : {
        display : 'flex',
        marginTop : '6px'
    },
    pushMargin : { 
        marginTop : '5px'
    }
});


const NiahLite = () => {
    useEffect(()=>{
        dispatch(setCosts(200,2400))
    });

   
    const classes = useStyle();
    const history = useHistory();
    const dispatch = useDispatch();

    const [checked, setChecked] = useState(true);

    const totalCost = useSelector((state) => state.pricing.totalCost);
    const costPerDeveloper = useSelector((state) => state.pricing.costPerDeveloper);
    const annualCost = useSelector((state) => state.pricing.annualCost);
    const totalCostWithDiscount = useSelector((state) => state.pricing.totalWithDiscount)

    const onToggle = () => {
        setChecked(!checked);
    }

    const onSubscribe = () => {
        dispatch(setSubscriptionModel({displayName: 'Niah Lite', model : 'NiahLite'}));
        history.push('/app/dashboard/payment');
    }

    const getTextContent = (first,middle, end) => {
        return (
            <div className = {classes.textContent}>
                <Typography variant="h5" className = {classes.pushMargin}>{first}</Typography>
                <Typography variant="h3" gutterBottom className = {classes.valueStyle}>{middle}</Typography>
                <Typography variant="h5" className = {classes.pushMargin}>{end}</Typography>
            </div>
        )
    }
    return (
        <Paper className={classes.root}>
            <Grid container>
                <Grid item xs={10}>
                    {
                         getTextContent('Total Cost', '200' , ' USD per month')
                    }
                   
                   
                    <span style={{ display: "flex" }}>
                        <Switch
                            checked={checked}
                            onChange={onToggle}
                            color="primary"
                            name="checkedB"
                        />
                        
                        {checked ? getTextContent('billed monthly at ', '200' , ' USD per month') :
                                   getTextContent('billed annually at ', '2400' , ' USD per Annum')}
                      

                    </span>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="caption">
                        Renew automatically
                </Typography>
                    <Checkbox
                        defaultChecked
                        color="primary"
                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                    />
                </Grid>
                <Button variant="contained" color="primary" onClick={onSubscribe}>
                    Continue with Subscription
            </Button>

            </Grid>
        </Paper>

    )
}

export default NiahLite;