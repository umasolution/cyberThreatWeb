import React, { useState } from 'react';
import clsx from 'clsx';
import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Paper,
  Typography,
  makeStyles,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  TextField
} from '@material-ui/core';
import Page from 'src/components/Page';
import './subscriptionNew.css'
import Axios from 'axios';
import NiahFlexi from '../NiahFlexi';
import { useHistory } from 'react-router';
import { licenseURL } from 'src';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalCost, openFlexiPopup, openPaymentPopup, openPricingPopup, setPricingConfigurations, setSubscriptionModel, setTotalScans, setUsers } from 'src/actions/pricingAction';
import NiahFlexiPopup from './NiahFlexiPopup';
import PaymentPopup from '../../Payment/PaymentPopup';
import PricingPopup from './PricingPopup';
import { Icon } from '@iconify/react';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    minHeight: '100%',
    height: '100%',
    paddingTop: 20,
    paddingBottom: 20
  },
  product: {
    position: 'relative',
    padding: theme.spacing(5, 3, 2, 3),
    cursor: 'pointer',
    boxShadow: '4px 0px 81px rgba(43, 40, 30, 0.11)',
    borderRadius:'0px 50px 0px 50px',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '&:hover': {
      transform: 'scale(1.1)',
      boxShadow:'0 1.5rem 2.5rem rgb(22 28 45 / 10%), 0 0.3rem 0.5rem -0.5rem rgb(22 28 45 / 5%)'
    }
  },
  productImage: {
    
  },
  servicesList: {

  },
  productImage1: {
   maxHeight:' 75px'
  },
  checkImage: {

  },
  recommendedProduct: {
    /*backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white*/
  },
  chooseButton1: {
    backgroundColor: '#00d1ce',
    borderRadius:'0 25px 0 25px',
    lineHeight:'52px',
    padding:0,
    color:'#fff',
    fontWeight:700,
    fontSize:'16px',
    letterSpacing:'0.8px',
    boxShadow: '4px 0px 81px rgba(43, 40, 30, 0.11)',
   '&:hover': {
      backgroundColor: '#00d1ce',
    }
  },
  chooseButton2: {
    backgroundColor: '#ff0476',
    borderRadius:'0 25px 0 25px',
    lineHeight:'52px',
    padding:0,
    color:'#fff',
    fontWeight:700,
    fontSize:'16px',
    letterSpacing:'0.8px',
    boxShadow: '4px 0px 81px rgba(43, 40, 30, 0.11)',
    '&:hover': {
      backgroundColor: '#ff0476',
    }
  },
  chooseButton3: {
    backgroundColor: '#ff9f00',
    borderRadius:'0 25px 0 25px',
    lineHeight:'52px',
    padding:0,
    color:'#fff',
    fontWeight:700,
    fontSize:'16px',
    letterSpacing:'0.8px',
    boxShadow: '4px 0px 81px rgba(43, 40, 30, 0.11)',
   '&:hover': {
      backgroundColor: '#ff9f00',
    }
  },
  mainH2 : {
    fontWeight: theme.fontfamily.bold,
    fontSize: '26px',
    fontWeight: 700,
    letterSpacing: '1px',
  },
  subtitle1 :{
    fontWeight: theme.fontfamily.regular,
    color: '#333333',
    fontSize: '14px',
    maxWidth:'630px',
    margin:'0 auto',
    letterSpacing:'0.8px',
  },
  user :{
    fontWeight: theme.fontfamily.semiBold,
    fontSize:'15px',
    color:'#444444',
    paddingTop:25,
    display: 'inline-block',
  }

}));

function SubscriptionNew(subscription) {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()
  const pricing = useSelector(state => state.pricing)
  const profile = useSelector(state => state.account)
  const response = useSelector(state => state.pricing.transactionResponse)
  const licenseDetails = useSelector(state => state.license.licenseDetails)

  const onGridClick = async (values) => {
   
    if(values.subscription_name == "NiahFlexi"){
      const response = await Axios.get(`${licenseURL}data/subscription`)
      dispatch(setPricingConfigurations(response))
      dispatch(openFlexiPopup(true))
    } else if(values.subscription_name == "NiahEnterprise"
    || values.subscription_name == "NiahLite" || values.subscription_name == "Free"){
      dispatch(openPricingPopup(true))
    }
  }

  const subscribePlan = async (values, event) => {
    event.stopPropagation();
    dispatch(setSubscriptionModel({
      displayName: values.subscription_name, model: values.subscription_name
    }));
    if (values.subscription_name != "NiahFlexi") {
      dispatch(setTotalScans(0));
      dispatch(setUsers(0));
      if (pricing.annualCost != 0) {
        dispatch(getTotalCost())
        dispatch(getTotalCost())
      }
    }
    if (values.subscription_name == "NiahLite" || values.subscription_name == "Free") {
      const response = await Axios.get(`${licenseURL}data/subscription`)
      dispatch(setPricingConfigurations(response))
      dispatch(setTotalScans(values.scans));
      dispatch(getTotalCost());
      dispatch(setUsers(values.users));
      dispatch(getTotalCost());
    }
    dispatch(openPaymentPopup(true))
  }
  return (
    <Page
      className={classes.root}
      title="Niah Security"
      id="PricingView" 
    >
      {
        pricing.flexiPopup ? <NiahFlexiPopup /> : <></>
      }
      {
        pricing.paymentPopup ? <PaymentPopup /> : <></>
      }
      <Box mt="25px" mb="50px">
        <Container maxWidth="lg">
        <div style={{display: 'flex', marginBottom:"45px"}}>
            <TextField
              fullWidth
              label="Emailid"
              margin="normal"
              name="Emailid"
              type="text"
              inputProps={{ readOnly: true }}
              value={profile.profileDetails.email_id}
              variant="outlined"
              className='flex-contents'
            />
            <TextField
              fullWidth
              label="Subscription"
              margin="normal"
              name="Subscription"
              type="text"
              inputProps={{ readOnly: true }}
              value={response.subscription !='' ? response.subscription : profile.profileDetails.subscription}
              variant="outlined"
              className='flex-contents'
            />
            <TextField
              fullWidth
              label="Status"
              margin="normal"
              name="Emailid"
              type="text"
              inputProps={{ readOnly: true }}
              value={response.status !='' ? response.status : profile.profileDetails.status}
              variant="outlined"
              className='flex-contents'
            />
            </div>
          <Grid
            container
            spacing={3}
          >
           

            {subscription.subscription.map((values)=>(
                <Grid
                item
                md={3}
                sm={6}
                xs={12}
               
              >
                <Paper
                  className={classes.product}
                  elevation={1}
                >
                  <Box className="price-top">
                    <img
                    alt="Product"
                    className={classes.productImage1}
                      src={`/static/images/products/${
                        values.subscription_name == "NiahEnterprise"? 'product_agency--outlined' :
                        values.subscription_name == "NiahFlexi" ? "product_enterprise" :
                        values.subscription_name == "Free" ?  "product_freelancer" :
                        "product_freelancer"
                      }.png`}
                    />
                    <div className="right-content">
                      <Typography
                        component="h3"
                        gutterBottom
                        variant="overline"
                        color="textSecondary"
                        className={values.subscription_name == "NiahEnterprise" ?
                        "break-content" : ''
                      }
                      >
                       {values.subscription_name}
                      </Typography>
                      </div>
  
                  </Box>
                  
                  <Typography
                    variant="overline"
                    color="textSecondary"
                    className={classes.user}
                  >
                    {values.description}
                  </Typography>
                  <List className="services-list">
                    {
                        values.alerts == 'yes' ? (
                            <ListItem alignItems="flex-start">
                            <img
                            alt="Product"
                            className={classes.checkImage}
                              src="/static/images/products/check1.png"
                            />
                            <ListItemText>
                            Alerts
                            </ListItemText>
                          </ListItem>
                        ): ''
                    }
                   {
                        values["container security"] == 'yes' ? (
                            <ListItem alignItems="flex-start">
                            <img
                            alt="Product"
                            className={classes.checkImage}
                              src="/static/images/products/check1.png"
                            />
                            <ListItemText>
                            Container Security
                            </ListItemText>
                          </ListItem>
                        ): ''
                    }
                     {
                        values["license compliance"] == 'yes' ? (
                            <ListItem alignItems="flex-start">
                            <img
                            alt="Product"
                            className={classes.checkImage}
                              src="/static/images/products/check1.png"
                            />
                            <ListItemText>
                           License Compliance
                            </ListItemText>
                          </ListItem>
                        ): ''
                    }
                   
                    {
                        values["open source security"] == 'yes' ? (
                            <ListItem alignItems="flex-start">
                            <img
                            alt="Product"
                            className={classes.checkImage}
                              src="/static/images/products/check1.png"
                            />
                            <ListItemText>
                           Open Source Security
                            </ListItemText>
                          </ListItem>
                        ): ''
                    }
                     {
                        values.reporting == 'yes' ? (
                            <ListItem alignItems="flex-start">
                            <img
                            alt="Product"
                            className={classes.checkImage}
                              src="/static/images/products/check1.png"
                            />
                            <ListItemText>
                           Reporting
                            </ListItemText>
                          </ListItem>
                        ): ''
                    }
                    <ListItem alignItems="flex-start">
                      <img
                      alt="Product"
                      className={classes.checkImage}
                        src="/static/images/products/check1.png"
                      />
                      <ListItemText>
                        {
                          values.subscription_name == "NiahFlexi" ?(
                          <>
                          {pricing.totalScans} scans
                          <Icon icon="akar-icons:edit"
                           style={{marginLeft: '5px', marginTop:'3px'}}
                           onClick={() => onGridClick(values)}
                          /></>
                          )  : `${values.scans} scans`
                        }
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <img
                      alt="Product"
                      className={classes.checkImage}
                        src="/static/images/products/check1.png"
                      />
                      <ListItemText>
                      {
                          values.subscription_name == "NiahFlexi" ?(
                            <>
                            {pricing.users} users
                            <Icon icon="akar-icons:edit" 
                            style={{marginLeft: '5px', marginTop:'3px'}}
                             onClick={() => onGridClick(values)}
                            /></>
                            ) : `${values.users} Users`
                        }
                      </ListItemText>
                    </ListItem>
                  </List>
                  <Button
                    variant="contained"
                    fullWidth
                    className={(values.subscription_name == "NiahLite" || 
                    values.subscription_name == "Free")
                    ? classes.chooseButton1 : values.subscription_name == "NiahEnterprise" ?
                    classes.chooseButton2 : classes.chooseButton3}
                    onClick={(event) => subscribePlan(values, event)}
                  >
                    Choose Plan
                  </Button>
                </Paper>
              </Grid>
            ))}
            
          
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}

export default SubscriptionNew;
