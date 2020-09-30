import React from 'react';
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
  ListItemAvatar
} from '@material-ui/core';
import Page from 'src/components/Page';

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
    margin: '0 20px',
    transition: theme.transitions.create('transform', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    '&:hover': {
      transform: 'scale(1.1)'
    }
  },
  productImage: {
    
  },
  servicesList: {

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

function PricingView() {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Pricing"
      id="PricingView" 
    >
      <Container maxWidth="lg">
        <Typography
          align="center"
          variant="h2"
          className={classes.mainH2}
          color="textPrimary"
        >
          Start today. Boost up your services!
        </Typography>
      </Container>
      <Container maxWidth="md">
        <Box mt={3}>
          <Typography
            align="center"
            variant="subtitle1"
            color="textSecondary"
            className={classes.subtitle1}
          >
            Welcome to the first platform created for freelancers and agencies
            for showcasing and finding the best clinets in the market.
            30% of our income goes into Whale Charity
          </Typography>
        </Box>
      </Container>
      <Box mt="50px" mb="100px">
        <Container maxWidth="lg">
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Paper
                className={classes.product}
                elevation={1}
              >
                <Box className="price-top">
                  <img
                  alt="Product"
                  className={classes.productImage}
                    src="/static/images/products/product_freelancer.png"
                  />

                  <div className="right-content">
                    <Typography
                      component="h3"
                      gutterBottom
                      variant="overline"
                      color="textSecondary"
                    >
                      Freelancer
                    </Typography>
                    <div>
                      <Typography
                        component="span"
                        display="inline"
                        variant="h3"
                        color="textPrimary"
                        className="price-tag"
                      >
                        $5/
                      </Typography>
                      <Typography
                        component="span"
                        display="inline"
                        variant="subtitle2"
                        color="textSecondary"
                      >
                        month
                      </Typography>
                    </div>
                  </div>

                </Box>
                
                <Typography
                  variant="overline"
                  color="textSecondary"
                  className={classes.user}
                >
                  Max 1 user
                </Typography>
                <List className="services-list">
                  <ListItem alignItems="flex-start">
                    <img
                    alt="Product"
                    className={classes.checkImage}
                      src="/static/images/products/check1.png"
                    />
                    <ListItemText>
                   20 proposals/month   
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <img
                    alt="Product"
                    className={classes.checkImage}
                      src="/static/images/products/check1.png"
                    />
                    <ListItemText>
                   10 templates   
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <img
                    alt="Product"
                    className={classes.checkImage}
                      src="/static/images/products/check1.png"
                    />
                    <ListItemText>
                   Analytics dashboard  
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <img
                    alt="Product"
                    className={classes.checkImage}
                      src="/static/images/products/check1.png"
                    />
                    <ListItemText>
                   Email alerts  
                    </ListItemText>
                  </ListItem>
                </List>
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.chooseButton1}
                >
                  Choose Plan
                </Button>
              </Paper>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <Paper
                className={clsx(classes.product, classes.recommendedProduct)}
                elevation={1}
              >
               <Box className="price-top">
                  <img
                    alt="Product"
                    className={classes.productImage}
                    src="/static/images/products/product_agency--outlined.png"
                  />
                  <div className="right-content">
                    <Typography
                      component="h3"
                      gutterBottom
                      variant="overline"
                      color="inherit"
                    >
                      Agency
                    </Typography>
                    <div>
                      <Typography
                        component="span"
                        display="inline"
                        variant="h3"
                        color="inherit"
                        className="price-tag"
                      >
                        $29/
                      </Typography>
                      <Typography
                        component="span"
                        display="inline"
                        variant="subtitle2"
                        color="inherit"
                      >
                        month
                      </Typography>
                    </div>
                  </div>
                </Box>
                <Typography
                  variant="overline"
                  color="inherit"
                  className={classes.user}
                >
                  Max 3 user
                </Typography>
                <List className="services-list">
                  <ListItem alignItems="flex-start">
                    <img
                    alt="Product"
                    className={classes.checkImage}
                      src="/static/images/products/check2.png"
                    />
                    <ListItemText>
                   20 proposals/month   
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <img
                    alt="Product"
                    className={classes.checkImage}
                      src="/static/images/products/check2.png"
                    />
                    <ListItemText>
                   10 templates   
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <img
                    alt="Product"
                    className={classes.checkImage}
                      src="/static/images/products/check2.png"
                    />
                    <ListItemText>
                   Analytics dashboard  
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                    <img
                    alt="Product"
                    className={classes.checkImage}
                      src="/static/images/products/check2.png"
                    />
                    <ListItemText>
                   Email alerts  
                    </ListItemText>
                  </ListItem>
                </List>
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.chooseButton2}
                >
                  Choose Plan
                </Button>
              </Paper>
            </Grid>
            <Grid
              item
              md={4}
              xs={12}
            >
              <Paper
                className={classes.product}
                elevation={1}
              >
                <Box className="price-top">
                  <img
                    alt="Product"
                    className={classes.productImage}
                    src="/static/images/products/product_enterprise.png"
                  />
                  <div className="right-content">
                    <Typography
                      component="h3"
                      gutterBottom
                      variant="overline"
                      color="textSecondary"
                    >
                      Enterprise
                    </Typography>
                    <div>
                      <Typography
                        component="span"
                        display="inline"
                        variant="h3"
                        color="textPrimary"
                        className="price-tag"
                      >
                        $259/
                      </Typography>
                      <Typography
                        component="span"
                        display="inline"
                        variant="subtitle2"
                        color="textSecondary"
                      >
                        month
                      </Typography>
                    </div>
                  </div>
                </Box>  
                <Typography
                  variant="overline"
                  color="textSecondary"
                  className={classes.user}
                >
                  Unlimited
                </Typography>
                 
                 <List className="services-list">
                  <ListItem alignItems="flex-start">
                    <img
                    alt="Product"
                    className={classes.checkImage}
                      src="/static/images/products/check3.png"
                    />
                    <ListItemText>
                   All from above    
                    </ListItemText>
                  </ListItem>
                  <ListItem>
                   <img
                    alt="Product"
                    className={classes.checkImage}
                      src="/static/images/products/check3.png"
                    />
                   <ListItemText> 
                   Unlimited 24/7 support
                   </ListItemText>
                  </ListItem>
                  <ListItem>
                  <img
                    alt="Product"
                    className={classes.checkImage}
                      src="/static/images/products/check3.png"
                    />
                   <ListItemText>
                    Personalised Page
                   </ListItemText> 
                  </ListItem>
                  <ListItem>
                  <img
                    alt="Product"
                    className={classes.checkImage}
                      src="/static/images/products/check3.png"
                    />
                  <ListItemText>
                    Advertise your profile
                  </ListItemText>  
                  </ListItem>
                </List>
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.chooseButton3}
                >
                  Choose Plan
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Page>
  );
}

export default PricingView;
