import * as React from 'react';
import { useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField, Divider, makeStyles, LinearProgress } from '@material-ui/core';
import { Component } from '@fullcalendar/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { filterRepoByText, setConnectedRepos, setConnectorList, setIntegrations, updateSelectedProject, updateSelectedTag } from 'src/actions/integrationActions';
import {
    Card,
    CardContent,
    CardHeader
} from '@material-ui/core';
import { useHistory } from 'react-router';
import InfoIcon from '@material-ui/icons/Info';
import TransitionsPopper from 'src/components/TransitionPopper';
import AdvisoryTabNav from './AdvisoryTabNav';




const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    bgcolor: 'background.paper',
    roundedCorner: '5px',
    boxShadow: 10,

    p: 4,
}

const useStyles = makeStyles(theme => ({
    txt: {
        width: '100%'
    },
    description: {
        marginTop: '10px'
    },
    save: {
        backgroundColor: 'rgb(25, 118, 210)',
        color: 'rgb(255, 255, 255)'
    },
    error: {
        color: 'red'
    },
    disconnect: {
        backgroundColor: 'rgb(211, 47, 47)',
        color: 'rgb(255, 255, 255)'
    },
    lbl: {
        fontStyle: 'bold'
    },
    center: {

        textAlign: 'center'

    },
    connector: {
        width: '10%',
        height: '150px',
        cursor: 'pointer'
    },
    txt: {
        width: '100%'
    },
    description: {
        marginTop: '10px'
    },
    content: {
        marginTop: '10px'
    },
    contents: {
        marginTop: '10px',
        height:'300px',
        overflowY: 'scroll'
    },
    repoCheck: {
        marginRight: '10px'
    },
    search: {
        backgroundColor: 'rgb(25, 118, 210)',
        color: 'rgb(255, 255, 255)'
    },
    img: {
        height: '100px',
        marginLeft: 'auto',
        marginRight: 'auto',
        display: 'block'
    },
    flex: {
        display: 'flex'
    },
    tag:{
        marginTop : '-30px',
        marginLeft : '15px'
    }
}));

export default function AdvisoryModal({ open, onClose }) {

    const dispatch = useDispatch();

    const styles = useStyles();
    const history = useHistory();

    const connectorList = useSelector(state => state.integrations.connectorList);
    const connectedRepos = useSelector(state => state.integrations.filteredRepo);

    const [fade, setOpen] = React.useState(open);
    const [loading, setLoading] = useState(false);
    const [connectorClicked, setConnectorClicked] = useState(false);
    const [searchTxt, setSearchTxt] = useState('');


    const handleClose = () => {
        onClose();

    }

   

    const getLoader = () => {
        if (loading) {
            return <LinearProgress style={{ margin: '15px' }} />
        }
        return null;
    }



    return (
        <div style={{height:'100%'}}>

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
                height = "300vh"
               
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Grid container spacing={1} >



                           <AdvisoryTabNav />
                        </Grid>
                     
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
