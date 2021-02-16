import React, { useState, useEffect } from 'react';
import {
  LinearProgress, Container, Grid, ExpansionPanel, List, ListItemText,
  ExpansionPanelSummary, ListItem, ListItemIcon, ExpansionPanelDetails, Box, Tooltip
} from '@material-ui/core';
import MySnackbar from "../../../Shared/Snackbar/MySnackbar";
import Axios from 'axios';
import authService from 'src/services/authService';
import './Alerts.css';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import { cloneDeep } from 'lodash';
import Copy from './../../../Util/Copy';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import isEmpty from './../../../Util/Util';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import MarkunreadOutlinedIcon from '@material-ui/icons/MarkunreadOutlined';
import DraftsIcon from '@material-ui/icons/Drafts';
import moment from 'moment';
import DeleteIcon from '@material-ui/icons/Delete';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import SendIcon from '@material-ui/icons/Send';
import MoreVertIcon from '@material-ui/icons/MoreVert';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
    display: 'block',
    height: 224,
  },
  cardroot: {
    minWidth: 345,    
  },
  subcardroot:{
    margin: '0px auto',
    padding:0
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '100%'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const Alerts = () => {

  useEffect(() => {
    getAlerts();
  }, []);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ""
  });
  const classes = useStyles();
  const [isLoadingData, setloadingData] = useState(true);
  const [alertsResponse, setAlertsResponse] = useState("");

  const [expandedId, setExpandedId] = React.useState(-1);
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = async (i,alert) => {
    setExpandedId(expandedId === i ? -1 : i);
     if (alert.status === 'unread') {
        /*setAlert(alert, false)*/
        try {
         const url = `/status/delalert`;
         await Axios.post(url,
           {
             "alert_type": alert.alert_type,
             "alert_name": alert.alert_name,
             "alert_mode" : alert.alert_mode
           });
 
       } catch (error) {
         console.error(error);
       }

    }
  };

  const handleExpandClickSingle = () => {
    setExpanded(!expanded);
  };
  

  const getAlerts = async () => {
    try {
      
      const url = `/alerts/lists`;
      const response = await Axios.get(url);
      if (!response.data) {
        updateLoadingData(false);
        return;
      }
      console.log(response.data);
      setAlertsResponse(response.data);
      updateLoadingData(false);
    } catch (error) {
      console.error(error);
      updateLoadingData(false);
    }
  }


  const updateLoadingData = (value) => {
    setloadingData(value);
  }

  const getLoader = () => {
    if (isLoadingData) {
      return <LinearProgress style={{ margin: '15px', width: '100%' }} />
    }
    return null;
  }

  const updateSnackbar = (open, message) => {
    setSnackbar({
      open,
      message
    })
  }

  const setAlert = async (alert, deleteAlert) => {
    
    try {
      setloadingData(true);
      let url = `/status/setalert`;
      if (!deleteAlert) {
        url = `/status/delalert`;        
      }
      const response = await Axios.post(url,
        {
          "alert_type": alert.alert_type,
          "alert_name": alert.alert_name,
          "alert_mode" : alert.alert_mode
        });
      let alerts = Copy(alertsResponse);
      if (deleteAlert) {
        const index = alerts.findIndex(a => a.alert_name === alert.alert_name);        
        alerts[index].status = 'unread';
      } else {
        const index = alerts.findIndex(a => a.alert_name === alert.alert_name);
        alerts[index].status = 'read';
      }
      setAlertsResponse(alerts);
      updateSnackbar(true, response.data.message);
      setloadingData(false);
    } catch (error) {
      console.error(error);
      updateSnackbar(true, 'Error while setting Alert');
      setloadingData(false);
    }
  }
  const deleteAlert = async (alert, deleteAlert) => {
    try {
      setloadingData(true);
      let url = `/delalert`;      
      const response = await Axios.post(url,
        {
          "alert_type": alert.alert_type,
          "alert_name": alert.alert_name,
          "alert_mode" : alert.alert_mode
        });
      let alerts = Copy(alertsResponse);
      if (deleteAlert) {
        const index = alerts.findIndex(a => a.alert_name === alert.alert_name);
        alerts.splice(index, 1);            
      } else {
        const index = alerts.findIndex(a => a.alert_name === alert.alert_name);
        alerts[index].status = 'read';
      }

      setAlertsResponse(alerts);
      updateSnackbar(true, response.data.message);
      setloadingData(false);
    } catch (error) {
      console.error(error);
      updateSnackbar(true, 'Error while setting Alert');
      setloadingData(false);
    }
  }

  const printAlerts = () => {
    return (
      <Container className="root" maxWidth>
        <Grid
          container
          spacing={1}
        >
        
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="left"
            height="100%"
            style={{ marginTop: '25px', width: '100%' }}

          >
          <Card className={classes.cardroot}>
            <CardContent  style={{ padding: '0px'}} className="bold-font">
              <Typography gutterBottom variant="h3" component="h2" style={{ padding: '16px'}}>
                <MarkunreadOutlinedIcon
                  style={{ marginLeft: '10px' }}
                />
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" >
                {Object.entries(alertsResponse).map(([index,alert],keyindex) => {
                  return (
                    alert.status == "unread" ?(
                    <Card className={classes.subcardroot}>
                      <CardHeader
                        title={alert.alert_name + ' ' + alert.message}
                        subheader={moment(alert['updated']).fromNow()}
                        avatar={
                          <Avatar src="/static/faviconm.png" />
                        }
                        action={(<>
                          <IconButton aria-label="read unread">
                          {alert.status == "read" ? (<Tooltip title="Unread Alert">
                          <MarkunreadIcon
                            style={{ marginLeft: '10px' }}
                            onClick={() => setAlert(alert, true)}              
                            onFocus={(event) => event.stopPropagation()}
                          />
                        </Tooltip>):<Tooltip title="Read Alert">
                          <MarkunreadOutlinedIcon
                            style={{ marginLeft: '10px' }}
                            onClick={() => setAlert(alert, false)}
                          />
                        </Tooltip>}
                        </IconButton>
                        <IconButton
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                          })}
                           onClick={() => handleExpandClick(keyindex,alert)}
                          aria-expanded={expandedId === keyindex}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </IconButton><IconButton aria-label="delete">
                            {<Tooltip title="Remove Alert">
                              <HighlightOffIcon
                                style={{ marginLeft: '10px' }}
                                onClick={() => deleteAlert(alert, true)}
                              />
                            </Tooltip>}
                         </IconButton></>)
                        }

                      />                   
                      <CardActions disableSpacing>                        
                        
                      </CardActions>
                      <Collapse in={expandedId === keyindex} timeout="auto" unmountOnExit>
                        <CardContent>
                         <Typography paragraph>
                            {!isEmpty(alert.messages)?(<><div className={classes.demo}>
                              <List>
                                  {Object.entries(alert.messages).map(([index,message],keyindex) => (
                                  <ListItem>
                                    <ListItemIcon>
                                      <SendIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={message}
                                      secondary={ null}
                                    />
                                  </ListItem>
                                  ))}
                              </List>
                            </div></>):'No Message'}
                          </Typography>
                        </CardContent>
                      </Collapse>
                    </Card>):''
                  );
                })}
              </Typography>
            </CardContent>
          </Card>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="left"
            height="100%"
            style={{ marginTop: '25px', width: '100%' }}
          >
          <Card className={classes.cardroot}>
           
            <CardContent  style={{ padding: '0px'}}>
              <Typography gutterBottom variant="h3" component="h2" style={{ padding: '16px'}}>
                <DraftsIcon
                  style={{ marginLeft: '10px' }}
                />
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" >
                {Object.entries(alertsResponse).map(([index,alert],keyindex) => {
                  return (
                    alert.status == "read" ?(
                    <Card className={classes.subcardroot}>
                      <CardHeader
                        title={alert.alert_name + ' ' + alert.message}
                        subheader={moment(alert['updated']).fromNow()}
                        avatar={
                          <Avatar src="/static/faviconm.png" />
                        }
                        action={(<>
                          <IconButton aria-label="read unread">
                          {alert.status == "read" ? (<Tooltip title="Unread Alert">
                          <MarkunreadIcon
                            style={{ marginLeft: '10px' }}
                            onClick={() => setAlert(alert, true)}              
                            onFocus={(event) => event.stopPropagation()}
                          />
                        </Tooltip>):<Tooltip title="Read Alert">
                          <MarkunreadOutlinedIcon
                            style={{ marginLeft: '10px' }}
                            onClick={() => setAlert(alert, false)}
                          />
                        </Tooltip>}
                        </IconButton>
                        <IconButton
                          className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                          })}
                           onClick={() => handleExpandClick(keyindex,alert)}
                          aria-expanded={expandedId === keyindex}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </IconButton><IconButton aria-label="delete">
                            {<Tooltip title="Remove Alert">
                              <HighlightOffIcon
                                style={{ marginLeft: '10px' }}
                                onClick={() => deleteAlert(alert, true)}
                              />
                            </Tooltip>}
                         </IconButton></>)
                        }

                      />                   
                      
                      <Collapse in={expandedId === keyindex} timeout="auto" unmountOnExit>
                        <CardContent>
                         <Typography paragraph>
                            {!isEmpty(alert.messages)?(<><div className={classes.demo}>
                              <List>
                                  {Object.entries(alert.messages).map(([index,message],keyindex) => (
                                  <ListItem>
                                    <ListItemIcon>
                                      <SendIcon />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={message}
                                      secondary={ null}
                                    />
                                  </ListItem>
                                  ))}
                              </List>
                            </div></>):'No Message'}
                            
                           
                          </Typography>
                        </CardContent>
                      </Collapse>
                    </Card>):''
                  );
                })}
              </Typography>
            </CardContent>
          </Card>
          </Box>
        </Grid>
      </Container>
    )
  }

  return (
    <div style={{ marginLeft: '10px' }}>
      {alertsResponse && printAlerts()}
      {isLoadingData && getLoader()}
      <MySnackbar
        closeSnackbar={() => updateSnackbar(false, '')}
        snackbarMessage={snackbar.message}
        snackbarOpen={snackbar.open}
      />

    </div>
  );
};

export default Alerts;