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
  makeStyles

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

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    height: 64
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  link: {
    fontWeight: theme.typography.fontWeightMedium,
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  typography: {
    fontFamily: [
      '"Montserrat"',
      'sans-serif',
    ].join(','),
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

function TopBar({ className, ...rest }) {
  const classes = useStyles();

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


  return (
    <AppBar
      className={clsx(classes.root, className)}
      color="default"
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        <RouterLink to="/">
          <Logo className={classes.logo} />
        </RouterLink>
        <Hidden mdDown>
          <Typography
            variant="caption"
            color="textSecondary"
          >
            Cyber Threat Info
          </Typography>
        </Hidden>
        <Box flexGrow={1} />
        <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/vulDB/application"
          underline="none"
          variant="body2"
        >
          Vulnerabilities DB
        </Link>
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
        <StyledMenu
          id="customized-menu"
          anchorEl={menuState.anchorEl}
          keepMounted
          open={Boolean(menuState.anchorEl)}
          onClose={handleClose}
          MenuListProps={{ onMouseLeave: handleClose }}
        >
          <StyledMenuItem>
            <ListItemText

              primary="Open Source Vulnerability Scanner"
              secondary="Enabling developers to easily find and automatically fix open source vulnerabilities"
            />
          </StyledMenuItem>
        </StyledMenu>
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
        <Link
          className={classes.link}
          color="textSecondary"
          component={RouterLink}
          to="/docs"
          underline="none"
          variant="body2"
        >
          Support
        </Link>
        <Divider className={classes.divider} />
        <ScrollTo smooth selector="#PricingView">
          <Link
            className={classes.link}
            color="textSecondary"
            underline="none"
            variant="body2"
            style={{ cursor: 'pointer' }}
          >
            Pricing
        </Link>
        </ScrollTo>
        {/* <Button
          color="secondary"
          component="a"
          href="https://material-ui.com/store/items/devias-kit-pro"
          variant="contained"
          size="small"
        >
          Get the kit
        </Button> */}
      </Toolbar>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
