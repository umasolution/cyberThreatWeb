import React from 'react';
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
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import { Home as HomeIcon, Users as UsersIcon} from 'react-feather';
import NotificationsIcon from '@material-ui/icons/Notifications';
import TopBar from '../TopBar';
import TopBarContents from './TopBarContents';


const drawerWidth = 256;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
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
    backgroundColor:theme.palette.background.main
  },
  drawerOpen: {
    backgroundColor:theme.palette.background.main,
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    backgroundColor:theme.palette.background.main,
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
  icon:{
      color:'#fff',
      margin:'10px',
      [theme.breakpoints.down('md')]: {
        margin:'3px',
      }
  },
  navText:{
      color:'#fff',
      fontSize:'16px',
      marginLeft:'4px',
      marginTop:'10px',
      textDecoration:'none'
  },
  linkText:{
      textDecoration:'none'
  }
}));

export default function MinivariantNavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{backgroundColor:'white'}}>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
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
        <div className={classes.toolbar} style={{backgroundColor:'white'}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <Link to='/app/reports/dashboard' className={classes.linkText}>
            <ListItem button >
                <ListItemIcon className={classes.icon}><HomeIcon/></ListItemIcon>
                <ListItemText>
                    <Typography variant="h4" gutterBottom  className={classes.navText}>Dashboard</Typography>
                </ListItemText>
            </ListItem>
            </Link>
            <Link to='/app/vulDB' className={classes.linkText}>
            <ListItem button >
                <ListItemIcon className={classes.icon}><UsersIcon/></ListItemIcon>
                <ListItemText>
                    <Typography variant="h4" gutterBottom  className={classes.navText}>Vulnerabilities DB</Typography>
                </ListItemText>
            </ListItem>
            </Link>
            <Link to='/app/management/ProjectsReports/language' className={classes.linkText}>
            <ListItem button >
                <ListItemIcon className={classes.icon}><UsersIcon/></ListItemIcon>
                <ListItemText>
                    <Typography variant="h4" gutterBottom  className={classes.navText}>My Scans</Typography>
                </ListItemText>
            </ListItem>
            </Link>
            <Link to='/app/management/Alerts' className={classes.linkText}>
            <ListItem button >
                <ListItemIcon className={classes.icon}><NotificationsIcon/></ListItemIcon>
                <ListItemText>
                    <Typography variant="h4" gutterBottom  className={classes.navText}>Alerts</Typography>
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