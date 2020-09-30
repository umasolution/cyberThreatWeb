import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Container,
  Typography,
  makeStyles,
  Grid,
  Paper
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  marginAutoContainer: {
    display: 'flex',
  },
  marginAutoItem: {
    margin: 'auto'
  },
  mainH2:{
    fontWeight: theme.fontfamily.semiBold,
    fontSize:'18px',
    marginBottom: 10,
  },
  body1:{
    fontWeight: theme.fontfamily.medium,
    fontSize:'14px',
    lineHeight: '30px'
  },
  imageSection:{
    paddingTop:100,
  }
}));

function LeftRightImage({ className, ...rest }) {
  const classes = useStyles();
  return (
    <div className={classes.imageSection}>
    <div id="rightImage" className={classes.root}>
      <Container maxWidth="lg">
        <Box mt={2}>
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              xs={12}
              md={6}
              className={classes.marginAutoContainer}
            >
              <Box className={classes.marginAutoItem}>
                <Box ml={2} textAlign="right">
                  <Typography
                    variant="h2"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH2}
                  >
                    Develop using open source...with confidence
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    className={classes.body1}
                  >
                    Not just a set of tools, the package includes the most common use cases of
                    user flows like User Management, Second Level Layout.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <Box>
                <Box ml={2}>
                  <img
                    alt="Presentation"
                    src="/static/home/img1.png"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
    <div id="leftImage" className={classes.root}>
      <Container maxWidth="lg">
        <Box mt={2}>
          <Grid
            container
            spacing={1}
          > <Grid
              item
              xs={12}
              md={6}
            >
              <Box>
                <Box ml={2}>
                  <img
                    alt="Presentation"
                    src="/static/home/img2.png"
                  />
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              className={classes.marginAutoContainer}
            >
              <Box className={classes.marginAutoItem}>
                <Box ml={2}>
                  <Typography
                    variant="h2"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH2}
                  >
                    Develop using open source...with confidence
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    className={classes.body1}
                  >
                    Not just a set of tools, the package includes the most common use cases of
                    user flows like User Management, Second Level Layout.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            
          </Grid>
        </Box>
      </Container>
    </div>
    <div id="rightImage" className={classes.root}>
      <Container maxWidth="lg">
        <Box mt={2}>
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              xs={12}
              md={6}
              
              className={classes.marginAutoContainer}
            >
              <Box className={classes.marginAutoItem}>
                <Box ml={2} textAlign="right">
                  <Typography
                    variant="h2"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH2}
                  >
                    Develop using open source...with confidence
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    className={classes.body1}
                  >
                    Not just a set of tools, the package includes the most common use cases of
                    user flows like User Management, Second Level Layout.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <Box>
                <Box ml={2}>
                  <img
                    alt="Presentation"
                    src="/static/home/img3.png"
                  />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
    </div>
  );
}  

LeftRightImage.propTypes = {
  className: PropTypes.string
};

export default LeftRightImage;

