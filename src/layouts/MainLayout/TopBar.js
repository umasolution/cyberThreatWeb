import React, { useState } from 'react';
import { Link as RouterLink ,useHistory } from 'react-router-dom';
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
import TopMenu from './TopMenu';
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
    backgroundColor: theme.palette.background.default,
    boxShadow:'0px 0px 50px rgba(0,0,0,0.06)',
  },
  header: {
    '& > MuiContainer-root': {
      maxWidth:1140 
    }
  },
  paper: {
    marginRight: theme.spacing(2),
  },
  toolbar: {
    height: 85
  },
  logo: {
    marginRight: theme.spacing(2)
  },
  logoBox : {

  },
  link: {
    fontWeight: theme.fontfamily.regular,
    fontSize:'14px',
    color:'#000000',
    letterSpacing:'0.8px',
    '& + &': {
      marginLeft: theme.spacing(4)
    }
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  typography: {
    fontFamily: '"Montserrat",sans-serif !important',
  },
  priceBTN : {
    fontWeight: theme.fontfamily.semiBold
  },
  appResponsive:{
    '& > div' :{
      marginBottom: theme.spacing(2),
      '& > ul' :{
        padding:'15px 10px',
        '& > li' :{
          display:'flex',
          width:'auto',   
        },
      }
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

function TopBar({ className, ...rest }) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [menuState, setMenuState] = useState({ anchorEl: null, open: false, });
  const anchorRef = React.useRef(null);
  const history = useHistory();

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

  const handleBookDemo = () => {
    history.push('/book-a-demo');
  };

  const handlePricingClick = () => {
   history.push('/pricing');
  };
  


  return (
    <AppBar
      className={clsx(classes.root, className)}
      color="default"
      {...rest}
    >
      <Container maxWidth="lg">
      <Toolbar id="top-header" className={classes.toolbar}>
        <div className={classes.logoBox}>
        <RouterLink to="/">
          <Logo className={classes.logo} />
        </RouterLink>
        </div>
        <Box flexGrow={2} />
        <Hidden smDown>       
        <Link
        className={classes.link}
        color="textSecondary"
        component={RouterLink}
        to="/sbom"
        underline="none"
        variant="body2"
      >
        SBOM
      </Link>   
      <Link className={classes.link}
        color="textSecondary"
        component={RouterLink}
        to="/vulDB"
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
      <Link    
        onClick = {handlePricingClick}
        style={{ marginRight: '10px' }}
        className={classes.link}
        color="textSecondary"
        underline="none"
        variant="body2"
      >
        Pricing
      </Link>
      <Link className={classes.link}
        color="textSecondary"
        component={RouterLink}
        to="/about-us"
        underline="none"
        variant="body2"
      >
        About Us
      </Link>
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
      <ScrollTo smooth selector="#PricingView">
        <Button style={{
            borderRadius: 35,
            marginLeft : 25,
            backgroundColor: "#ff0476",
            padding: "5px 30px",
            height:'37px',
            boxShadow:'none',
            fontSize:'14px',
            fontWeight:'600',
            letterSpacing:'1px',
        }} onClick={handleBookDemo} className={classes.priceBTN} variant="contained" color="secondary">
          Book a demoss
        </Button>
      </ScrollTo>  
        </Hidden>
        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
           <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
           <TopMenu />
          </div>
        </Drawer>
      </Hidden>
      </Container>
    </AppBar>
  );
}

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
