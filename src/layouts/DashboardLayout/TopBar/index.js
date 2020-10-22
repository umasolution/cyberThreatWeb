import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import PropTypes from "prop-types";
import clsx from "clsx";
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  SvgIcon,
  TextField,
  LinearProgress,
} from "@material-ui/core";
import { Menu as MenuIcon } from "react-feather";
import Logo from "src/components/Logo";
import { THEMES } from "src/constants";
import { useHistory } from "react-router";
import Account from "./Account";
import Contacts from "./Contacts";
import Notifications from "./Notifications";
import Search from "./Search";
import Settings from "./Settings";
import "./index.css";
import CVETextField from "./../../../views/CVE/CVEInput/CVETextField";
import Axios from 'axios';
import authService from './../../../services/authService';


const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer + 100,
    ...(theme.name === THEMES.LIGHT
      ? {
          boxShadow: "none",
          backgroundColor: theme.palette.primary.main,
        }
      : {}),
    ...(theme.name === THEMES.NEWLIGHT
      ? {
          boxShadow: "none",
          backgroundColor: theme.palette.background.default,
        }
      : {}),
    ...(theme.name === THEMES.ONE_DARK
      ? {
          backgroundColor: theme.palette.background.default,
        }
      : {}),
  },
  toolbar: {
    minHeight: 64,
  },
}));

function TopBar({ className, onMobileNavOpen, ...rest }) {
  const classes = useStyles();
  const history = useHistory();

  const [searchByCVE, setSearchByCVE] = useState(true);
  const [cveInput, setCVEInput] = useState("");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const [isLoadingData, setloadingData] = useState(true);
  const [alertsResponse, setAlertsResponse] = useState(null);

  useEffect(() => {
    getAlerts();
  }, []);

  const getAlerts = async () => {
    try {
      updateLoadingData(true);
      const url = `/corner/getalert`;
      const response = await Axios.post(url, {
        emailAdd: authService.getUserName(),
      });
      if (!response.data || !response.data.header) {
        updateLoadingData(false);
        return;
      }
      console.log(response.data);
      setAlertsResponse(response.data.header);
      /* const res =  [
        {
           "CVEID":"CVE-2020-12345",
           "Updated On":"2020-08-07 15:36:43"
        },
        {
           "CVEID":"CVE-2020-12345",
           "Updated On":"2020-08-07 15:36:43"
        }  
     ];
      setAlertsResponse(res); */
      updateLoadingData(false);
    } catch (error) {
      console.error(error);
      updateLoadingData(false);
    }
  };

  const updateLoadingData = (value) => {
    setloadingData(value);
  };

  const getLoader = () => {
    if (isLoadingData) {
      return <LinearProgress style={{ margin: "15px", width: "100%" }} />;
    }
    return null;
  };

  const updateSnackbar = (open, message) => {
    setSnackbar({
      open,
      message,
    });
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
    <AppBar className={clsx(classes.root, className)} {...rest}>
      <Toolbar className={classes.toolbar}>
        <Hidden lgUp>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <SvgIcon fontSize="small">
              <MenuIcon />
            </SvgIcon>
          </IconButton>
        </Hidden>
        <Hidden mdDown>
          <RouterLink to="/">
            <Logo />
          </RouterLink>
          <CVETextField
            cveInput={cveInput}
            keyPress={keyPress}
            handleChangeCVE={handleChangeCVE}
          />
        </Hidden>
        <Box ml={2} flexGrow={1} />
        {/* <Search /> */}
        {/* <Contacts /> */}
        <Notifications alertsResponse={alertsResponse}/>
        <Settings />
        <Box ml={2}>
          <Account />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
