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
import MachineContent from './MachineContent';



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

export default function MachineModal({ openModal, data, onClose, group }) {
    const styles = useStyles();
    const [open, setOpen] = React.useState(openModal);
    const [cloned,setCloned] = React.useState({...data});
    const dispatch = useDispatch();

    useEffect(() => {
        setOpen(openModal);
       
    }, [openModal])
    const handleOpen = () => setOpen(open);
    const handleClose = () => onClose(false);





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
                      <MachineContent />
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
