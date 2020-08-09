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
      const url = `/getalert`;
      const response = await Axios.post(url,
        {
          "emailAdd": authService.getUserName()
        });
      const res = {
        data: [
          [
            {
              "message": "Exploit-DB PoC Available",
              "pub date": "2020-01-09",
              "reference": "https://exploit-db/111"
            },
            {
              "message": "NVD PoC Available",
              "pub date": "2020-01-09",
              "reference": "https://nvd-db/111"
            }
          ],
          [
            {
              "message": "Exploit-DB PoC Available1",
              "pub date": "2020-01-09",
              "reference": "https://exploit-db/111"
            },
            {
              "message": "NVD PoC Available1",
              "pub date": "2020-01-09",
              "reference": "https://nvd-db/111"
            }
          ]
        ],
        header: [
          {
            "CVEID": "CVE-2020-12345",
            "Status": "unread",
            "Updated Details": [
              {
                "message": "NVD PoC Available",
                "pub date": "2020-01-09",
                "reference": "https://nvd-db/111"
              }
            ],
            "Updated On": "2020-08-07 15:36:43"
          },
          {
            "CVEID": "CVE-2020-123456",
            "Status": "unread",
            "Updated Details": [
              {
                "message": "NVD PoC Available",
                "pub date": "2020-01-09",
                "reference": "https://nvd-db/111"
              }
            ],
            "Updated On": "2020-08-07 15:36:43"
          }
        ]
      };
      // setAlertsResponse(res);
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

  const setAlert = async (alert) => {
    try {
      setloadingData(true);
      const response = await Axios.post('/status/delalert',
        {
          "emailAdd": authService.getUserName(),
          "cve_id": alert.CVEID
        });
      let alerts = Copy(alertsResponse);
      const index = alerts.header.findIndex(a => a.CVEID === alert.CVEID);
      alerts.header.splice(index,1);
      alerts.data.splice(index,1);
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
                          {key}
                        </h6>
                        {' '}
                        {alert[key]}
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
              onClick={() => setAlert(alert)}
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
                <div className="header2">
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
    if (!alert.Status || alert.Status === 'unread') {
      const url = `/status/setalert`;
      await Axios.post(url,
        {
          "emailAdd": authService.getUserName(),
          "cve_id": alert.CVEID
        });

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