import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Card, CardContent, Typography, CardActions, Button, Box, Grid } from '@material-ui/core';
import { useSelector } from 'react-redux';



const useStyle = makeStyles({
    root : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    }
});



const PaymentResult = ({response}) => {
   
    const styles = useStyle();
    const errorMsg = useSelector(state => state.pricing.errorMsg)

    return (
        <div className={styles.root}>
             <Card className={styles.root}>
                <CardContent>
                    <Grid container spacing={2}>
                        {
                            errorMsg != '' ? (
                                <Grid item xs={12} style={{color: 'red'}}>
                                {errorMsg}
                            </Grid>
                            ) :  <Grid item xs={12} style={{color: 'green'}}>
                            Your transaction has successfully completed.
                        </Grid>
                        }
                       </Grid>
                </CardContent>
             
            </Card>
        </div>
        
    )
}

export default PaymentResult;