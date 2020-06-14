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
  }
}));

function Features({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
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
              <Box display="flex">
                <Avatar className={classes.avatar}>
                  01
                </Avatar>
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                  >
                    Develop using open source...with confidence
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                  >
                    {/* Not just a set of tools, the package includes the most common use cases of
                    user flows like User Management, Second Level Layout. */}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <Box display="flex">
                <Avatar className={classes.avatar}>
                  02
                </Avatar>
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                  >
                    Use public container images...with confidence.
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                  >
                    {/* The kit provides support for multiple third-party plugins right out of the box
                    like Chart.js, Dropzone.js, Kanban Plugin and many more. */}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <Box display="flex">
                <Avatar className={classes.avatar}>
                  03
                </Avatar>
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                  >
                   Scan your containers...with confidence
                  </Typography>
                  <Typography
                    variant="body1"
                    color="textPrimary"
                    gutterBottom
                  >
                    {/* We&apos;ve included the source Sketch &amp; Figma files to Plus &amp;
                    Extended licenses so you can get creative! Build layouts with confidence. */}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
            >
              <Box display="flex">
                <Avatar className={classes.avatar}>
                  04
                </Avatar>
                <Box ml={2}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    color="textPrimary"
                  >
                   Don't stop at scanning your code and containers. Scan your Virtual Machines and Servers...with confidence.
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Typography
                    variant="body1"
                    color="textPrimary"
                    gutterBottom
                  >
                    With our powerful scanning technology detect vulnerabilities in your code, standard applications, containers and operating system. Consolidate tools for better ROI.
                  </Typography>
        </Box>
      </Container>
    </div>
  );
}

Features.propTypes = {
  className: PropTypes.string
};

export default Features;
