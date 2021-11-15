import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Card, CardContent, Typography, CardActions, Button, Box, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { CreditCard } from 'react-feather';
import CreditCardInterface from './CreditCard';

const useStyle = makeStyles({
    root : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    }
});



const Payment = () => {
    const pricing = useSelector((state) => state.pricing);
    const styles = useStyle();

    return (
        <div className={styles.root}>
             <Card className={styles.root}>
                <CardContent>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            Your subscription details are as follows. Please confirm before payment.
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="div">
                                            Subscription Type : {pricing.selectedSubscriptionModel}
                                    </Typography>
                            
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="div">
                                        Total Users      : {pricing.users}
                                    </Typography>
                          
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="div">
                                        Total Scans      : {pricing.totalScans}
                                    </Typography>
                          
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" component="div">
                                        Total Annual Amount      : {pricing.annualCost}
                                    </Typography>
                          
                        </Grid>
                        <Grid item xs={12}>
                            <CreditCardInterface subscription = {pricing.selectedSubscriptionModel} 
                            users = {pricing.users} scans = {pricing.totalScans} amount = {pricing.annualCost}/>
                        </Grid>
                      
                        </Grid>
                </CardContent>
             
            </Card>
        </div>
        
    )
}

export default Payment;