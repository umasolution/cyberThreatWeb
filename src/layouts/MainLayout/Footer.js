import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Link as RouterLink } from 'react-router-dom';
import Logo from 'src/components/Logo';
import TopMenu from './TopMenu';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
  Avatar
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 51,
    paddingBottom: 23

  },
  browseButton: {
    marginLeft: theme.spacing(2)
  },
  logo: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  rounded : {

  },
  large: {
    //width: theme.spacing(6),
    //height: theme.spacing(6),
    width:52,
    height:52,
    marginRight: theme.spacing(2),
    borderRadius: '16px',
    background:'#e7e9ef',
    color:'#494949',
  },
  socialicon : {
    borderBottom : "1px solid #efeff2",
    paddingBottom: "40px",
    marginTop: "10px"
  },
  copyright : {
    fontWeight: theme.fontfamily.regular,
    color : "#bdbfc5",
    fontSize: '13px',
    color:'#33394d',
    opacity:'0.6',
    letterSpacing:'0.8px',
  },
  footerMenu :{
    '& > ul' :{
      padding:0,
    }
  }
}));


function Footer({ className, ...rest }) {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
       <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
        <RouterLink to="/">
          <Logo className={classes.logo} />
        </RouterLink>
        </Box>
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.footerMenu}
        >
        <TopMenu />
        </Box>
      </Container>
      <Container id="socialicon" maxWidth="lg" className={classes.socialicon}>
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar variant="rounded" className={classes.large}>
            <FacebookIcon />
          </Avatar>
          <Avatar variant="rounded" className={classes.large}>
            <TwitterIcon />
          </Avatar>
          <Avatar variant="rounded" className={classes.large}>
            <LinkedInIcon />
          </Avatar>
          <Avatar variant="rounded" className={classes.large}>
            <InstagramIcon />
          </Avatar>
        </Box>
      </Container>
      <Container id="copyright" maxWidth="xl">
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
        <Typography
            variant="h6"
            align="center"
            color="secondary"
            className={classes.copyright}
          >
         Copyright @ 2020 Niah Security, All right Reserved.
         </Typography>
         </Box>     
      </Container>
    </div>
  );
}

Footer.propTypes = {
  className: PropTypes.string
};

export default Footer;
