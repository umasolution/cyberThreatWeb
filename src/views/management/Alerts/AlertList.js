import React,{useState,useRef, createRef} from 'react';
import {
    Grid,
    Typography,
    makeStyles,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Tooltip,IconButton
} from '@material-ui/core';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import clsx from 'clsx';

import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './AlertList.css';
import PopoverContent from './PopoverContent';
import { Markunread } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    grid:{
      marginTop:'3px'
    },
    icon:{

        margin:'7px',
     
    },
    accordion :
    {
    
        /*padding:'10px',
        marginLeft:'11px'*/
        width:'100%'
    },
    unreadMail:{
        backgroundColor:theme.palette.grey[100],
        color:"grey",
        fontWeight:'300',
        width:'100%',
        marginTop: '10px',
        marginLeft:'10px',      
    },
    
    readMail :{
        marginTop: '10px',
        marginLeft:'10px',         
        fontWeight:'500',
        width:'100%',
        color:'black'

    },
    unreadMailbgr:{
        backgroundColor:theme.palette.grey[100],
    },
    readMailbgr : {
        backgroundColor:'white',
    }
}));

const AlertList = ({ alertList,changeAlertmsgStatus,changeMsgReadtoUnread,deleteAlert}) => {

    const classes = useStyles();
    const [mailStatus,setMailStatus]=useState("");
  
   

    const onHandleChange=(alerts,index) => {
        if (alerts.status === "read")
        {
            changeMsgReadtoUnread(alerts,index);
            
            
        }
    };

   const onHandleClick = (e,alerts,index) => {
       
        e.stopPropagation();
        if(alerts.status === "read")
        {
            changeMsgReadtoUnread(alerts,index);
          
        }
        else
        {
       changeAlertmsgStatus(alerts,index);
      
        }
    };

    const onDeleteAlert = (e,alerts,index) => {
        e.stopPropagation();
      deleteAlert(alerts,index);
    }
  
   

    return (
        <Grid container spacing={0} className={classes.grid}>
            {
                alertList.map((alerts, index) => {
                    return (
                        <>
                      
                        
                        <Accordion key={index}  className={classes.accordion} onClick={(e)=>onHandleChange(alerts,index)}>
                            <AccordionSummary  className={(alerts.status === "read")?classes.readMailbgr:classes.unreadMailbgr} expandIcon={<ExpandMoreIcon />} >
                                <Grid item justify="center" xs={2}>
                                    <Typography  variant="h6" component="h4"  className={alerts.status === "read"?classes.readMail:classes.unreadMail} > 
                                        {alerts.alert_name}
                                    </Typography>
                                </Grid>
                                <Grid item alignItems="center" xs={2}>
                                    <Typography   variant="h6" component="h4" className={alerts.status === "read" ?classes.readMail:classes.unreadMail}>
                                        {alerts.alert_type}
                                    </Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Grid container>
                                        <Grid item  xs={9}>
                                        <Typography variant="h6" className={alerts.status === "read" ?classes.readMail:classes.unreadMail}>
                                           {/*{alerts.message}*/}
                                           New Alert found for {alerts.alert_name}
                                        </Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Grid container justify="flex-end">
                                                <div onClick={(e)=>onHandleClick(e,alerts,index)}>
                                        <Tooltip title={alerts.status==="read"?"Mark as read":"Mark as unread"}>
                                  
                                        <MarkunreadIcon className={classes.icon} color="disabled" />
                                        </Tooltip>
                                        </div>
                                    
                                        <PopoverContent />
                                        <Tooltip title="Delete">
                                        <DeleteIcon className={classes.icon} color="disabled" onClick={(e) => onDeleteAlert(e,alerts,index)} />
                                        </Tooltip>
                                        </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AccordionSummary>
                            <AccordionDetails style={{justifyContent:'center'}}>
                                 {/*}  {(alerts.messages).map((msg) => {
                                                return(
                                                    <div>
                                                    <Typography variant="h6" component="h4" align="justify" >
                                                    {msg}
                                                     </Typography>
                                                    <hr/>
                                                    </div>
                                                )
                                            })}*/}
                            <Typography variant="h6" component="h4" align="justify" >
                                    New Alert found for {alerts.alert_name}
                            </Typography>
                                         
                                       
                            </AccordionDetails>
                        </Accordion>
                        </>
                    )
                })
            }

        </Grid>
    )
};

export default AlertList;