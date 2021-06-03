import React,{ useEffect, useState, useCallback } from 'react';
import {Link} from 'react-router-dom';
import {
    makeStyles,
    Grid,
    Drawer,
    Typography,
    Box, List, ExpansionPanel,
    ExpansionPanelSummary, ExpansionPanelDetails, 
    ListItem, ListItemIcon, ListItemText,
    Tooltip,
    Button,
   
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import Skeleton from '@material-ui/lab/Skeleton';
import ShowMoreText from "react-show-more-text";
import ReactSpeedometer from "react-d3-speedometer"
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import {delAlert,setAlert} from '../management/Alerts/AlertFunctions';
import moment from 'moment';
import Axios from 'axios';
import './VulDrawerComponent.css';






const useStyles = makeStyles((theme) => ({
    dragger: {
        width: '5px',
        cursor: 'ew-resize',
        padding: '4px 0 0',
        borderTop: '1px solid #ddd',
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: '100',
        backgroundColor: '#f4f7f9'
    },
    alertIcon : {
        marginLeft: '10px',
        color: '#3949ab' 

    },
    closeIcon:
    {
        marginBottom:'15px',
        marginTop:'2px',
        cursor:'pointer'
    },
    linkText:{
        textDecoration:'none'
    },
    buttonLabel:{
        textAlign:'center',
        width:'90%',
        color:'white',
        marginLeft:'5%',
        backgroundColor:'#3579DC',
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
          }
    },
    severityScores:
    {
        color:'black',fontSize:'14px',fontWeight:'600'
    }
}));

const VulDrawerComponent =({openDrawer,singlerows,handleRemoveRow,closeDrawer}) => {

    const classes= useStyles();

    const [expand, setExpand] = useState(false);
    const defaultDrawerWidth = 600;
    const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);
    const [alertsOn,setAlertsOn] = useState(false);
  
   

    useEffect(()=>{
        if(singlerows)
       alertStatus(singlerows.cve_id);

    },[singlerows]);

    const alertStatus =  async (productName) => {
     
        const url =`/alerts/lists`;
        const response = await Axios.get(url);
        if(!response.data){
            return;
        }
       const alertList = response.data;
       
      const temp=alertList.filter((row) => row.alert_name === productName);
      if(temp.length>0)
      setAlertsOn(true);
       
    };

    

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerWidth(defaultDrawerWidth);
        closeDrawer();
    };

    const handleMousedown = e => {
        document.addEventListener("mouseup", handleMouseup, true);
        document.addEventListener("mousemove", handleMousemove, true);
    };

    const handleMousemove = useCallback(e => {
        let offsetRight =
            document.body.offsetWidth - (e.clientX - document.body.offsetLeft);
        let minWidth = 400;
        let maxWidth = 1200;
        if (offsetRight > minWidth && offsetRight < maxWidth) {
            setDrawerWidth(offsetRight);
        }
    }, []);

    const handleMouseup = e => {
        document.removeEventListener("mouseup", handleMouseup, true);
        document.removeEventListener("mousemove", handleMousemove, true);
    };

    const handleClose = async (event, value) => {
        handleRemoveRow(event,value);

    };

    const onShowMore = () => {
        setExpand(!expand);
    };


    return (
             
            <Drawer
                className="open_vulnerabilities cvesearchright drawer"
                anchor="right" open={openDrawer}
                onClose={toggleDrawer('right', false)}
                PaperProps={{ style: { width: drawerWidth } }}>
                    
                    <Box
                        className=" cvesearchright-inner"
                        borderRadius={5}
                    >
                        {singlerows ? (
                            <>
                                <Box className={classes.boxrightheader}
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    borderRadius={16}>
                                     <Box display="flex" style={{marginBottom:'5px'}}>
                                        < CloseOutlinedIcon fontSize="small" className={classes.closeIcon} color="disabled" onClick={handleClose} />
                                        <Typography style={{marginLeft:'15px'}} variant="h4" component="h2">
                                                {singlerows.cve_id}
                                            </Typography>
                                           </Box>
                                            
                                    <Box className="boxdetailhead">
                                    
                                        <Box className="boxdetailtitle" style={{display:"inline-flex"}}>
                                       
                                            
                                            <Typography gutterBottom variant="h5" component="h2">
                                                Severity Scores
                                            </Typography>
                                            
                                    <div>
                                       
                                        {alertsOn ? <Tooltip title="Remove Alert">
                                            <NotificationsOffIcon className={classes.alertIcon} onClick={() => { delAlert(singlerows.cve_id,"cve_id"); setAlertsOn(false); }} />
                                        </Tooltip> : <Tooltip title="Set Alert">
                                            <AddAlertIcon className={classes.alertIcon} onClick={() => { setAlert(singlerows.cve_id,"cve_id"); setAlertsOn(true); }} />
                                        </Tooltip>
                                        }
                                    </div>
                                        </Box>
                                <Box className="boxtitlecontent">
                                    {singlerows.severity && singlerows.snapshot? (
                                        <> <Typography style={{marginBottom:'10px'}} variant="body2" color="textSecondary" component="div" className="scoreblock-div">

                                            {Object.entries(singlerows.severity).map((severity) => (
                                                <>
                                                    <Box className="scoreblock MuiGrid-grid-md-6">
                                                        <Box className="scoreblock-inner">
                                                            <Box className="scoretitle">
                                                                {severity[0]}
                                                            </Box>
                                                            <Box className="scorevalue">
                                                                {severity[1]}
                                                            </Box>
                                                        </Box>
                                                    </Box>
                                                </>
                                            ))}

                                        </Typography>
                                        <Box display="flex" >
                                            <Typography variant="body1" className={classes.severityScores}>CWEID :</Typography>
                                            <Typography variant="body1" style={{marginLeft:'5px'}} className={classes.severityScores}>{singlerows.snapshot.CWEID}</Typography>
                                        </Box>
                                        </>
                                    ) : ''}
                                </Box>

                                         {/*   {singlerows.niah_meter ? (
                                                <>
                                                    <Grid
                                                        className="meter"
                                                    >
                                                        <Grid
                                                            xs={6}
                                                            md={6}
                                                            className="meterleft"
                                                        >
                                                            <Typography gutterBottom variant="h5" component="h2">
                                                                {singlerows.niah_meter.title}
                                                            </Typography>
                                                            <Typography gutterBottom variant="h5" component="h2">
                                                                <a target="_blank" rel="noopener noreferrer" href={singlerows.niah_meter.patch_now}>Patch Now</a>
                                                            </Typography>
                                                        </Grid>
                                                        <Grid
                                                            xs={6}
                                                            md={6}
                                                            className="meterright"
                                                        >
                                                            <ReactSpeedometer
                                                                maxSegmentLabels={0}
                                                                width={150}
                                                                height={150}
                                                                value={singlerows.niah_meter.speedometer.default}
                                                                customSegmentStops={parseInt(singlerows.niah_meter.speedometer.segments)}
                                                                minValue={parseInt(singlerows.niah_meter.speedometer.min)}
                                                                maxValue={parseInt(singlerows.niah_meter.speedometer.max)}
                                                                segmentColors={singlerows.niah_meter.speedometer.colors}
                                                                needleHeightRatio={0.6}
                                                                ringWidth={10}
                                                                height={150}
                                                                needleColor={'#000000'}
                                                                valueFormat={'d'}

                                                            />

                                                        </Grid>
                                                    </Grid>
                                                </>
                                         ) : ''}*/}
                                        
                                    </Box>
                                </Box>
                                {singlerows.NIAH_Insights ? (
                                    <>
                                        <Box className={classes.boxrightheader}
                                            display="flex"
                                            flexDirection="column"
                                            justifyContent="center"
                                            borderRadius={16}>
                                            <Box className="boxdetailhead">
                                                <Box className="boxdetailtitle">
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        NIAH Insights
                  </Typography>
                                                </Box>
                                                <Box className="boxtitlecontent">
                                                    <Typography variant="body2" color="textSecondary" component="div">
                                                        <List component="ul" className="niahinsightlist">
                                                            {Object.values(singlerows.NIAH_Insights).map((insights) => (
                                                                <>
                                                                    <ListItem>
                                                                        <ListItemIcon>
                                                                            <SendIcon />
                                                                        </ListItemIcon>
                                                                        <ListItemText>{insights}</ListItemText>
                                                                    </ListItem>
                                                                </>
                                                            ))}
                                                        </List>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                    </>
                                )
                                    : ''}
                                {singlerows.snapshot ? (
                                    <>
                                        <Box className={classes.boxrightheader}
                                            display="flex"
                                            flexDirection="column"
                                            justifyContent="center"
                                            borderRadius={16}>
                                            <Box className="boxdetailhead">
                                                <Box className="boxdetailtitle">
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Vulnerability Snapshot
                  </Typography>
                                                </Box>
                                                <Box className="boxtitlecontent">
                                                    <Typography variant="body2" color="textSecondary" component="div">
                                                        <List component="ul" className="snapshotlist">
                                                            {Object.entries(singlerows.snapshot).map((snapshot) => (
                                                                <>
                                                                    {snapshot[1] ? (
                                                                        <>
                                                                            {snapshot[0] == "Description" ? (
                                                                                <ListItem>
                                                                                    <ListItemText>
                                                                                        <Box className="snapshot-title">{snapshot[0]} :  </Box>
                                                                                        <Box className="snapshot-content description"><ShowMoreText
                                                                                            lines={3}
                                                                                            more={"Read More"}
                                                                                            less={"Less More"}
                                                                                            onClick={onShowMore}
                                                                                            expanded={expand}
                                                                                            maxWidth={1500}
                                                                                        >
                                                                                            {snapshot[1]}
                                                                                        </ShowMoreText></Box>
                                                                                    </ListItemText>
                                                                                </ListItem>
                                                                            ) : <ListItem>
                                                                                <ListItemText>
                                                                                    {snapshot[0] == "publishedDate" ? (<>
                                                                                    
                                                                                        <Box className="snapshot-title">Published Date: </Box>
                                                                                        <Box className="snapshot-content">{moment(snapshot[1]).format('MMM DD, YYYY')}</Box></>) :''
                                                                                        }
                                                                                </ListItemText>
                                                                            </ListItem>}
                                                                        </>) : ''}
                                                                </>
                                                            ))}
                                                        </List>
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                        <Box>
                                <Link className={classes.linkText} to={`/app/CVE/${singlerows.cve_id}`}>
                                <Button className={classes.buttonLabel}  variant="contained" >
                                   VIEW FULL DETAILS
                                </Button>
                                </Link>
                                </Box>

                                    </>
                                )
                                    : ''}
                                {singlerows.Exploits ? (
                                    <>
                                        <Box className={classes.boxrightheader}
                                            display="flex"
                                            flexDirection="column"
                                            justifyContent="center"
                                            borderRadius={16}>
                                            <Box className="boxdetailhead">
                                                <Box className="boxdetailtitle">
                                                    <Typography gutterBottom variant="h5" component="h2">
                                                        Exploits
                  </Typography>
                                                </Box>
                                                <Box className="boxtitlecontent explo-list">
                                                    <List style={{ width: '100%' }} dense={false}>
                                                        {Object.keys(singlerows.Exploits).map((cKey, index) =>
                                                            <ExpansionPanel
                                                                key={cKey}
                                                                style={{ width: '100%' }}
                                                            >
                                                                <ExpansionPanelSummary
                                                                    expandIcon={<ExpandMoreIcon />}
                                                                    aria-controls="panel1a-content"
                                                                    id="panel1a-header"
                                                                >
                                                                    <Typography component="h2">
                                                                        {singlerows.Exploits[cKey].Advisory}
                                                                    </Typography>
                                                                </ExpansionPanelSummary>
                                                                <ExpansionPanelDetails>
                                                                    <Typography
                                                                        variant="caption"
                                                                        color="textSecondary"
                                                                    >
                                                                        {Object.keys(singlerows.Exploits[cKey].Reference).map((rKey) =>
                                                                            <a target="_blank" style={{ display: 'inline-block' }} href={singlerows.Exploits[cKey].Reference[rKey]}>{singlerows.Exploits[cKey].Reference[rKey]}</a>
                                                                        )}
                                                                    </Typography>
                                                                </ExpansionPanelDetails>
                                                            </ExpansionPanel>
                                                        )}
                                                    </List>
                                                </Box>
                                            </Box>
                                        </Box>

                                    </>
                                )
                                    : ''}

                            </>
                        )
                            : (<> <Box className={classes.boxrightheader}
                                display="flex"
                                flexDirection="column"
                                justifyContent="center"
                                borderRadius={16}>
                                <Box className="boxdetailhead">
                                    <Box className="boxdetailtitle">
                                        <Typography gutterBottom variant="h5" component="h2">
                                            <Skeleton animation="wave" height="20px" width="100%" />
                                        </Typography>
                                    </Box>
                                    <Box className="boxtitlecontent">
                                        <Skeleton animation="wave" height="100px" width="100%" />
                                    </Box>
                                </Box>
                            </Box>
                                <Box className={classes.boxrightheader}
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    borderRadius={16}>
                                    <Box className="boxdetailhead">
                                        <Box className="boxdetailtitle">
                                            <Typography gutterBottom variant="h5" component="h2">
                                                <Skeleton animation="wave" height="20px" width="100%" />
                                            </Typography>
                                        </Box>
                                        <Box className="boxtitlecontent">
                                            <Skeleton animation="wave" height="200px" width="100%" />
                                        </Box>
                                    </Box>
                                </Box> <Box className={classes.boxrightheader}
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    borderRadius={16}>
                                    <Box className="boxdetailhead">
                                        <Box className="boxdetailtitle">
                                            <Typography gutterBottom variant="h5" component="h2">
                                                <Skeleton animation="wave" height="20px" width="100%" />
                                            </Typography>
                                        </Box>
                                        <Box className="boxtitlecontent">
                                            <Skeleton animation="wave" height="200px" width="100%" />
                                        </Box>
                                    </Box>
                                </Box><Box className={classes.boxrightheader}
                                    display="flex"
                                    flexDirection="column"
                                    justifyContent="center"
                                    borderRadius={16}>
                                    <Box className="boxdetailhead">
                                        <Box className="boxdetailtitle">
                                            <Typography gutterBottom variant="h5" component="h2">
                                                <Skeleton animation="wave" height="20px" width="100%" />
                                            </Typography>
                                        </Box>
                                        <Box className="boxtitlecontent">
                                            <Skeleton animation="wave" height="200px" width="100%" />
                                        </Box>
                                    </Box>
                                </Box> </>)}
                    </Box>

                   
                <div
                    id="dragger"
                    onMouseDown={event => {
                        handleMousedown(event);
                    }}
                    className={classes.dragger}
                />
            </Drawer>

    );
};

export default VulDrawerComponent;