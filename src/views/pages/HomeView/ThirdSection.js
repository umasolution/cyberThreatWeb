import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
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
  subText:{
    marginTop:10,
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

function ThirdSection({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      className="third-featureBox-row"
      {...rest}
    > 
      <Container maxWidth="md" className="third-featureBox">       
        <Typography
            align="center"
            color="textSecondary"
            variant="h2"
          >
            Niah Security Vulnerability Database
          </Typography>
         <Typography
            align="center"
            color="textSecondary"
            variant="h5"
            className={classes.subText}
          >
           Threat Intelligence that helps secure your Code, Applications and Operating Systems
          </Typography> 
        <Box mt={3}>
          <Typography
            align="center"
            variant="subtitle1"
            color="textSecondary"
            className={classes.welcomText}
          >
            Niah Security's Vulnerability database is much larger than any publicly available vulnerability database. 
          </Typography>
        </Box>
      </Container>
      <Container maxWidth="lg" className="third-featureBox-2">
        <Box mt={2} >
          <Grid
            container
            spacing={1}
            className="gridBox-Container"
          >
            <Grid
              item
              xs={12}
              md={4}
              className="gridBox"
            >
              <Box className={classes.featureBox} borderRadius={16} boxShadow={3} p={2} m={1} minHeight={250}>
                <img
                  alt="Features"
                  className={classes.featureImage}
                    src="/static/android-icon-36x36.png"
                  />
                <Box>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH4}
                  >
                    Niah Security's Vulnerability database is much larger than any publicly available vulnerability database. 
                  </Typography>
                  
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              className="gridBox"
            >
              <Box className={classes.featureBox} borderRadius={16} boxShadow={3} p={2} m={1} minHeight={250}>
                <img
                  alt="Features"
                  className={classes.featureImage}
                    src="/static/android-icon-36x36.png"
                  />
                <Box>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH4}
                  >
                    Curated data sourced from public sources, internal research and direct souring from security researchers
                  </Typography>
                  
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              className="gridBox"
            >
              <Box className={classes.featureBox} borderRadius={16} boxShadow={3} p={2} m={1} minHeight={250}>
              <img
                  alt="Features"
                  className={classes.featureImage}
                    src="/static/android-icon-36x36.png"
                  />
                <Box>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH4}
                  >
                   Manual Quality Checks on the data to not leave your security to bots
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

ThirdSection.propTypes = {
  className: PropTypes.string
};

export default ThirdSection;
