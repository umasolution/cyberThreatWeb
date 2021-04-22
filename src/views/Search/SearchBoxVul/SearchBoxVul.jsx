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
    margin: '38px auto',
    maxWidth: '100%',
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
    maxWidth:1015,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    boxShadow:'4px 0px 27px rgba(0,0,0,0.08)',
    height:62,
    borderRadius:50,
    border:'1px solid #e8e8f2',
    padding:8,
    color:'#000',
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


const SearchBoxVul = ({ className, ...rest }) => {
  const classes = useStyles();

  const { history } = { ...rest };
  const [searchByCVE, setSearchByCVE] = useState(true);
  const [cveInput, setCVEInput] = useState("");
  const [cveSearchStartDate, setCVESearchStartDate] = useState(new Date());
  const [cveSearchEndDate, setCVESearchEndDate] = useState(new Date());


  const apiparams = new URLSearchParams();

  const [apiurl, setApiUrl] = useState(apiparams);

  const handleChangeCVE = (event) => {
    setCVEInput(event.target.value);
  }
  const changeSearchByCVE = (event) => {
    
    setSearchByCVE(event.target.checked);
  };

  /*const regex1 = '/(?P<key>[^:\s]+):(?P<value>.*?)\s*(?=[^:\s]+:|$)/g';

  const regexp = '/^product:(.*)$/m';*/

  /*var re = /\s*([^[:]+):\"([^"]+)"/g;*/

  const onSearchClicked = () => {
    if (cveInput) {
      const regex5 = /([^:\s]+):([^:\s]+)/g;
      const regex = new RegExp(regex5,'i');
      const split_cveInput = cveInput.split("OR");
      split_cveInput.forEach(function (value, index, array) {
          let m = regex.exec(value);    
          console.log(m);  
          var regexcve = /cve-/;
          var regexcve2 = /CVE-/;
          if(m){
            if(m[1]=='language'){
              console.log("ddd");  
              /*apiurl.append('language', m[2]);          */
              apiurl.set('language', m[2]);
            } else if(m[1]=='advisory') {
              apiurl.append('advisory', m[2]);         
            } else if(m[1]=='platform') {
              apiurl.append('platform', m[2]);         
            } else if(m[1]=='plugin') {
              apiurl.append('plugin', m[2]);        
            } 
          }
      })
      console.log(apiurl.toString());
      return false;


      /*let m = regex.exec(cveInput);      
      var regexcve = /cve-/;
      var regexcve2 = /CVE-/;
      if(m){
        if(m[1]=='language'){
          history.push(`/app/vulDB/?language=${m[2]}`);          
        } else if(m[1]=='advisory') {
          history.push(`/app/vulDB/?advisory=${m[2]}`);         
        } else if(m[1]=='platform') {
          history.push(`/app/vulDB/?platform=${m[2]}`);         
        } else if(m[1]=='plugin') {
          history.push(`/app/vulDB/?plugin=${m[2]}`);         
        } else if(m[1]=='product') {
          history.push(`/search/CVE/?product=${m[2]}`);         
        } else if(m[1]=='vendor') {
          history.push(`/search/CVE/?vendor=${m[2]}`);         
        }  else {
          var result = regexcve.test(cveInput);
          var result2 = regexcve2.test(cveInput);
          if(result){
             history.push(`/CVE/${cveInput}`); 
          } else if(result2){
            history.push(`/CVE/${cveInput}`);  
          } else {
             history.push(`/search/CVE/?keyword=${cveInput}`);
          }
        }
      } else {
        var result = regexcve.test(cveInput);
        var result2 = regexcve2.test(cveInput);
        if(result){
           history.push(`/CVE/${cveInput}`); 
        } else if(result2){
           history.push(`/CVE/${cveInput}`);  
        } else {
           history.push(`/search/CVE/?keyword=${cveInput}`);
        }
      }*/

    } else {
      console.log(`/CVE/'${moment(cveSearchStartDate).format("YYYY-MM-DD")}/${moment(cveSearchEndDate).format("YYYY-MM-DD")}`);
      history.push(`/CVE/${moment(cveSearchStartDate).format("YYYY-MM-DD")}/${moment(cveSearchEndDate).format("YYYY-MM-DD")}`);
    }
    /*window.location.reload();*/
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
              width: '100%',
              color:'#000'
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

export default withRouter(SearchBoxVul);
