import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import Axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import {
  Avatar,
  Box,
  ButtonBase,
  Hidden,
  Menu,
  MenuItem,
  Typography,
  makeStyles
} from '@material-ui/core';
import { IS_ADMIN, logout, setIsAdmin, updateProfileDetails } from 'src/actions/accountActions';
import { closeBetweenPages, enablePopup, setOpenPopup } from 'src/actions/popupAction';

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 32,
    width: 32,
    marginRight: theme.spacing(1)
  },
  popover: {
    width: 200
  }
}));

function Account() {
  const classes = useStyles();
  const history = useHistory();
  const ref = useRef(null);
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const { enqueueSnackbar } = useSnackbar();
  const [isOpen, setOpen] = useState(false);
  const [avatar, setAvatar] = useState();

  const [profileResponse, setProfileResponse] = useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    getProfile();
  }, []);


  const handleClose = () => {
    setOpen(false);
  };

  const getProfile = async () => {

    var aValue = localStorage.getItem("loginuserid");
    var aValues = sessionStorage.getItem("loginuserid");
    var linki = 'http://cyberthreatinfo.ca/api/image/'
    if(aValue!='undefined'){
        var linkmain = linki+aValue+'.png?'+Math.random(); 
        setAvatar(linkmain);
    } 
    if(aValues!='undefined'){
        var linkmain2 = linki+aValues+'.png?'+Math.random();
        setAvatar(linkmain2);
    }

    try {      
      const url = `/getProfile`;        
      let response = await Axios.get(url); 
      setProfileResponse(response.data.general);
      dispatch(updateProfileDetails(response.data.general))
      dispatch(setIsAdmin(response.data.general.admin));
     
    } catch (error) {
      console.error(error);
      
    }
  };

  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
    }

  const handleLogout = async () => {
    try {
      handleClose();
      await dispatch(logout());
      history.push('/');
    } catch (error) {
      enqueueSnackbar('Unable to logout', {
        variant: 'error'
      });
    }
  };

  const enableDialogBox = () => {
    dispatch(closeBetweenPages(false))
    dispatch(setOpenPopup(true))
  }
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        component={ButtonBase}
        onClick={handleOpen}
        ref={ref}
      >
        <Avatar
          alt="User"
          className={classes.avatar}
          src={avatar}
        />
        <Hidden smDown>
          <Typography
            variant="h6"
          >
            {profileResponse ? `${capitalize(profileResponse.firstname)} ${capitalize(profileResponse.lastname)}` :`${account.user}`}
           
          </Typography>
        </Hidden>
      </Box>
      <Menu
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center'
        }}
        keepMounted
        PaperProps={{ className: classes.popover }}
        getContentAnchorEl={null}
        anchorEl={ref.current}
        open={isOpen}
      >
        
        <MenuItem
          component={RouterLink}
          to="/app/account"
        >
          Account
        </MenuItem>
        <MenuItem onClick={enableDialogBox}>
          Preference
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default Account;
