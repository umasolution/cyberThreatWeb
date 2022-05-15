import * as React from 'react';
import { useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import Box from '@material-ui/core/Box';
import Modal from '@material-ui/core/Modal';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Grid, TextField, Divider, makeStyles, LinearProgress,List,ListItem, ListItemText } from '@material-ui/core';
import { Component } from '@fullcalendar/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import Axios from 'axios';
import { filterRepoByText, setConnectedRepos, setConnectorList, setIntegrations, updateSelectedProject, updateSelectedSpecialCase, updateSelectedTag } from 'src/actions/integrationActions';
import {
    Card,
    CardContent,
    CardHeader
} from '@material-ui/core';
import { useHistory } from 'react-router';
import InfoIcon from '@material-ui/icons/Info';
import TransitionsPopper from 'src/components/TransitionPopper';




const style = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '90%',
    overflowY : "hidden",
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
        height: '300px',
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
    tag: {
        marginTop: '-30px',
        marginLeft: '15px'
    },
    list : {
       
        marginRight : '20px'
    },
    outline :{
        border : '1px solid blue'
    }
}));

export default function ProjectModal({ open, onClose }) {

    const dispatch = useDispatch();

    const styles = useStyles();
    const history = useHistory();

    const connectorList = useSelector(state => state.integrations.connectorList);
    const connectedRepos = useSelector(state => state.integrations.filteredRepo);

    const [fade, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false);
    const [connectorClicked, setConnectorClicked] = useState(false);
    const [searchTxt, setSearchTxt] = useState('');
    const [status, setStatus] = React.useState(false);


    const handleClose = () => {
        onClose();
    }

    useEffect(() => {
        setOpen(open);
        if (open) {
            const connectors = getConnectorList();
            console.log(connectors);
        }
    }, [open]);

    const getConnectorList = async () => {
        const url = "/integration/add/lists";
        let response = await Axios.post(url);

        dispatch(setConnectorList(response.data));

    }

    const [search_api_with, setSearchAPIWith] = useState('');
    const [selectedConnector, setSelectedConnector] = useState('');
    const [outline, setOutline] = useState(false)

    const checkStatus = async(application) => {
        const statusResponse = await Axios.post('http://niahsecurity.online/api/connectors/check', {application});

        if(statusResponse.data.status != "1"){
            setStatus(true);
        }
    }

    const onClickConnector = async (connector, fromSearch) => {
        setLoading(true);
        setStatus(false);
        setOutline(true)
        setSelectedConnector(connector);

       const status = await checkStatus(connector.application)

        const url = "/projects/details";
        let connectorClone = '';
        if (fromSearch && search_api_with) {
            /// const searchDetail = {[search_api_with]:searchTxt};
            connectorClone = { ...connector }
            connectorClone[search_api_with] = searchTxt;
        } else {
            connectorClone = connector
        }

        let response = await Axios.post(url, connectorClone);

        setLoading(false);
        setConnectorClicked(true);

        setSearchAPIWith(response.data.search_api_with);

        dispatch(setConnectedRepos(response.data))
    }

    const onSearch = () => {
        console.log(selectedConnector);
        if (selectedConnector && search_api_with != undefined) {
            onClickConnector(selectedConnector, true);
        }
        dispatch(filterRepoByText(searchTxt));

    }


    const onCheckProject = (event, project) => {
        console.log(event);
        if(project.conn_type == 'machines'){
            dispatch(updateSelectedSpecialCase(project.projectname));
        }else{
            dispatch(updateSelectedProject({ project: project, mode: event.target.checked.toString() }));
        }
        
    }

    const onCheckSpecialTag = (event, selectedSystem, tag) => {
        console.log(event);
        dispatch(updateSelectedSpecialCase(tag));
    }

    const onCheckTag = (event, project, tag) => {
        dispatch(updateSelectedTag({ project: project, mode: event.target.checked.toString(), tag }))
    }

    const onPublish = async () => {
        const url = "/publish/projects";
        let response = undefined;

        if(connectedRepos.application == 'gcp_kubernetes' || connectedRepos.application == 'machines'){
          response   = await Axios.post(url, connectedRepos);
        }else{
            response = await Axios.post(url, {data:connectedRepos.data});
        }
       

        onClose(true);
    }


    const getContentBasedOnConnector = () => {
        if (!connectorClicked)
            return '';

        return (
            <Grid container spacing={1} >
                <Grid item xs={11}>
                    <TextField className={styles.txt}
                        variant="outlined"
                        label={connectedRepos.search_text}
                        onChange={event => setSearchTxt(event.target.value)}
                        value={searchTxt}
                    />

                </Grid>
                <Grid item xs={1} className={styles.description}>
                    <Button variant="contained" className={styles.search} onClick={onSearch}>Search</Button>
                </Grid>
                <Grid item xs={12} className={styles.contents}>

                    <Grid item xs={12} className={styles.description}>
                        <label>{connectedRepos.caption_text}</label>
                    </Grid>

                    <Grid item xs={12} className = {styles.flex}>
                    {connectedRepos.application == "gcp_kubernetes"  ? getSpecialLayOut() : getRegularLayout()}
                    </Grid>

                </Grid>
                <Grid item xs={12} className={styles.description}>
                    <Button className={styles.search} onClick={onPublish} >Publish</Button>
                    {
                        status ? <span style= {{margin : '5px', color:'red'}}> Token or credentials has expired. Please check. </span>: ""
                    }
                </Grid>
            </Grid>
        )

    }

    const getPopOverData = (data) => {
        return (
       
            <div>
                {
                    Object.entries(data).map(([key, value]) => {
                        if(typeof value != 'string'){
                            return;
                        }
                        return (<div>{splitAndSpaceStr(key)} : {value} </div>)
                    })
                }
            </div>
        )
    }

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
      }
    
    const splitAndSpaceStr = (str) => {
        return str.split('_').length > 1 ? capitalizeFirstLetter(str.split('_')[0])+' '+capitalizeFirstLetter(str.split('_')[1]) : capitalizeFirstLetter(str);
    }

    const getLoader = () => {
        if (loading) {
            return <LinearProgress style={{ margin: '15px' }} />
        }
        return null;
    }

    const [selectedSystem, setSelectedSystem] = useState('default');


    const getSpecialLayOut = () => {
        console.log(connectedRepos)
        return (
            <Grid xs={12} item className={styles.flex}>
                <Grid xs={2} item className={styles.list}>

                    {Object.entries(connectedRepos.data).map(([key, value]) => {
                        return (<List sx={style} component="nav" aria-label="mailbox folders">
                                    <ListItem button onClick={()=>setSelectedSystem(key)}>
                                        <ListItemText primary={key} />
                                        </ListItem>
                                        <Divider />
                                    </List>)
                    }
                    )}

                </Grid>
                <Grid xs={10} item>
                    {
                        connectedRepos.data[selectedSystem].map(sys => {
                            return (<div style={{ display: 'flex' }}>
                                <input type='checkbox' className={styles.repoCheck} 
                                onClick={event => onCheckSpecialTag(event, selectedSystem, sys.pod_name)}
                                checked={(connectedRepos.available_tags.indexOf(sys.pod_name) != -1)}/>


                                <div style={{ marginTop: '-3px' }}>{sys.pod_name}</div>
                                <TransitionsPopper callback={getPopOverData} data={sys} />
                            </div>
                            )
                        })
                    }
                </Grid>

            </Grid>
                )
    }


    const getRegularLayout = () => {
      if(!connectedRepos.data){
          return;
      }

        return connectedRepos.data.map(repo => (
                <Grid item xs={4} className={styles.description} style={{margin:'10px'}}>
                    <div className={styles.flex}>
                        <input type='checkbox' className={styles.repoCheck} checked={connectedRepos.application == 'machines' ? 
                                                    (repo.available_tags.indexOf(repo.projectname) != -1):(repo.mode === 'true')} onClick={event => onCheckProject(event, repo)} />
                        <label>{repo[connectedRepos.display_header]}</label>
                        <TransitionsPopper callback={getPopOverData} data={repo.details} />
                    </div>
                    <Grid container spacing={1} className={styles.content}>
                        <Grid item xs={12} className={`${styles.description} ${styles.flex}`}>

                            {
                                repo.details.tags.map(tag => (
                                    (<Grid item xs={2} >
                                        <div style={{ display: 'flex' }}>
                                            <input type='checkbox' className={styles.repoCheck}
                                                checked={(repo.available_tags.indexOf(tag) != -1)}
                                                onClick={event => onCheckTag(event, repo, tag)} />
                                            <div style={{ marginTop: '-3px' }}>{tag}</div>
                                        </div>

                                    </Grid>)
                                ))
                            }

                        </Grid>
                    </Grid>
                </Grid>
                )
                )
    }

                const imgMap = [];
                imgMap['azure_function'] = 'Azure Function';
                imgMap['aws_lambda'] = 'AWS Lambda';
                imgMap['github'] = 'Github';
                imgMap['bitbucket'] = 'BitBucket';
                imgMap['gitlab'] = 'GitLab';
                imgMap['heroku'] = 'Heroku';
                imgMap['docker'] = 'Docker';
                imgMap['gcr'] = 'GCR';
                imgMap['ecr'] = 'ECR';
                imgMap['acr'] = 'ACR';
                imgMap['quay'] = 'Quay';
                imgMap['github_container'] = 'Github';
                imgMap['digitalocean'] = 'DigitalOcean';
                imgMap['google_artifact_registry'] = 'Google Artifact Registry';

                return (
                <div>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-descriptionribedby="transition-modal-descriptionription"
                        open={fade}
                        onClose={handleClose}
                        closeAfterTransition
                        BackdropComponent={Backdrop}
                        BackdropProps={{
                            timeout: 500,
                        }}

                    >
                        <Fade in={fade}>
                            <Box sx={style}>
                                <Grid container spacing={1} >
                                    {
                                        connectorList.map(connector => (
                                            <Card  className={outline && selectedConnector.application == connector.application ? `${styles.connector} ${styles.outline} card` :
                                            `${styles.connector}  card`
                                               } onClick={() => onClickConnector(connector)}>


                                                <div>
                                                    <img className={styles.img} src={"/static/integrations/" + imgMap[connector.application] + ".png"} onError={(e) => e.target.src = "/static/integrations/GitLab.png"} />

                                                </div>
                                                <div className={styles.center}>
                                                    {connector.application}
                                                </div>



                                            </Card>
                                        ))
                                    }
                                </Grid>
                                {loading ? getLoader() : getContentBasedOnConnector()}
                            </Box>
                        </Fade>
                    </Modal>
                </div>
                );
}
