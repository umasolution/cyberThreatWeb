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
    paddingBottom: 20
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  featureImage:{

  },
  mainH4:{
    fontWeight: theme.fontfamily.semiBold,
  },
  body1:{
    fontWeight: theme.fontfamily.medium,
  }
}));

function Features({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    > 
      <Container maxWidth="md">       
        <Box mt={3}>
          <Typography
            align="center"
            variant="subtitle1"
            color="textSecondary"
          >
            Welcome to the first platform created for freelancers and agencies
            for showcasing and finding the best clinets in the market.
            30% of our income goes into Whale Charity
          </Typography>
        </Box>
      </Container>
      <Container maxWidth="lg">
        <Box mt={2}>
          <Grid
            container
            spacing={1}
          >
            <Grid
              item
              xs={12}
              md={3}
            >
              <Box borderRadius={16} boxShadow={3} p={2} m={1} minHeight={250}>
                <img
                  alt="Features"
                  className={classes.featureImage}
                    src="/static/ic_1.png"
                  />
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH4}
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
              md={3}
            >
              <Box borderRadius={16} boxShadow={3} p={2} m={1} minHeight={250}>
               <img
                  alt="Features"
                  className={classes.featureImage}
                    src="/static/ic_2.png"
                  />
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH4}
                  >
                    Use public container images...with confidence.
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    className={classes.body1}
                  >
                   The kit provides support for multiple third-party plugins right out of the box
                    like Chart.js, Dropzone.js, Kanban Plugin and many more.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <Box borderRadius={16} boxShadow={3} p={2} m={1} minHeight={250}>
                <img
                  alt="Features"
                  className={classes.featureImage}
                    src="/static/ic_3.png"
                  />
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH4}
                  >
                   Scan your containers...with confidence
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    gutterBottom
                    className={classes.body1}
                  >
                    We&apos;ve included the source Sketch &amp; Figma files to Plus &amp;
                    Extended licenses so you can get creative! Build layouts with confidence.
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <Box borderRadius={16} boxShadow={3} p={2} m={1} minHeight={250}>
                <img
                  alt="Features"
                  className={classes.featureImage}
                    src="/static/ic_4.png"
                  />
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                    className={classes.mainH4}
                  >
                   Don't stop at scanning your code and containers. Scan your Virtual Machines and Servers...with confidence.
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    gutterBottom
                    className={classes.body1}
                  >
                    With our powerful scanning technology detect vulnerabilities in your code, standard applications, containers and operating system. Consolidate tools for better ROI.
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
