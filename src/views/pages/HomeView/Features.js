import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {ReactComponent as OpenSource} from './images/openSource.svg';
import {ReactComponent as ScanContainers} from './images/scanContainers.svg';
import {ReactComponent as PublicContainer} from './images/2nd.svg';
import {ReactComponent as VirtualMachines} from './images/4th.svg';


import {
  Avatar,
  Button,
  Box,
  Container,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 20,
    paddingBottom: 40
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  featureImage:{
    boxShadow: '4px 0px 65px rgba(43, 40, 30, 0.10)',
    marginBottom:'25px',
  },
  mainH4: {
    fontWeight: theme.fontfamily.semiBold,
    fontSize:'16px',
  },
  body1: {
    fontWeight: theme.fontfamily.medium,
    fontSize:'14px'
  },
  welcomText: {
    maxWidth:675,
    margin:'0 auto',
    color:'#333333',
    fontSize:14,
    marginBottom:50,
  },
  featureBox: {
    height:'100%',
    boxShadow:'4px 0px 67px rgba(46,57,124,0.07)',
    padding:'10px 15px;',
    [theme.breakpoints.down('xs')]: {
      height:'auto',
      marginBottom:'25px'
    },
    '&:hover' : {
      transform: 'translateY(-20px)',
      boxShadow:'0 1.5rem 2.5rem rgb(22 28 45 / 10%), 0 0.3rem 0.5rem -0.5rem rgb(22 28 45 / 5%)'
    }
  },
  gridBox: {
    padding:'0 8px !important',
    
  }
}));

function Features({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      className="features-box-row"
      {...rest}
    > 
      {/*<Container maxWidth="md">       
        <Box mt={3}>
          <Typography
            align="center"
            variant="subtitle1"
            color="textSecondary"
            className={classes.welcomText}
          >
            Welcome to the first platform created for freelancers and agencies
            for showcasing and finding the best clinets in the market.
            30% of our income goes into Whale Charity
          </Typography>
        </Box>
      </Container>*/}
      <Container maxWidth="lg">
        <Box mt={2} >
          <Grid
            container
            spacing={1}
            className="gridBox-Container future-box"
          >
            <Grid
              item
              xs={12}
              md={3}
              className="gridBox"
            >
              <Box className={classes.featureBox} borderRadius={16} boxShadow={3} p={2} m={1} minHeight={250}>
                <OpenSource width="100%" height="65%" />
               {/* <img
                  alt="Features"
                  className={classes.featureImage}
                    src="/static/ic_1.jpg"
               />*/}
                <Box>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH4}
                  >
                    Develop using open source...with confidence
                  </Typography>
                  
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              className="gridBox"
            >
              <Box className={classes.featureBox} borderRadius={16} boxShadow={3} p={2} m={1} minHeight={250}>
               {/*<img
                  alt="Features"
                  className={classes.featureImage}
                    src="/static/ic_2.jpg"
               />*/}
                <PublicContainer width="100%" height="65%" />
                <Box>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH4}
                  >
                    Use public container images...with confidence.
                  </Typography>
                  
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              className="gridBox"
            >
              <Box className={classes.featureBox} borderRadius={16} boxShadow={3} p={2} m={1} minHeight={250}>
               {/*} <img
                  alt="Features"
                  className={classes.featureImage}
                    src="/static/ic_3.jpg"
              />*/}
               <ScanContainers width="100%" height="65%" />
                <Box>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH4}
                  >
                   Scan your containers...with confidence
                  </Typography>
                  
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              className="gridBox"
            >
              <Box className={classes.featureBox} borderRadius={16} boxShadow={3} p={2} m={1} minHeight={250}>
               {/*} <img
                  alt="Features"
                  className={classes.featureImage}
                    src="/static/ic_4.jpg"
            />*/}
                <VirtualMachines width="100%" height="65%" />
                <Box>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH4}
                  >
                   Scan your Virtual Machines and Servers...with confidence.
                  </Typography>
                  
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

Features.propTypes = {
  className: PropTypes.string
};

export default Features;
