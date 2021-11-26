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

export default function TransitionsModal({ openModal, name, onClose }) {
    const styles = useStyles();
    const [open, setOpen] = React.useState(openModal);

    useEffect(() => {
        setOpen(openModal);
    }, [openModal])
    const handleOpen = () => setOpen(open);
    const handleClose = () => onClose(false);

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
        title: "Quay",
        desc : "Enter your account credentials below to connect Niah to your Quay account.",
        components: [{ label: "Username", type: 'txt' }, { label: "Password", type: 'txt' }, { label: "Container registry name", type: 'txt' }]
    };
    modalContentsByType['GitHub'] = {
        title: "GitHub",
        desc : "Enter your account credentials below to connect Niah to your Gitub account.",
        components: [{ label: "Personal Access Token", type: 'txt' }]
    };
    modalContentsByType['DigitalOcean'] = {
        title: "DigitalOcean",
        desc : "Enter your account credentials below to connect Niah to your DigitalOcean account.",
        components: [{ label: "Personal Access Token", type: 'txt' }]
    };
    modalContentsByType['Google Artifact Registry'] = {
        title: "Google Artifact Registry",
        desc : "Enter the registry hostname and a service account JSON key file which Niah should use to connect to your Google Artifact Registry account.",
        components: [{ label: "Artifact Registry hostname", type: 'txt' }, { label: "JSON key file", type: 'txt' }]
    };
    modalContentsByType['Heroku'] = {
        title: "Heroku",
        desc : "Enter your account credentials below to connect Niah to your Heroku account. See our Heroku integration documentation for details about generating an API key.",
        components: [{ label: "API Key", type: 'txt' }]
    };
    modalContentsByType['Google Artifact Registry'] = {
        title: "Google Artifact Registry",
        desc : "Enter the registry hostname and a service account JSON key file which Niah should use to connect to your Google Artifact Registry account.",
        components: [{ label: "Artifact Registry hostname", type: 'txt' }, { label: "JSON key file", type: 'txt' }]
    };
    modalContentsByType['Cloud Foundry'] = {
        title: "Cloud Foundry",
        desc : "Enter your account credentials below to connect NIah to your Cloud Foundry account.",
        components: [{ label: "You can find out your Cloud Foundry API URL by typing the following command:", type: 'lbl' }, 
                     { label: "$ cf api", type: 'lbl', bold:true },
                     { label: "API endpoint: https://api.example.com (API version: 2.2.0)", type: 'lbl', bold:true  },
                     { label: "API URL", type: 'txt' },
                     { label: "Username", type: 'txt' },
                     { label: "Password", type: 'txt' }]
    };
    
    modalContentsByType['Pivotal Web Services'] = {
        title: "Pivotal Web Services",
        desc : "Enter your account credentials below to connect Niah to your Pivotal Web Services account.",
        components: [{ label: "Username", type: 'txt' }, { label: "Password", type: 'txt' },]
    };

    modalContentsByType['AWS Lambda'] = {
        title: "AWS Lambda",
        desc : "Enter IAM ARN below to connect Niah to your AWS Lambda account. See our AWS Lambda integration documentation for details about generating IAM ARN.",
        components: [{ label: "ARN", type: 'txt' }, { label: "External ID", type: 'txt' }]
    };

    modalContentsByType['Azure Function'] = {
        title: "Azure Functions",
        desc : "Enter your account credentials below to connect Niah to your Azure Functions account. See our Azure Functions integration documentation for details about generating account credentials.",
        components: [{ label: "Service Principal Name ('Client ID')", type: 'txt' }, { label: "Service Principal Password ('Secret')", type: 'txt' }, 
                    { label: "Tenant ('Domain')", type: 'txt' }]
    }

    modalContentsByType['BitBucket'] = {
        title: "BitBucket",
        desc : "Enter your account credentials below to connect Niah to your BitBucket account.",
        components: [{ label: "Username", type: 'txt' }, { label: "App Password", type: 'txt' },]
    };

    modalContentsByType['Azure Repos'] = {
        title: "Azure Repos",
        desc : "Enter your account credentials below to connect Snyk to your Azure Repos account.",
        components: [{ label: "Organization", type: 'txt' }, { label: "Personal access token", type: 'txt' },]
    };

    const layoutComponents = (components) => {
        return components.map(component => {
            if(component.type == 'txt'){
                return (
                    <Grid item xs={12}>
                            <TextField className={styles.txt} label={component.label} variant="outlined"
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
