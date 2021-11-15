import React, { useState } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Collapse } from '@material-ui/core'
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Users as UsersIcon } from 'react-feather';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TopBar from '../TopBar';
import TopBarContents from './TopBarContents';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import AssignmentIcon from '@material-ui/icons/Assignment';
import NfcIcon from '@material-ui/icons/Nfc';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import { ReactComponent as AlertIcon } from '../icons/alert.svg';
import { ReactComponent as DashboardIcon } from '../icons/dashboard.svg';
import { ReactComponent as ScanIcon } from '../icons/scan.svg';
import { ReactComponent as VulnerabilityIcon } from '../icons/vulnerability.svg';
import { SvgIcon } from '@material-ui/core';
import DashboardSVG from '../icons/dashboardSVG';
import Icon from '@material-ui/core/Icon';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedSideBarItem } from 'src/actions/sideBarActions';




const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    //zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    backgroundColor: theme.palette.background.main
  },
  drawerOpen: {
    backgroundColor: theme.palette.background.main,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor: theme.palette.background.main,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  icon: {
    color: "#fff",
    margin: '10px',
    [theme.breakpoints.down('sm')]: {
      margin: '3px',
    },

  },
  navText: {
    color: '#fff',
    fontSize: '16px',
    marginLeft: '4px',
    marginTop: '10px',
    textDecoration: 'none'
  },
  linkText: {
    textDecoration: 'none'
  },
  nested: {
    paddingLeft: theme.spacing(9),
  },
  dashboardIcon: {
    color: '#fff'
  },
  dashboardText: {
    color: '#fff',
    fontSize: '14px',
    marginLeft: '4px',
  },
  svgIcon: {
    stroke: 'black',
    fill: 'white'
  }
}));

export default function MinivariantNavBar() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);

  const handleDrawer = () => {
    setOpen(!open);
  };


  const handleDashboardClick = () => {
    setDashboardOpen(!dashboardOpen);
  };

  const onLinkTo = (selItem) => {
    dispatch(setSelectedSideBarItem(selItem))
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ backgroundColor: 'white' }}>

          <IconButton
            color="black"
            aria-label="open drawer"

            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            < DoubleArrowIcon />
          </IconButton>

          <TopBarContents />


        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton style={{ color: "white" }} onClick={handleDrawer}>
            {open ? <ChevronLeftIcon /> : < DoubleArrowIcon style={{ margin: "auto" }} />}
          </IconButton>
        </div>
        <Divider />
        <List>

          <ListItem button onClick={handleDashboardClick}>
            <ListItemIcon className={classes.icon}>
              <Icon><img src="/static/dashboard.png" /></Icon>
              {/* <SvgIcon component={DashboardIcon} viewBox="0 0 600 476.6" fontSize="large" className={classes.svgIcon} /> */}
            </ListItemIcon>

            <ListItemText> <Typography variant="h4" gutterBottom className={classes.navText}>Dashboard</Typography></ListItemText>
            {dashboardOpen ? <ExpandLess className={classes.dashboardIcon} /> : <ExpandMore className={classes.dashboardIcon} />}
          </ListItem>
          <Collapse in={dashboardOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link to='/app/reports/dashboard' className={classes.linkText} >
                <ListItem button onClick = {()=>onLinkTo('dependencies')}>
                  <ListItemIcon className={classes.icon} style={{ marginLeft: "13px" }}> <AssignmentIcon fontSize="small" /> </ListItemIcon>
                  <ListItemText ><Typography variant="h6" gutterBottom className={classes.dashboardText}>Dependencies</Typography></ListItemText>
                </ListItem>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link to='/app/reports/dashboard?type=application' className={classes.linkText}>
                <ListItem button onClick = {()=>onLinkTo('application')}>

                  <ListItemIcon className={classes.icon} style={{ marginLeft: "13px" }}> <NfcIcon fontSize="small" /> </ListItemIcon>
                  <ListItemText ><Typography variant="h6" gutterBottom className={classes.dashboardText}>Application</Typography></ListItemText>

                </ListItem>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link to='/app/reports/dashboard?type=system' className={classes.linkText}>
                <ListItem button onClick = {()=>onLinkTo('system')}>
                  <ListItemIcon className={classes.icon} style={{ marginLeft: "13px" }}> < WebAssetIcon fontSize="small" /> </ListItemIcon>
                  <ListItemText ><Typography variant="h6" gutterBottom className={classes.dashboardText}>System</Typography></ListItemText>

                </ListItem>
              </Link>
            </List>
          </Collapse>
          {/*} <Link to='/app/reports/dashboard' className={classes.linkText}>
            <ListItem button >
                <ListItemIcon className={classes.icon}><HomeIcon/></ListItemIcon>
                <ListItemText>
                    <Typography variant="h4" gutterBottom  className={classes.navText}>Dashboard</Typography>
                </ListItemText>
            </ListItem>
      </Link> */}
          <Link to='/app/vulDB' className={classes.linkText}>
            <ListItem button >
              {/*<ListItemIcon className={classes.icon}><SvgIcon component={VulnerabilityIcon} viewBox="0 0 600 476.6" fontSize="large" className={classes.svgIcon} /></ListItemIcon>
   */}
              <ListItemIcon className={classes.icon}><Icon><img src="/static/vulnerability.png" /></Icon></ListItemIcon>
              <ListItemText>
                <Typography variant="h4" gutterBottom className={classes.navText}>Vulnerabilities DB</Typography>
              </ListItemText>
            </ListItem>
          </Link>
          <Link to='/app/management/ProjectsReports/language' className={classes.linkText}>
            <ListItem button >
              {/* <ListItemIcon className={classes.icon}><SvgIcon component={ScanIcon} viewBox="0 0 600 476.6" fontSize="large" className={classes.svgIcon}/></ListItemIcon>
               */}
              <ListItemIcon className={classes.icon}><Icon><img src="/static/myscans.png" /></Icon></ListItemIcon>
              <ListItemText>
                <Typography variant="h4" gutterBottom className={classes.navText}>My Scans</Typography>
              </ListItemText>
            </ListItem>
          </Link>
          <Link to='/app/management/Alerts' className={classes.linkText}>
            <ListItem button >
              {/*<ListItemIcon className={classes.icon}><SvgIcon component={AlertIcon} viewBox="0 0 600 476.6" fontSize="large" className={classes.svgIcon}/></ListItemIcon>
               */}
              <ListItemIcon className={classes.icon}><Icon><img src="/static/alert.png" /></Icon></ListItemIcon>
              <ListItemText>
                <Typography variant="h4" gutterBottom className={classes.navText}>Alerts</Typography>
              </ListItemText>
            </ListItem>
          </Link>
          <Link to='/app/dashboard/pricing' className={classes.linkText}>
            <ListItem button >
              {/*<ListItemIcon className={classes.icon}><SvgIcon component={AlertIcon} viewBox="0 0 600 476.6" fontSize="large" className={classes.svgIcon}/></ListItemIcon>
               */}
              <ListItemIcon className={classes.icon}><Icon><img src="/static/alert.png" /></Icon></ListItemIcon>
              <ListItemText>
                <Typography variant="h4" gutterBottom className={classes.navText}>Pricing</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        </List>
        

        {/*} <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          </List>*/}
      </Drawer>

    </div>
  );
}