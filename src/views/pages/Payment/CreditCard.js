
import { Grid, TextField, Typography, makeStyles, Button } from '@material-ui/core';
import Axios from 'axios';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { licenseURL } from 'src';
import { setErrorMsg, setErrorStatus, setTransactionResponse } from 'src/actions/pricingAction';

const useStyle = makeStyles({
    txt: {
        width: '30%'
    },
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cvv: {
        width: '5%',
        marginRight: '10px'
    }
});

const CreditCardInterface = ({ subscription, users, scans, amount }) => {
    const styles = useStyle();
    const dispatch = useDispatch();
    const profile = useSelector(state => state.account.profileDetails)
    const selectedModel = useSelector(state => state.pricing.selectedSubscriptionModel)
    const details = useSelector(state => state.pricing.transactionResponse)

    const [card, setCardDetails] = useState({
        cardnumber: 0,
        name: '',
        cardcodeno: 0,
        month: '',
        year: '',
        firstname: profile.firstname,
        lastname: profile.lastname,
        emailid: profile.email_id,
        companyName: profile.company_name,
        address: profile.address1,
        city: profile.city,
        country: profile.country,
        state: profile.state,
        pincode: profile.pincode,
        phone: profile.phone,
    });


    const onPay = async () => {
        try {
            const payment = await Axios.post( `${licenseURL}subscription/register`, {
                cardnumber: card.cardnumber,
                cardcodeno: card.cardcodeno,
                expiredate: card.year + '-' + card.month,
                users,
                subscription,
                scans,
                amount,
                firstname: card.firstname,
                lastname: card.lastname,
                companyname: card.companyName,
                city: card.city,
                state: card.state,
                country: card.country,
                phone: card.phone,
                pincode: card.pincode,
                emailid: card.emailid,
                address: card.address
            });
            console.log(payment.data)
           dispatch(setTransactionResponse(payment.data))

           if (payment.status == 1) {
                try {
                    const updatePayment = await Axios.post('/auth/update/license', {
                        code: details.code,
                        subscription: details.subscription
                    })
                    if (updatePayment.data.meassage != '') {

                      //  dispatch(setErrorMsg(updatePayment.data.meassage))
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        } catch (error) {
            console.log(error)
        }



    }

    const onChangeCreditCardDetails = (changedTxt, item) => {

        setCardDetails({ ...card, [item]: changedTxt })
    }

    return (
        <>
            {
                selectedModel != "Free" ? (
                    <>
                        <Grid container spacing={2} className={styles.root}>

                            <Grid item xs={12}>
                                <Typography variant="h5" component="div">
                                    Credit Card Details
                                </Typography>
                            </Grid>
                            {/* <Grid item xs={12}>
                <TextField className= {styles.txt} id="outlined-basic" label="Name in the Card" variant="outlined" 
                            onChange={(event)=>onChangeCreditCardDetails(event.target.value,'name')} />
            </Grid> */}
                            <Grid item xs={6}>
                                <TextField id="outlined-basic"
                                    label="Firstname" variant="outlined" required fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={card.firstname}
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'firstname')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic"
                                    label="Lastname" variant="outlined" required fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={card.lastname}
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'lastname')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic"
                                    label="Email" variant="outlined" required fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    inputProps={{ readOnly: true }}
                                    value={card.emailid}
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'emailid')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic"
                                    label="Companyname" variant="outlined" required fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={card.companyName}
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'companyName')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic"
                                    label="Address" variant="outlined" required fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={card.address}
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'address')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic"
                                    label="City" variant="outlined" required fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={card.city}
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'city')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic"
                                    label="State" variant="outlined" required fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={card.state}
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'state')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic"
                                    label="Pincode" variant="outlined" required fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={card.pincode}
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'pincode')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic"
                                    label="Phone" variant="outlined" required fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={card.phone}
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'phone')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic"
                                    label="Country" variant="outlined" required fullWidth
                                    InputLabelProps={{ shrink: true }}
                                    value={card.country}
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'country')}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic" label="Name in the Card" variant="outlined" required fullWidth
                                    InputLabelProps={{ shrink: true }} onChange={(event) => onChangeCreditCardDetails(event.target.value, 'name')} />
                            </Grid>
                            {/* <Grid item xs={12}>
                    <TextField className= {styles.txt} id="outlined-basic" label="Credit Card Number" variant="outlined"
                     onChange={(event)=>onChangeCreditCardDetails(event.target.value,'cardnumber')} />
            </Grid> */}
                            <Grid item xs={12} sm={6}>
                                <TextField label="Credit Card Number" id="outlined-basic" name="ccnumber" variant="outlined" required fullWidth
                                    InputLabelProps={{ shrink: true }} placeholder="1234 1234 1234 1234"
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'cardnumber')}
                                />
                            </Grid>
                            <Grid item xs={3} >
                                <TextField id="outlined-basic" label="Exp Month" variant="outlined" required
                                    InputLabelProps={{ shrink: true }} placeholder="MM"
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'month')} />
                            </Grid>
                            <Grid item xs={3} >
                                <TextField id="outlined-basic" label="Exp Year" variant="outlined" required
                                    InputLabelProps={{ shrink: true }} InputProps={{ inputProps: { min: 0, max: 99 } }} placeholder="YY"
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'year')} />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="outlined-basic" label="CVV" variant="outlined" required fullWidth
                                    InputLabelProps={{ shrink: true }} placeholder="CVV"
                                    onChange={(event) => onChangeCreditCardDetails(event.target.value, 'cardcodeno')} />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="subtitle1" component="div">
                                    Note : Your credit card details will not be stored in our system at any point in time.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="Primary" size="large" onClick={onPay}>Pay</Button>
                            </Grid>

                        </Grid></>
                ) : <>
                    <Grid item xs={12}>
                        <Button variant="contained" color="Primary" size="large" onClick={onPay}>Pay</Button>
                    </Grid>
                </>
            }
        </>


    )
}

export default CreditCardInterface;