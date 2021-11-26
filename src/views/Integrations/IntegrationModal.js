import * as React from 'react';
import { useEffect } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField, Divider, makeStyles } from '@material-ui/core';



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
    desc: {
        marginTop:'10px'
    },
    save:{
        backgroundColor : 'rgb(25, 118, 210)',
        color:'rgb(255, 255, 255)'
    }
}));

export default function TransitionsModal({ openModal, name }) {
    const styles = useStyles();
    const [open, setOpen] = React.useState(openModal);

    useEffect(() => {
        setOpen(openModal);
    }, [openModal])
    const handleOpen = () => setOpen(open);
    const handleClose = () => setOpen(false);

    const modalContentsByType = [];

    modalContentsByType['GitLab'] = {
        title: "GitLab",
        desc : "Enter your account credentials below to connect Niah to your Gitlab account",
        components: [{ label: "Personal Access Token", type: 'txt' }]
    };

    modalContentsByType['Docker'] = {
        title: "Docker",
        desc : "Enter your account credentials below to connect Niah to your Docker account",
        components: [{ label: "Username", type: 'txt' }, { label: "Access Token", type: 'txt' }]
    };

    modalContentsByType['GCR'] = {
        title: "GCR",
        desc : "Enter the registry hostname and a service account JSON key file which Niah should use to connect to your GCR account.",
        components: [{ label: "GCR Hostname", type: 'txt' }, { label: "JSON Key file", type: 'txt' }]
    };

    modalContentsByType['ECR'] = {
        title: "ECR",
        desc : "Enter the Region and Role ARN which Niah should use to connect to your ECR account.",
        components: [{ label: "AWS Region", type: 'txt' }, { label: "Role ARN", type: 'txt' }]
    };

    modalContentsByType['ACR'] = {
        title: "ACR",
        desc : "Enter your account credentials below to connect Niah to your ACR account.",
        components: [{ label: "Username", type: 'txt' }, { label: "Password", type: 'txt' }, { label: "Container registry name", type: 'txt' }]
    };
    modalContentsByType['Quay'] = {
        title: "ACR",
        desc : "Enter your account credentials below to connect Niah to your Quay account.",
        components: [{ label: "Username", type: 'txt' }, { label: "Password", type: 'txt' }, { label: "Container registry name", type: 'txt' }]
    };

    const layoutComponents = (components) => {
        return components.map(component => {
            return (
                <Grid item xs={12}>
                        <TextField className={styles.txt} label={component.label} variant="outlined"
                                />
                       
                </Grid>
            )
        });
    }

    const layout = ({title, desc, components}) => {
        return (
            <Grid container xs={12} spacing={3}>
              
                <Grid item xs={12} className = {styles.desc}>
                    <label>{desc}</label>
                </Grid>
                {
                    layoutComponents(components)
                }
                 <Grid item xs={12} >
                    <Button variant="contained" className={styles.save} >Save</Button>
                </Grid>
            </Grid>
        )
    }



    return (
        <div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
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
                            {modalContentsByType[name]?.title}
                            <Divider />
                        </Typography>
                        {
                            modalContentsByType[name] ? layout(modalContentsByType[name]) : ''
                        }

                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
