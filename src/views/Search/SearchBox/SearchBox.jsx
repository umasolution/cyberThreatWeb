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
import Icon from '@material-ui/core/Icon';



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.light,
    paddingTop: 5,
    paddingBottom: 140,
    [theme.breakpoints.down('xs')]: {
      padding:30,
    },
    [theme.breakpoints.down('sm')]: {
      paddingBottom:30,
    },
    [theme.breakpoints.down('md')]: {
      paddingLeft:45,
    },
    boxShadow:'0px 0px 50px rgba(0,0,0,0.06)',
    marginBottom:100,
    position:'relative',
  },
  image: {
    //perspectiveOrigin: 'left center',
    //transformStyle: 'preserve-3d',
    //perspective: 1500,
    textAlign:'right',
    '& > img': {
      maxWidth: '100%',
      height: 'auto',
      //transform: 'rotateY(-35deg) rotateX(15deg)',
      backfaceVisibility: 'hidden',
      //boxShadow: theme.shadows[16]
    }
  },
  shape: {
    position: 'absolute',
    top: 0,
    left: 0,
    '& > img': {
      maxWidth: '100%',
      height: 'auto'
    }
  },
  container: {
    marginTop: '10px'
  },
  mainContent: {
    padding: '0'
  },
  mainContentH3: {
    // fontFamily: 'PrentonRPProLight,sans-serif',
    fontFamily: '"Montserrat",sans-serif !important',
    fontWeight: theme.fontfamily.bold,
    fontSize: '26px',
    marginBottom: '25px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px',
      marginBottom: '15px'
    },
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
    marginTop:'20px', 
  },
  mainBannerBtn : {
    marginTop:'30px',
    '& > Button': {
      backgroundColor:'#027de7',
      border:'none',
      padding:'15px 30px',
      lineHeight:'16px',
      borderRadius: '25px',
      boxShadow: 'none',
    },
    '& > mainContent': {
      padding:'0',
    },
    [theme.breakpoints.down('sm')]: {
      marginTop:0,
      marginBottom:30,
    },
  },
  mainContentH5: {
     fontWeight: theme.fontfamily.regular,
     fontFamily: '"Montserrat",sans-serif',
     fontSize: '16px',
     color: '#484848',
     marginBottom:'15px',
  },
  bannerBox:{
    '& > bannerContainer': {
      padding:'0',
    }
  },
  searchbarArea: {
    width: '100%',
    bottom: -70,
    [theme.breakpoints.down('sm')]: {
      bottom: -90,
    },
    left:0,
  },
  searchbar: {
    backgroundColor: theme.palette.background.light,
    maxWidth:1180,
    background: '#fff url(/static/bg_searchbar.png)',
    padding:'35px 0px',
    boxShadow:'4px 0px 54px rgba(0,0,0,0.1)',
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
      padding:'15px 10px',
    },
  },
  searchBox: {
    marginTop: 0,
    maxWidth:815,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    boxShadow:'4px 0px 27px rgba(0,0,0,0.08)',
    height:62,
    borderRadius:50,
    border:'1px solid #e8e8f2',
    padding:8,
    position: 'relative',
    '& > div' : {
      paddingLeft: 60,
    }
  },
  searchIcon: {
    position:'absolute',
    left:'30px',
    color:'#747474',
    fontSize:'25px',
  },
  searchButton: {
    backgroundColor:'#ff0476',
    padding:'0 !important',
    textAlign: 'center',
    width: 176,
    height: 45,
    lineHeight: '45px',
    color: '#fff',
    borderRadius: 50,
    fontWeight: theme.fontfamily.bold,
    fontFamily: '"Montserrat",sans-serif',
    letterSpacing: '1px',
    border:0,
    fontSize:'16px',
  }

}));


const SearchBox = ({ className, ...rest }) => {
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
    if (cveInput) {
      history.push(`/CVE/${cveInput}`);
      console.log(`/CVE/'${cveInput}`);
      
    } else {
      console.log(`/CVE/'${moment(cveSearchStartDate).format("YYYY-MM-DD")}/${moment(cveSearchEndDate).format("YYYY-MM-DD")}`);
      history.push(`/CVE/${moment(cveSearchStartDate).format("YYYY-MM-DD")}/${moment(cveSearchEndDate).format("YYYY-MM-DD")}`);
      /*history.push(`/CVE/${cveSearchStartDate}/${cveSearchEndDate}`);*/
    }
  }

  const keyPress = (event) => {
    if (event.keyCode === 13) {
      onSearchClicked();
    }
  }
  const handleClick = (event) => {
      onSearchClicked();
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
      <div className={classes.searchbarArea}> 
        <Container maxWidth="lg" className={classes.searchbar}>    
          <Box mt={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.searchBox}>
            <TextField
            required
            value={cveInput}
            onKeyDown={keyPress}
            onChange={handleChangeCVE}
            style={{
              width: '100%'
            }}
            id="cve"
            placeholder="Search Vulnerabilities"
          />
          <Icon className={classes.searchIcon}>search</Icon>
          <button onClick={handleClick} className={classes.searchButton}>Search</button>
          </Box>
        </Container>
      </div>
  );
}

export default SearchBox;
