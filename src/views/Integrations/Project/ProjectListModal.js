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

    const onClickConnector = async (connector, fromSearch) => {
        setLoading(true);

        setSelectedConnector(connector);

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
        dispatch(updateSelectedProject({ project: project, mode: event.target.checked.toString() }));
    }

    const onCheckTag = (event,project,tag) => {
        dispatch(updateSelectedTag({ project: project, mode: event.target.checked.toString(),tag }))
    }

    const onPublish = async () => {
        const url = "/publish/projects";
        let response = await Axios.post(url, { data: connectedRepos.data });

        onClose(true);
    }

    const getContentBasedOnConnector = () => {
        if (!connectorClicked)
            return '';

        return (
            <Grid container spacing={1} className={styles.contents}>
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
                <Grid item xs={12} className={styles.description}>
                    <label>{connectedRepos.caption_text}</label>
                </Grid>


                {connectedRepos.data.map(repo => (
                    <Grid item xs={3} className={styles.description}>
                        <div className={styles.flex}>
                            <input type='checkbox' className={styles.repoCheck} checked={(repo.mode === 'true')} onClick={event => onCheckProject(event, repo)} />
                            <label>{repo[connectedRepos.display_header]}</label>
                            <TransitionsPopper callback={getPopOverData} data={repo} />
                        </div>
                        <Grid container spacing={1} className={styles.content}>
                            <Grid item xs={12} className={styles.description,styles.flex}>

                                {
                                    repo.details.tags.map(tag => (
                                        (<Grid item xs={2} >
                                            <div style={{display:'flex'}}>
                                                <input type='checkbox' className={styles.repoCheck} 
                                                                        checked={(repo.available_tags.indexOf(tag) != -1)} 
                                                                        onClick={event => onCheckTag(event,repo, tag)} />
                                                <div style={{marginTop:'-3px'}}>{tag}</div>
                                            </div>
                                            
                                        </Grid>)
                                    ))
                                }

                            </Grid>
                        </Grid>
                    </Grid>
                )
                )}

                <Grid item xs={12} className={styles.description}>
                    <Button className={styles.search} onClick={onPublish} >Publish</Button>
                </Grid>
            </Grid>
        )

    }

    const getPopOverData = (data) => {
        return (
            <div>
                <div>Creation Date : {data.creation_date}</div>
                <div>Description : {data.details.description}</div>
                <div>Kind : {data.details.kind}</div>
                <div>Label : {data.details.label}</div>
                <div>Language : {data.details.language}</div>
                <div>Name : {data.details.name}</div>
                <div>Namespace : {data.details.namespace}</div>
                <div>Project : {data.details.project}</div>
                <div>Scan Project : {data.details.scan_project}</div>
                <div>Target : {data.details.target}</div>
            </div>
        )
    }

    const getLoader = () => {
        if (loading) {
            return <LinearProgress style={{ margin: '15px' }} />
        }
        return null;
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
                                    <Card className="card" className={styles.connector} onClick={() => onClickConnector(connector)}>


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
