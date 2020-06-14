import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Container,
  Typography,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 20,
    paddingBottom: 20
  },
  title: {
    fontWeight: theme.typography.fontWeightRegular
  }
}));

function Testimonials({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      id="Testimonials"
      {...rest}
    >
      <Container maxWidth="md">
        <Typography
          variant="body1"
          align="center"
          color="textPrimary"
          className={classes.title}
        >
          Your goal is to deliver fast. Our goal is to ensure that you deliver secure. To ensure your goals meet the security goals too, we bring you the best in class tools that integrate with your CI/CD tools to detect and fix vulnerabilities as early as you can.
        </Typography>
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
              variant="h1"
              color="secondary"
            >
          Not just detect vulnerabilities. Fix them!
        </Typography>
          
        </Box>
        <Box ml={2} mt={2}>
            <Typography
              variant="body1"
              color="textPrimary"
            >
              Fixing vulnerablities can be a tedious process. Once a developer is informed of vulnerablities in a certain library, their next task is to find the fixed versions of the library. Versions that won't break their applications. Our tools enable you to update your code directly. A pull request is automatically generated to fix the code.
            </Typography>
          </Box>
          <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
              variant="h1"
              color="secondary"
            >
          Shift Left. Detect Early.
        </Typography>
          
        </Box>
      </Container>
    </div>
  );
}

Testimonials.propTypes = {
  className: PropTypes.string
};

export default Testimonials;
