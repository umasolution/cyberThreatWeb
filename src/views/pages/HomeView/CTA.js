import React,{ useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Axios from 'axios';
import {
  Box,
  Button,
  Container,
  Typography,
  makeStyles,
  Tooltip,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import MarkunreadOutlinedIcon from '@material-ui/icons/MarkunreadOutlined';
import Copy from './../../../Util/Copy';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundImage: `url(${"/static/home/start_clean_bg.png"})`,
    paddingTop: 80,
    paddingBottom: 63,
    [theme.breakpoints.down('xs')]: {
      paddingTop: 40,
      paddingBottom: 30,
    },
  },
  browseButton: {
    marginLeft: theme.spacing(2)
  },
  mainH2 : {
    fontWeight: theme.fontfamily.bold,
    color : "#fff",
    marginBottom : 22,
    fontSize:'26px',
    letterSpacing:'1px'
  },
  mainH3 : {
    fontWeight: theme.fontfamily.semiBold,
    color : "#fff",
    marginTop : 22,
    marginBottom : 14,
    fontSize:'18px',
    letterSpacing:'1px'
  },
  mainH5 : {
    fontWeight: theme.fontfamily.regular,
    color : "#fff",
    marginTop : 14,
    lineHeight: '27px',
    fontSize:'14px',
  },
  mainBtn :{
    marginTop : 50
  },
  startedButton :{
    borderRadius: 35,
    backgroundColor: "#ff0476",
    padding: "10px 40px",
    fontWeight: theme.fontfamily.semiBold,
    fontSize:'14px',
    letterSpacing:'1px'
  }
}));

function CTA({ className, ...rest }) {
  const classes = useStyles();
  

 useEffect(() => {
    getAlerts();
  }, []);

  const getAlerts = async () => {
    try {
      const url = `/single-alertlist.php`;
      const response = await Axios.get(url);
      if (!response.data) {
        return;
      }
      console.log(response.data);
      return;
      setAlertsResponse(response.data);
    } catch (error) {
      console.error(error);
      
    }
  }
  const [alertsResponse, setAlertsResponse] = useState(null);

    const [selectedFile, setSelectedFile] = useState();
    const [image, setImage] = useState();
    const [avatar, setavatar] = useState();
    const [mydata, setData] = useState();
    

    const onFileChange = async (event, value) => {      
        setSelectedFile(event.target.files[0]); 
        console.log(event.target.files) ;
    };

    const onFileUpload = async () => { 
     
      // Create an object of formData 
      var formData = new FormData();

      // Update the formData object 
      formData.append( 
        'file', 
        selectedFile
      );

     /* formData.append( 
        'file', 
         fs.createReadStream(selectedFile.name)
      );*/
      /*formData.append( 
        'file', 
        selectedFile, 
        'C:/Users/divya/Downloads/Benedict_Cumberbatch_2011.png' 
      );*/

     
      // Details of the uploaded file 
      console.log(selectedFile); 
     
      // Request made to the backend api 
      // Send formData object 

      Axios.post("api/upload/image", formData).then((res) => {
        console.log(res);
      });

      /*const response = await Axios.post("api/upload/image", formData);
      console.log(response);*/
      
    }; 

    const setAlert = async (alert, deleteAlert) => {
    try {
      
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
     
    } catch (error) {
      console.error(error);
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

  const getDetailsdata = (alertsResponse) => {
    return ( <ExpansionPanel
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
                  <FormControlLabel
                      aria-label="Acknowledge"
                      control={<Checkbox />}
                      onClick={(event) => event.stopPropagation()}
                      onFocus={(event) => event.stopPropagation()}
                      label="I acknowledge that I should stop the click event propagation"
                    />

                    
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div style={{ width: '100%' }} >
                      
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              
            
    )
  }

  return (
    <div
      id="ctapage"
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          align="center"
          className={classes.mainH2}
          mt={4}
        >
          Start Clean
        </Typography>
        <Typography
          variant="h3"
          align="center"
          className={classes.mainH3}
          m={4}
          color="secondary"
        >
          Use our certified base images to start building your applications.
        </Typography>
      </Container>
      <Container maxWidth="lg" className="topSearch">
                  <div> 
                      <input type="file" name="file" onChange={onFileChange} /> 
                      <button onClick={onFileUpload}> 
                        Upload! 
                      </button> 
                  </div>
                </Container>

      <Container maxWidth="sm">
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Typography
            variant="h5"
            align="center"
            color="secondary"
            className={classes.mainH5}
          >
            Know before you use an image from Dockerhub or other public sources. Our pre-scanned reports provide you a report on vulnerabilities in popular dockerhub images.
           </Typography>
        </Box>
        <Box
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.mainBtn}
        >
         <Button
                color="secondary"
                size="large"
                type="button"
                variant="contained"
                className={classes.startedButton}
                
              >
                GET STARTED
              </Button>
         </Box>     
      </Container>
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
            {getDetailsdata(alertsResponse)}
            


          </Box>
        </Grid>
      </Container>
    </div>
  );
}

CTA.propTypes = {
  className: PropTypes.string
};

export default CTA;
