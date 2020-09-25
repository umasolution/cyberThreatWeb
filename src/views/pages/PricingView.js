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
    padding: theme.spacing(5, 3),
    cursor: 'pointer',
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
  chooseButton: {
    backgroundColor: theme.palette.common.white
  },
  mainH1 : {
    fontWeight: theme.fontfamily.bold,
  },
  subtitle1 :{
    fontWeight: theme.fontfamily.semiBold,
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
          variant="h1"
          className={classes.mainH1}
          color="textPrimary"
        >
          Start today. Boost up your services!
        </Typography>
      </Container>
      <Container maxWidth="sm">
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
      <Box mt="50px">
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
                <Box>
                  <img
                  alt="Product"
                  className={classes.productImage}
                    src="/static/images/products/product_freelancer.png"
                  />
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
                    >
                      $5
                    </Typography>
                    <Typography
                      component="span"
                      display="inline"
                      variant="subtitle2"
                      color="textSecondary"
                    >
                      /month
                    </Typography>
                  </div>
                </Box>
                
                <Typography
                  variant="overline"
                  color="textSecondary"
                >
                  Max 1 user
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <List className={classes.servicesList}>
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
                <Box my={2}>
                  <Divider />
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.chooseButton}
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
               <Box>
                <img
                  alt="Product"
                  className={classes.productImage}
                  src="/static/images/products/product_agency--outlined.png"
                />
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
                  >
                    $29
                  </Typography>
                  <Typography
                    component="span"
                    display="inline"
                    variant="subtitle2"
                    color="inherit"
                  >
                    /month
                  </Typography>
                </div>
                </Box>
                <Typography
                  variant="overline"
                  color="inherit"
                >
                  Max 3 user
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                <List className={classes.servicesList}>
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
                <Box my={2}>
                  <Divider />
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.chooseButton}
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
                 <Box>
                <img
                  alt="Product"
                  className={classes.productImage}
                  src="/static/images/products/product_enterprise.png"
                />
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
                  >
                    $259
                  </Typography>
                  <Typography
                    component="span"
                    display="inline"
                    variant="subtitle2"
                    color="textSecondary"
                  >
                    /month
                  </Typography>
                </div>
                <Typography
                  variant="overline"
                  color="textSecondary"
                >
                  Unlimited
                </Typography>
                <Box my={2}>
                  <Divider />
                </Box>
                 </Box>
                 <List className={classes.servicesList}>
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
                <Box my={2}>
                  <Divider />
                </Box>
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.chooseButton}
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
