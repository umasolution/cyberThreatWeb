import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Button,
  Divider,
  Toolbar,
  Hidden,
  Typography,
  Link,
  makeStyles,
  Drawer,
  IconButton,
  List,
  ListItem,
  Container
} from '@material-ui/core';
import Logo from 'src/components/Logo';
import ScrollTo from "react-scroll-into-view";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 55,
    paddingBottom: 55
  },
  browseButton: {
    marginLeft: theme.spacing(2)
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  link: {
    fontWeight: theme.fontfamily.medium,
    fontSize:'16px',
    color:'#000000',
    letterSpacing:'0.8px',
    '& + &': {
      marginLeft: theme.spacing(2)
    },
    [theme.breakpoints.down('xs')]: {
      fontSize:'14px',
      letterSpacing:'0',
    },
  },
  footerMenuList :{
    marginBottom: theme.spacing(2),
    '& > ul' :{
      padding:0,
      textAlign:'center',
      '& > li' :{
        display:'inline-block',
        width:'auto',
        [theme.breakpoints.down('xs')]: {
          padding:'8px 8px',
        },   
      },
    }
  }

}));

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      /* backgroundColor: theme.palette.primary.main, */
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        /* color: theme.palette.common.white, */
      },
    },
  },
}))(MenuItem);

function TopMenu({ className, ...rest }) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [menuState, setMenuState] = useState({ anchorEl: null, open: false, });
  const anchorRef = React.useRef(null);

  const handleClick = event => {
    // setMenuState({ open: true, anchorEl: event.currentTarget });
    if (menuState.anchorEl !== event.currentTarget) {
      setMenuState({ open: true, anchorEl: event.currentTarget });
    }
  };


  const handleClose = (event) => {
    setMenuState(prevState => {
      return { ...prevState, open: false, anchorEl: null }
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <div className={classes.footerMenuList}>
       <List className={classes.list}>
                  <ListItem className={classes.listItem}>
                    <Link
              className={classes.link}
              color="textSecondary"
              component={RouterLink}
              to="/vulDB"
              underline="none"
              variant="body2"
            >
              Vulnerabilities DB
            </Link>
                  </ListItem>
              <ListItem className={classes.listItem}>
                    <Link
              aria-controls="customized-menu"
              aria-haspopup="true"
              onClick={handleClick}
              onMouseOver={handleClick}
              style={{ marginRight: '10px' }}
              className={classes.link}
              color="textSecondary"
              underline="none"
              variant="body2"
            >
              Products
          </Link>
              </ListItem>
              <ListItem className={classes.listItem}>
              <Link className={classes.link}
                color="textSecondary"
                component={RouterLink}
                to="/about-us"
                underline="none"
                variant="body2"
              >
                About Us
              </Link>
      </ListItem>
              <ListItem className={classes.listItem}>
              <Link
                className={classes.link}
                color="textSecondary"
                component={RouterLink}
                to="/app"
                underline="none"
                variant="body2"
              >
                Sign In
              </Link>
              </ListItem>
              <ListItem className={classes.listItem}>
              <Link
                className={classes.link}
                color="textSecondary"
                underline="none"
                to="/book-a-demo"
                variant="body2"
                style={{ cursor: 'pointer' }}
              >
                Book a demo
              </Link>
              </ListItem>
            </List>
    </div>
  );
}

TopMenu.propTypes = {
  className: PropTypes.string
};

export default TopMenu;
