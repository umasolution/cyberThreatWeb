import * as React from 'react';
import { useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField, Divider, makeStyles } from '@material-ui/core';
import { Component } from '@fullcalendar/core';
import { useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { setIntegrations } from 'src/actions/integrationActions';
import { LinearProgress } from '@material-ui/core';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    roundedCorner : '5px',
    boxShadow: 10,
    p: 4,
};

const useStyles = makeStyles(theme=>({
    txt : {
        width : '100%'
    },
    description: {
        marginTop:'10px'
    },
    save:{
        backgroundColor : 'rgb(25, 118, 210)',
        color:'rgb(255, 255, 255)'
    },
    error:{
        color : 'red'
    },
    disconnect : {
        backgroundColor : 'rgb(211, 47, 47)',
        color:'rgb(255, 255, 255)'
    },
    lbl : {
        fontStyle : 'bold'
    }
}));

export default function TransitionsModal({ openModal, data, onClose, group }) {
    const styles = useStyles();
    const [open, setOpen] = React.useState(openModal);
    const [cloned,setCloned] = React.useState({...data});
    const dispatch = useDispatch();

    useEffect(() => {
        setOpen(openModal);
        setError('');
    }, [openModal])
    const handleOpen = () => setOpen(open);
    const handleClose = () => onClose(false);

    const modalContentsByType = useSelector(state => state.integrations.modalContentsByType);
    const integrationDetails = useSelector(state => state.integrations.integrationDetails);

    const [error,setError] = React.useState('');

    

    const existingLayoutComponents = (components) => {
        return components.map(component => {
            if(component.type == 'txt'){
                return (
                    <Grid item xs={12}>
                        <Grid item xs = {6}>
                            <label >{applyBold(component.label)} </label>
                        </Grid>
                        <Grid item xs = {6}>
                            <label>{data.auth_details[component.key]} </label>
                        </Grid>
                    </Grid>
                )
            }else if(component.type == 'lbl'){
                return (
                    <Grid item xs={12}>
                            <label className={styles.txt}>{component.bold ? applyBold(component.label) : component.label}</label>        
                    </Grid>
                )
            }
                
        });
    }

    const onChangeTxtField = (event,key) => {
        const cl = {...cloned}
        cl.auth_details[key] = event.target.value;
        setCloned(cl);
    }

    const resetCloned = () => {
        let resetted = {};
        for (let key in cloned) {
            if (cloned.hasOwnProperty(key)) {
                if(key != 'connection')
                    resetted[key] = ''
            }
        }

        return resetted;
    }

    const onSave = async () => {
        setLoadingData(true);
        const postData = {...cloned.auth_details};
        delete postData.connection;

        try {
            const response = await Axios.post('/connectors/add', 
                                    {...postData, application : cloned.application, 
                                        type : group}
            );
            
            if(response.data.status == 0){
                setError('Please verify and enter the correct credentials to connect.')
            }else{
                refreshIntegrations();
            }
            setLoadingData(false)
            
        }catch(e){
            setLoadingData(false);
            console.log(e);
            setError('Please verify and enter the correct credentials to connect.')
        }
        

    }

    const refreshIntegrations = async () => {
        const response = await Axios.get('/get/integrations');
        dispatch(setIntegrations(response.data))
    }

    const onDisconnect = async () => {
        const postData = {...cloned.auth_details};
        const response = await Axios.post('/delete/integrations', 
                                    {...postData, application : cloned.application, type : group}
        );

        setCloned(resetCloned);
        refreshIntegrations();
    }

    const layoutComponents = (components) => {
        return components.map(component => {
            if(component.type == 'txt'){
                return (
                    <Grid item xs={12}>
                            <TextField className={styles.txt} 
                                        label={component.label} 
                                        variant="outlined"
                                        onChange = {(e)=>onChangeTxtField(e,component.key)}
                                        value = {cloned.auth_details[component.key]}
                                       
                                    />
                        
                    </Grid>
                )
            }else if(component.type == 'lbl'){
                return (
                    <Grid item xs={12}>
                            <label className={styles.txt}>{component.bold ? applyBold(component.label) : component.label}</label>        
                    </Grid>
                )
            }
                
        });
    }

    const applyBold = (txt) => {
        return (<b>{txt} </b>);
    }

    const [isLoadingData,setLoadingData] = React.useState(false)

    const layout = ({title, description, components}) => {
        return (
            <Grid container xs={12} spacing={3}>
              
                <Grid item xs={12} className = {styles.description}>
                    <label>{data.description}</label>
                </Grid>
                {
                    layoutComponents(components)
                }
                <Grid item xs={12} className = {styles.error}>
                    <label>{error}</label>
                </Grid>
                 <Grid item xs={12} >
                    {isLoadingData ? <LinearProgress style={{ margin: '15px', width: '100%' }} /> : ''}
                    <Button variant="contained" className={styles.save} onClick={onSave}>Save</Button>
                </Grid>
            </Grid>
        )
    }

    const layoutExisting = ({title, description, components}) => {
        return (
            <Grid container xs={12} spacing={3}>
              
                <Grid item xs={12} className = {styles.description}>
                    <label>{data.description}</label>
                </Grid>
                {
                    existingLayoutComponents(components)
                }
                 <Grid item xs={12} >
                    <Button variant="contained" className={styles.disconnect} onClick={onDisconnect}>Disconnect</Button>
                </Grid>
            </Grid>
        )
    }



    return (
        <div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-descriptionribedby="transition-modal-descriptionription"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography class variant="h6" component="h2">
                            {data?.name}
                            <Divider />
                        </Typography>
                        {
                            modalContentsByType[data.name] ?  data?.auth_details.connection =='yes' ? 
                                                                        layoutExisting(modalContentsByType[data.name]):layout(modalContentsByType[data.name]) : ''
                        }

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
