import React,{useState,useEffect} from 'react';
import {useHistory} from 'react-router';
import { Link } from 'react-router-dom';
import {Box,Grid,Hidden} from '@material-ui/core';
import Logo from "src/components/Logo";
import CVETextField from '../../../views/CVE/CVEInput/CVETextField';
import { makeStyles} from '@material-ui/core/styles';
import Axios from 'axios';

import './TopBarContents.css';
import Notifications from '../TopBar/Notifications';
import Account from '../TopBar/Account';


const useStyles = makeStyles ((theme) => ({
    root: {
        alignItems:'center',
        minHeight: 64
    },
    cve:{
        marginLeft:'100px'
    }

}));

const TopBarContents =() => {

    const history = useHistory();
    const classes= useStyles();

    const [searchByCVE, setSearchByCVE] = useState(true);
    const [cveInput, setCVEInput] = useState("");
    const [alertsResponse, setAlertsResponse] = useState(null);
    const [isLoadingData, setloadingData] = useState(true);

    useEffect(() => {
      getAlerts();
    }, []);
  
    const getAlerts = async () => {
      try {
        updateLoadingData(true);
        const url = `/corner/getalert`;
        const response = await Axios.get(url);
        
        if (!response.data) {
          updateLoadingData(false);
          return;
        }      
        setAlertsResponse(response.data);
        updateLoadingData(false);
      } catch (error) {
        console.error(error);
        updateLoadingData(false);
      }
    };

    
  const updateLoadingData = (value) => {
    setloadingData(value);
  };

  

    const keyPress = (event) => {
        if (event.keyCode === 13) {
          onSearchClicked();
        }
      };
    
      const onSearchClicked = () => {
        if (searchByCVE) {
          history.push(`/app/CVE/${cveInput}`);
        }
      };
    
      const handleChangeCVE = (event) => {
        setCVEInput(event.target.value);
      };
    
    return (
        < Grid container className={classes.root}>
        <Link to="/"  >
            <Logo  />
        </Link>
        <Hidden mdDown>
        <Box className="dashboardsearch">
          <CVETextField
            cveInput={cveInput}
            keyPress={keyPress}
            handleChangeCVE={handleChangeCVE}
          />
         
          </Box>
          </Hidden>
          <Box ml={2} flexGrow={1} />
          <Notifications alertsResponse={alertsResponse}/>
          <Box ml={2}>
         <Account />
          </Box>
     
      </Grid >

    );
};

export default TopBarContents;