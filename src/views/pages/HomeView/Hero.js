import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
  Button,
  TextField,
  Paper
} from '@material-ui/core';
import {
  withRouter
} from 'react-router-dom';
import moment from 'moment';
import CVEInput from './../../CVE/CVEInput/CVEInput';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    paddingTop: 5,
    paddingBottom: 20,
    [theme.breakpoints.down('md')]: {
      paddingTop: 60,
      paddingBottom: 60
    }
  },
  image: {
    perspectiveOrigin: 'left center',
    transformStyle: 'preserve-3d',
    perspective: 1500,
    '& > img': {
      maxWidth: '90%',
      height: 'auto',
      transform: 'rotateY(-35deg) rotateX(15deg)',
      backfaceVisibility: 'hidden',
      boxShadow: theme.shadows[16]
    }
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    '& > img': {
      maxWidth: '90%',
      height: 'auto'
    }
  },
  container: {
    marginTop: '10px'
  },
  mainContent: {
    
    padding: '10px'
  },
  mainContentH3: {
    // fontFamily: 'PrentonRPProLight,sans-serif',
    fontFamily: '"Montserrat",sans-serif !important',
    fontWeight: theme.fontfamily.bold,
    fontSize: '22px'
  },
  mainContentH2: {
    fontWeight: theme.fontfamily.light,
    marginBottom: '25px',
    fontFamily: '"Montserrat",sans-serif !important',
  },
  mainContentP: {
    color: '#fff'
  },
  mainContentsub: {
    
  },
  mainBannerBtn : {

  },
  mainContentH5: {
     fontWeight: theme.fontfamily.light,
  },
  searchbar: {
    backgroundColor: theme.palette.background.dark,
  }
}));


function Hero({ className, ...rest }) {
  const classes = useStyles();

  const { history } = { ...rest };
  const [searchByCVE, setSearchByCVE] = useState(true);
  const [cveInput, setCVEInput] = useState("");
  const [cveSearchStartDate, setCVESearchStartDate] = useState(new Date());
  const [cveSearchEndDate, setCVESearchEndDate] = useState(new Date());

  const handleChangeCVE = (event) => {
    setCVEInput(event.target.value);
  }
  const changeSearchByCVE = (event) => {
    setSearchByCVE(event.target.checked);
  };

  const onSearchClicked = () => {
    if (searchByCVE) {
      history.push(`/CVE/${cveInput}`);
    } else {
      // history.push(`/CVE/${moment(cveSearchStartDate).format("YYYY-MM-DD")}/${moment(cveSearchEndDate).format("YYYY-MM-DD")}`);
      history.push(`/CVE/${cveSearchStartDate}/${cveSearchEndDate}`);
    }
  }

  const keyPress = (event) => {
    if (event.keyCode === 13) {
      onSearchClicked();
    }
  }

  const setCVESearchDate = (dateType, date) => {
    if (dateType === 'startDate') {
      setCVESearchStartDate(date);
    } else {
      setCVESearchEndDate(date);
    }
  }

  const gotoRegister = () => {
    history.replace('/register')
  }


  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="false">
        <Grid
          container
          spacing={3}
          className={classes.container}
        >
          <Grid
            item
            xs={12}
            md={5}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
              <div className={classes.mainContent}>
                <h3 className={classes.mainContentH3}>Continuous Integration.</h3>
                <h3 className={classes.mainContentH3}>Continuous Development.</h3>
                <h3 className={classes.mainContentH3}>Continuous Confidence.</h3>
              </div>
              <div className={classes.mainContentSub}>
                <h5 className={classes.mainContentH5}>Confidently scan for vulnerablities in your source code,</h5>
                <h5 className={classes.mainContentH5}>container image, virtual machine or physical servers.</h5>
              </div>
              <div className={classes.mainBannerBtn}><Button
                color="secondary"
                size="large"
                type="button"
                variant="contained"
                onClick={gotoRegister}
                style={{marginTop: '8px'}}
              >
                Explore More
              </Button></div>
              
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={7}
          >
            <Box position="relative">
              <div className={classes.image}>
                <img
                  alt="Presentation"
                  src="/static/home/hero_banner.png"
                />
              </div>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
          >
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              height="100%"
            >
          
          </Box>
          </Grid>
        </Grid>
      
      </Container>
      <Container maxWidth="md" className={classes.searchbar}>       
        <Box mt={3}
          display="flex"
          justifyContent="center"
          alignItems="center">
          <TextField
          required
          value={cveInput}
          onKeyDown={keyPress}
          onChange={handleChangeCVE}
          style={{
            width: '500px'
          }}
          id="cve"
          placeholder="Search Vulnerabilities"
          label="Search Vulnerabilities"
        />
        </Box>
      </Container>
      
    </div >
  );
}

Hero.propTypes = {
  className: PropTypes.string
};

export default withRouter(Hero);
