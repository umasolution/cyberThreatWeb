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

const Alerts = () => {

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: ""
  });

  const [isLoadingData, setloadingData] = useState(true);
  const [alertsResponse, setAlertsResponse] = useState(null);


  useEffect(() => {
    getAlerts();
  }, []);

  const getAlerts = async () => {
    try {
      updateLoadingData(true);
      const url = `/alert/lists`;
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
      let url = `/status/delalert`;
      if (!deleteAlert) {
        url = `/status/setalert`;
      }
      const response = await Axios.post(url,
        {
          "emailAdd": authService.getUserName(),
          "cve_id": alert.CVEID
        });
      let alerts = Copy(alertsResponse);
      if (deleteAlert) {
        const index = alerts.header.findIndex(a => a.CVEID === alert.CVEID);
        alerts.header.splice(index, 1);
        alerts.data.splice(index, 1);
      } else {
        const index = alerts.header.findIndex(a => a.CVEID === alert.CVEID);
        alerts.header[index].Status = 'read';
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
                  {key !== 'Updated Details' &&
                    (
                      <span>
                        <h6 className="details-header">
                          {key !== 'Updated On' ? key : !isEmpty(alert[key]) ? key : null}
                        </h6>
                        {
                          key === 'Status' && isEmpty(alert[key]) ? 'No Updates' :
                            key === 'CVEID' ? <Link target="_blank" to={`/app/CVE/${alert[key]}`}>{alert[key]}</Link> : alert[key]
                        }
                      </span>
                    )
                  }
                </>
              )
            })
          }
          <Tooltip title="Remove Alert">
            <NotificationsOffIcon
              style={{ marginLeft: '10px' }}
              onClick={() => setAlert(alert, true)}
            />
          </Tooltip>
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
                              <span className="updated-detail">
                                <h6 className="details-header">
                                  {updatedDetail}
                                </h6>
                                {updatedDetails[updatedDetail]}
                              </span>
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
        {
          data?.map(dataObj => {
            return (
              <>
                <div className="header2 odd-even-background">
                  {Object.keys(dataObj).length > 0 && <ArrowRightIcon className="right-arrow-icon" />}
                  {
                    Object.keys(dataObj).map(key => {
                      return (
                        <span className="updated-detail">
                          <h6 className="details-header">
                            {key}
                          </h6>
                          {' '}
                          {dataObj[key]}
                        </span>
                      )
                    })
                  }
                </div>
              </>
            )
          })
        }
      </>
    )
  }

  const expandPanel = async (event, expanded, alert) => {
    if (alert.Status === 'unread') {
      setAlert(alert, false)
      /*  try {
         const url = `/status/setalert`;
         await Axios.post(url,
           {
             "emailAdd": authService.getUserName(),
             "cve_id": alert.CVEID
           });
 
       } catch (error) {
         console.error(error);
       } */

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
            {alertsResponse.header.map((alert, index) => {
              return (
                <ExpansionPanel
                  style={{ width: '100%' }}
                  onChange={(event, expanded) =>
                    expandPanel(event, expanded, alert)}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    onex
                    className={alert?.Status === 'unread' ? 'bold-font' : null}
                  >
                    {getSummary(alert, index)}
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div style={{ width: '100%' }} >
                      {getDetails(alertsResponse.data[index])}
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