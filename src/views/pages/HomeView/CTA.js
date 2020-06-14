import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
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
  browseButton: {
    marginLeft: theme.spacing(2)
  }
}));

function CTA({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h1"
          align="center"
          color="textPrimary"
        >
          Start Clean
        </Typography>
        <Typography
          variant="h3"
          align="left"
          mt={4}
          color="secondary"
        >
          Use our certified base images to start building your applications.
        </Typography>
        <Box
          mt={2}
          display="flex"
          justifyContent="left"
          alignItems="left"
        >
          <Typography
            variant="h5"
            align="left"
            color="secondary"
          >
            Know before you use an image from Dockerhub or other public sources. Our pre-scanned reports provide you a report on vulnerabilities in popular dockerhub images.
           </Typography>
        </Box>
      </Container>
    </div>
  );
}

CTA.propTypes = {
  className: PropTypes.string
};

export default CTA;
