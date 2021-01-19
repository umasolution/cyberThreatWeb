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

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
    display: 'block',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '100%'
  },
  // borderDiv: {
  //   border: '1px',
  //   borderStyle: 'solid',
  //   borderRadius: '10px',
  //   borderColor: 'brown',
  //   marginTop: '5px'
  // }
}));
const Alerts = () => {

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ""
  });
  const classes = useStyles();
  const [isLoadingData, setloadingData] = useState(true);
  const [alertsResponse, setAlertsResponse] = useState(null);


  useEffect(() => {
    getAlerts();
  }, []);

  const getAlerts = async () => {
    try {
      updateLoadingData(true);
      const url = `/alerts/lists`;
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
      let url = `/status/delalert`;
      if (!deleteAlert) {
        url = `/status/setalert`;
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
        /*alerts.splice(index, 1);*/
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

  const getSummary = (alert, index) => {
    return (
      <>
        <div className="header1">
          {
            Object.keys(alert).map(key => {
              return (
                <>
                  {key == 'alert_name' && 
                    (
                      <span>
                        <h6 className="details-header">
                          {key == 'alert_name' ? alert[key] : null}
                        </h6>                        
                      </span>
                    )
                  }
                </>
              )
            })
          }
          {alert.status == "read" ? (<Tooltip title="Read Alert">
            <MarkunreadIcon
              style={{ marginLeft: '10px' }}
              onClick={() => setAlert(alert, true)}
            />
          </Tooltip>):<Tooltip title="Unread">
            <MarkunreadOutlinedIcon
              style={{ marginLeft: '10px' }}
              onClick={() => setAlert(alert, false)}
            />
          </Tooltip>}
          {/*<Tooltip title="Remove Alert">
            <NotificationsOffIcon
              style={{ marginLeft: '10px' }}
              onClick={() => setAlert(alert, true)}
            />
          </Tooltip>*/}
        </div>
        <div>
          {
            Object.keys(alert).map(key => {
              return (
                <>
                  {key === 'Updated Details' &&
                    <div className="header2">
                      {alert[key].length > 0 && <ArrowRightIcon className="right-arrow-icon" />}
                      {alert[key].map(updatedDetails => {
                        return (
                          Object.keys(updatedDetails).map(updatedDetail => {
                            return (
                              <div className="odd-even-background">
                                <h6 className="details-header">
                                  {updatedDetail}
                                </h6>
                                <p>{updatedDetails[updatedDetail]}</p>
                              </div>
                            )
                          })
                        )
                      })}
                    </div>
                  }
                </>
              )
            })
          }
        </div>
      </>
    )
  }

  const getDetails = (data) => {
    return (
      <>
          {Object.keys(data).length > 0 && <ArrowRightIcon className="right-arrow-icon" />}
          {
            Object.keys(data).map(key => {
              return (
              <div key={key} className="odd-even-background">
                <Typography
                    variant="h6"
                    color="textPrimary"
                    className={classes.title}
                  >
                     {key}
                  </Typography>                  
                  <Typography className={classes.secondaryText}>
                      {data[key]}
                  </Typography>
                  </div>
                 
              )
            })
          }
        
      </>
    )
  }

  const expandPanel = async (event, expanded, alert) => {
    if (alert.status === 'unread') {
        setAlert(alert, false)
        /*try {
         const url = `/status/setalert`;
         await Axios.post(url,
           {
             "alert_type": alert.alert_type,
             "alert_name": alert.alert_name,
             "alert_mode" : alert.alert_mode
           });
 
       } catch (error) {
         console.error(error);
       }*/ 

    }
  }

  const printAlerts = () => {
    return (
      <Container className="root" maxWidth="lg">
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

            {Object.entries(alertsResponse).map(([index,alert]) => {
              return (
                <ExpansionPanel
                  style={{ width: '100%' }}
                  onChange={(event, expanded) =>
                    expandPanel(event, expanded, alert)}
                    className={alert.status === 'unread' ? 'bold-font' : null}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onex
                    className={alert.status === 'unread' ? 'bold-font' : null}
                  >

                    {getSummary(alert, index)}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div style={{ width: '100%' }} >
                      {getDetails(alert)}
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              );
            })}


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