
import { Grid, TextField, Typography, makeStyles, Button } from '@material-ui/core';
import Axios from 'axios';

import React, { useState } from 'react';
import { useHistory } from 'react-router';

const useStyle = makeStyles({
    txt : {
       width : '30%'
    },
    root : {
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    cvv : {
        width : '5%',
        marginRight : '10px'
    }
});

const CreditCardInterface = ({subscription, users, scans, amount}) => {
    const styles = useStyle();
    const history = useHistory();
    
    const [card, setCardDetails] = useState({cardnumber:0,
                                            name:'', 
                                            cardcodeno : 0,
                                            month : '',
                                            year : ''});
    
    console.log(card.name)

    const onPay = async () => {
        try{
            const payment = await Axios.post('/subscription/register', {
                cardnumber : card.cardnumber,
                cardcodeno : card.cardcodeno,
                expiredate : card.year+'-'+card.month,
                users ,
                subscription,
                scans ,
                amount
            });

            if(payment.status){
                history.push('/app/dashboard/paymentresult')
            }else{
                history.push('/app/dashboard/paymentresultfailure')
            }
        }catch(error){
            history.push('/app/dashboard/paymentresultfailure')
        }
       

     
    }

    const onChangeCreditCardDetails = (changedTxt, item) => {
    
        setCardDetails({...card, [item] : changedTxt})
    }

    return (
        <Grid container spacing={2} className = {styles.root}>
            <Grid item xs={12}>
                <Typography variant="h5" component="div">
                   Credit Card Details
                </Typography>
            </Grid>
            <Grid item xs={12}>
                    <TextField className= {styles.txt} id="outlined-basic" label="Name in the Card" variant="outlined" 
                            onChange={(event)=>onChangeCreditCardDetails(event.target.value,'name')} />
            </Grid>
            <Grid item xs={12}>
                    <TextField className= {styles.txt} id="outlined-basic" label="Credit Card Number" variant="outlined"
                     onChange={(event)=>onChangeCreditCardDetails(event.target.value,'cardnumber')} />
            </Grid>
            <Grid item xs={12}>
                    <TextField className= {styles.cvv} id="outlined-basic" label="CVV" variant="outlined" 
                    onChange={(event)=>onChangeCreditCardDetails(event.target.value,'cardcodeno')}/>
                    <TextField className= {styles.cvv} id="outlined-basic" label="Exp Month" variant="outlined" 
                    onChange={(event)=>onChangeCreditCardDetails(event.target.value,'month')}/>
                    <TextField className= {styles.cvv} id="outlined-basic" label="Exp Year" variant="outlined" 
                     onChange={(event)=>onChangeCreditCardDetails(event.target.value,'year')}/>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="subtitle1" component="div">
                    Note : Your credit card details will not be stored in our system at any point in time.
                </Typography>
            </Grid>
            <Grid item xs={12}>
                <Button variant="container" size="large" onClick={onPay}>Pay</Button>
            </Grid>
           
        </Grid>
    )
}

export default CreditCardInterface;