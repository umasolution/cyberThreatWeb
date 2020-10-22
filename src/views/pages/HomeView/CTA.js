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
    backgroundImage: `url(${"/static/home/start_clean_bg.png"})`,
    paddingTop: 80,
    paddingBottom: 63,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 40,
      paddingBottom: 30,
    },
  },
  browseButton: {
    marginLeft: theme.spacing(2)
  },
  mainH2 : {
    fontWeight: theme.fontfamily.bold,
    color : "#fff",
    marginBottom : 22,
    fontSize:'26px',
    letterSpacing:'1px'
  },
  mainH3 : {
    fontWeight: theme.fontfamily.semiBold,
    color : "#fff",
    marginTop : 22,
    marginBottom : 14,
    fontSize:'18px',
    letterSpacing:'1px'
  },
  mainH5 : {
    fontWeight: theme.fontfamily.regular,
    color : "#fff",
    marginTop : 14,
    lineHeight: '27px',
    fontSize:'14px',
  },
  mainBtn :{
    marginTop : 50
  },
  startedButton :{
    borderRadius: 35,
    backgroundColor: "#ff0476",
    padding: "10px 40px",
    fontWeight: theme.fontfamily.semiBold,
    fontSize:'14px',
    letterSpacing:'1px'
  }
}));

function CTA({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      id="ctapage"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          className={classes.mainH2}
          mt={4}
        >
          Start Clean
        </Typography>
        <Typography
          variant="h3"
          align="center"
          className={classes.mainH3}
          m={4}
          color="secondary"
        >
          Use our certified base images to start building your applications.
        </Typography>
      </Container>
      <Container maxWidth="sm">
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h5"
            align="center"
            color="secondary"
            className={classes.mainH5}
          >
            Know before you use an image from Dockerhub or other public sources. Our pre-scanned reports provide you a report on vulnerabilities in popular dockerhub images.
           </Typography>
        </Box>
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.mainBtn}
        >
         <Button
                color="secondary"
                size="large"
                type="button"
                variant="contained"
                className={classes.startedButton}
                
              >
                GET STARTED
              </Button>
         </Box>     
      </Container>
    </div>
  );
}

CTA.propTypes = {
  className: PropTypes.string
};

export default CTA;
