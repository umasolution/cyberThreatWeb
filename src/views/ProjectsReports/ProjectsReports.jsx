import {
    Box, Container, Grid,List, LinearProgress, makeStyles, Typography, ExpansionPanel, ExpansionPanelSummary,
    ListItem, ListItemIcon, ListItemText, ExpansionPanelDetails, Divider, Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,TextField,Chip,Tooltip,Text,CircularProgress
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import authService from 'src/services/authService';
import { useParams, Link } from 'react-router-dom';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CONSTANTS from "../../Util/Constants";
import MySnackbar from "../../Shared/Snackbar/MySnackbar";
import Copy from '../../Util/Copy';
import isEmpty  from '../../Util/Util';
import { setDateFormat } from '../../Util/Util';
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { getBackgroundColorBySeverity, getFontColorBySeverity } from '../../Util/Util';
import './ProjectsReports.css';
import moment from 'moment';
import Page from 'src/components/Page';
import clsx from 'clsx';



import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'inherit', // theme.palette.background.paper,
        paddingLeft: '16px !important',
        paddingRight: '16px !important',
    },
    cardsearch:{
      boxShadow: 'none',
      backgroundColor: 'initial'
    },
     expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: 'rotate(180deg)',
    },
    projectHeader: {
        color: theme.palette.primary.light
    },
    panelMainDiv: {
        border: '1px solid',
        borderRadius: '10px',
        padding: '10px',
        marginBottom: '5px'
    },
    checkBoxes: {
        display: 'inline',
        margin: '0 10px 10px 0',
        textTransform: 'capitalize'

    },
    chip: {
      margin: theme.spacing(0.5),
    },
    searchbar: {
      backgroundColor: theme.palette.background.light,
      maxWidth:1180,
      background: '#fff url(/static/bg_searchbar.png)',
      padding:'35px 0px',
      boxShadow:'4px 0px 54px rgba(0,0,0,0.1)',
      borderRadius: 5,
      [theme.breakpoints.down('sm')]: {
        padding:'15px 10px',
      },
    },
    searchBox: {
      marginTop: 0,
      maxWidth:1015,
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: '#fff',
      boxShadow:'4px 0px 27px rgba(0,0,0,0.08)',
      height:62,
      borderRadius:50,
      border:'1px solid #e8e8f2',
      padding:8,
      color:'#000',
      position: 'relative',
      '& > div' : {
        paddingLeft: 20,
      }
    },
    searchbarArea: {
      width: '100%',
      bottom: -70,
      margin: '30px auto',
      maxWidth: '100%',
      [theme.breakpoints.down('sm')]: {
        bottom: -90,
      },
      left:0,
      paddingLeft:10,
      paddingRight:10,
      marginTop:5,
    },
    searchButton: {
      backgroundColor:'#ff0476',
      padding:'0 !important',
      textAlign: 'center',
      width: 176,
      height: 45,
      lineHeight: '45px',
      color: '#fff',
      borderRadius: 50,
      fontWeight: theme.fontfamily.bold,
      fontFamily: '"Montserrat",sans-serif',
      letterSpacing: '1px',
      border:0,
      fontSize:'16px',
    },
    chippaper : {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      listStyle: 'none',
      padding: theme.spacing(0.5),
      margin: 0,
      boxShadow: 'none',
    },
    chipbar : {
      width: '100%',
      bottom: -70,
      margin: '10px auto',
      maxWidth: '100%',
      [theme.breakpoints.down('sm')]: {
        bottom: -90,
      },
      left:0,
    },
    customizedButton: {
     
    }
}));

const ProjectsReports = () => {
    const classes = useStyles();

    const [loading, setLoading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [projectListResponse, setProjectListResponse] = useState();
    const [tabsData, setTabsData] = useState([]);
    const [tabsRows, setTabsRows] = useState([]);
    const [totalpages, setTotalpages] = useState();
    const [tabsColumns, setTabsColumns] = useState();
    const [loadingRows, setloadingRows] = useState(false);
    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState();
    const [perRow, setperRow] = useState(10);
    const [singlerows, setSingleRows] = useState();
    const [issearch, setisSearch] = useState(false);
    const [noresult, setNoResult] = useState(false);
    const [mainurl, setMainUrl] = useState();
    
    const [cveInput, setCVEInput] = useState("");

    const [selected, setSelected] = useState([]);
    const isSelected = (name) => selected.indexOf(name) !== -1;


    const aurl = new URL(Axios.defaults.baseURL);
    const apiparams = new URLSearchParams(aurl.search);
    const [apiurl, setApiUrl] = useState(apiparams);
    const [tagapiurl, setTagApiUrl] = useState(apiparams);

    const [chipData, setChipData] = useState([]);

    const [isSearchLoading, setIsSearchLoading] = React.useState(false);

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleChipDelete = (chipToDelete) => () => {
      chipData.splice(chipToDelete, 1);
      let newSelected = [];
      newSelected = newSelected.concat(chipData);
      setChipData(newSelected);
    };

    const searchFields = [
        "type",
        "scanner",
        "projectname",
        "docker",
        "label",
        "repoType",
        "system_os",
        "system_ip",
        "system_name",
        "os_version",
        "language",
        "installer_type",
        "repository",
        "scan_project",
        "domainname",
        "cms"
    ];

    const [selecttype, setSelecttype] = useState([]);

    useEffect(() => {
        fetchProjectsList();
    }, []);

    const fetchProjectsList = async () => {
        try {
            setLoading(true);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA);
            /*console.log(authService);
            return;*/
            const url = "/projects";
            let response = await Axios.post(url);
            setMainUrl(url);
            setApiUrl(apiparams);
            // check response exist
            setTabsData(response.data);
            setTabsColumns(response.data.columns);
            setTabsRows(response.data.results);
            setTabsRows(response.data.results);
            setperRow(response.data.rowlimit);
            let totalpages = Math.ceil(response.data.total/perRow);
            setTotalpages(totalpages);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_SUCCESS);
            setLoading(false);
        } catch (error) {
            console.error(error);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_FAILED);
            setLoading(false);
        }
    }

    

    const updateSnackbar = (open, message) => {
        setSnackbarOpen(open);
        setSnackbarMessage(message)
    }

    const getLoader = () => {
        if (loading) {
            return <LinearProgress style={{ margin: '15px' }} />
        }
        return null;
    }

    const handleChangePage = async (event, value) => {
        setloadingRows(false);
        setSingleRows();
        setisSearch(true);
        let Offset = ((value-1)*perRow)+1;
        apiurl.set('offset', Offset);
        apiurl.set('limit', perRow);
        var url = `${mainurl}?${apiurl.toString()}`;
        let response = await Axios.post(url);
        setPage(value);
        setTabsData(response.data);
        setisSearch(false);
        let totalpages = Math.ceil(response.data.total/perRow);
        setTotalpages(totalpages);
    };

    const handleClickRow = async (event, value) => {
        setloadingRows(false);
        setSingleRows();
        setloadingRows(true);
        const optiondata = tabsData.results[value].option.scan_insights;
        tabsData.results[value].option.scan_insights = [];
        tabsData.results[value].option.scan_insights.date = optiondata.date;
        tabsData.results[value].option.scan_insights.data = optiondata.data;
        tabsData.results[value].option.scan_insights.severity = optiondata.severity;
        tabsData.results[value].option.scan_insights.vulnerabilities = optiondata.vulnerabilities;
        tabsData.results[value].option.scan_insights.reportname = optiondata.reportname;
        setSingleRows(tabsData.results[value].option);
        const selectedIndex = selected.indexOf(value);
        let newSelected = [];
        newSelected = newSelected.concat([], value);
        setSelected(newSelected);

    };

    const handleRemoveRow = async (event, value) => {
        setloadingRows(false);
        setSingleRows(false);
        setloadingRows(false);
        
        const selectedIndex = selected.indexOf(value);
        let newSelected = [];
        newSelected = newSelected.concat([], []);
        setSelected(newSelected);

    };

    const callApi = async () => {
        setloadingRows(false);
        setIsSearchLoading(true);
        setSingleRows();
        setisSearch(true);
        setNoResult(true);
        apiurl.delete('offset');
        apiurl.delete('limit');        
        var url = `${mainurl}`;
        let response = await Axios.post(url,Object.fromEntries(apiurl));        
        setTabsData(response.data);
        setPage(1);
        let totalpages = Math.ceil(response.data.total/perRow);
        setTotalpages(totalpages);
        setperRow(response.data.rowlimit);
        setisSearch(false);
        setIsSearchLoading(false); 
    }

    const deletestring = () => {
        Object.entries(searchFields).map(([key, row],index) => {
            apiurl.delete(row);
        })
    }

    const deleteTagstring = () => {
        Object.entries(searchFields).map(([key, row],index) => {
            tagapiurl.delete(row);
        })
    }

    const apiSetUrls = (name,value) => {
        Object.entries(searchFields).map(([key, row],index) => {
            
            if(name == row) {
              apiurl.set(row, value);
            }
        })
    }

    const apiSetTagUrls = (name,value) => {
        Object.entries(searchFields).map(([key, row],index) => {
           
            if(name == row) {
              tagapiurl.set(row, value);
            }
        })
    }

    const setChipTag = (name,value) => {
        Object.entries(searchFields).map(([key, row],index) => {
            if(name == row) {
              if(tagapiurl.has(row) === true) {
                alert(`Already added ${row}`);
              } else {
                let newSelected = [];
                newSelected = newSelected.concat(chipData, `${row}:${value}`);
                setChipData(newSelected);
                tagapiurl.set(row, value);
              }
            }
        })
    }

    const handleClick = (event) => {
      apiurl.delete('offset');
      apiurl.delete('limit'); 
      apiurl.delete('type');
      apiurl.delete('scanner');
      apiurl.delete('projectname');
      apiurl.delete('docker');
      apiurl.delete('label');
      apiurl.delete('repoType');
      apiurl.delete('system_os');
      apiurl.delete('system_ip');
      apiurl.delete('system_name');
      apiurl.delete('os_version');
      apiurl.delete('language');
      apiurl.delete('installer_type');
      apiurl.delete('repository');
      apiurl.delete('scan_project');
      apiurl.delete('domainname');
      apiurl.delete('cms');
      const regex5 = /([^:\s]+):([^:\s]+)/g;
      const regex = new RegExp(regex5,'i');
      chipData.forEach(function (value, index, array) {
          let m = regex.exec(value);    
          var regexcve = /cve-/;
          var regexcve2 = /CVE-/;
          if(m){
            if(m[1]=='type') {
              apiurl.set('type', m[2]);
            } else if(m[1]=='scanner') {
              tagapiurl.set('scanner', m[2]);
            } else if(m[1]=='projectname') {
              tagapiurl.set('projectname', m[2]);
            } else if(m[1]=='docker') {
              tagapiurl.set('docker', m[2]);
            } else if(m[1]=='label') {
              tagapiurl.set('label', m[2]);
            } else if(m[1]=='repoType') {
              tagapiurl.set('repoType', m[2]);
            } else if(m[1]=='system_os') {
              tagapiurl.set('system_os', m[2]);
            } else if(m[1]=='system_ip') {
              tagapiurl.set('system_ip', m[2]);
            } else if(m[1]=='system_name') {
              tagapiurl.set('system_name', m[2]);
            } else if(m[1]=='os_version') {
              tagapiurl.set('os_version', m[2]);
            } else if(m[1]=='language') {
              tagapiurl.set('language', m[2]);
            } else if(m[1]=='installer_type') {
              tagapiurl.set('installer_type', m[2]);
            } else if(m[1]=='repository') {
              tagapiurl.set('repository', m[2]);
            } else if(m[1]=='scan_project') {
              tagapiurl.set('scan_project', m[2]);
            } else if(m[1]=='domainname') {
              tagapiurl.set('domainname', m[2]);
            } else if(m[1]=='cms') {
              tagapiurl.set('cms', m[2]);
            } 
          }
      })
      callApi();
    }  

    const keyPress = (event) => {
      if (event.keyCode === 13) {
        onSearchClicked();
      }
    }
    const addTagClick = (event) => {
        onSearchClicked();
     }

    const handleChangeCVE = (event) => {
      setCVEInput(event.target.value);
    }

    const onSearchClicked = () => {
      if (cveInput) {
        const regex5 = /([^:\s]+):([^:\s]+)/g;
        const regex = new RegExp(regex5,'i');

        tagapiurl.delete('type');
        tagapiurl.delete('scanner'); 
        tagapiurl.delete('projectname'); 
        tagapiurl.delete('docker'); 
        tagapiurl.delete('label'); 
        tagapiurl.delete('repoType'); 
        tagapiurl.delete('system_os'); 
        tagapiurl.delete('system_ip'); 
        tagapiurl.delete('system_name'); 
        tagapiurl.delete('os_version'); 
        tagapiurl.delete('language'); 
        tagapiurl.delete('installer_type'); 
        tagapiurl.delete('repository');  
        tagapiurl.delete('scan_project'); 
        tagapiurl.delete('domainname');
        tagapiurl.delete('cms');  

       

        chipData.forEach(function (value, index, array) {
            let m = regex.exec(value);    
            var regexcve = /cve-/;
            var regexcve2 = /CVE-/;
            if(m){
              if(m[1]=='type') {
                tagapiurl.set('type', m[2]);
              } else if(m[1]=='scanner') {
                tagapiurl.set('scanner', m[2]);
              } else if(m[1]=='projectname') {
                tagapiurl.set('projectname', m[2]);
              } else if(m[1]=='docker') {
                tagapiurl.set('docker', m[2]);
              } else if(m[1]=='label') {
                tagapiurl.set('label', m[2]);
              } else if(m[1]=='repoType') {
                tagapiurl.set('repoType', m[2]);
              } else if(m[1]=='system_os') {
                tagapiurl.set('system_os', m[2]);
              } else if(m[1]=='system_ip') {
                tagapiurl.set('system_ip', m[2]);
              } else if(m[1]=='system_name') {
                tagapiurl.set('system_name', m[2]);
              } else if(m[1]=='os_version') {
                tagapiurl.set('os_version', m[2]);
              } else if(m[1]=='language') {
                tagapiurl.set('language', m[2]);
              } else if(m[1]=='installer_type') {
                tagapiurl.set('installer_type', m[2]);
              } else if(m[1]=='repository') {
                tagapiurl.set('repository', m[2]);
              } else if(m[1]=='scan_project') {
                tagapiurl.set('scan_project', m[2]);
              } else if(m[1]=='domainname') {
                tagapiurl.set('domainname', m[2]);
              } else if(m[1]=='cms') {
                tagapiurl.set('cms', m[2]);
              } 
              
            }
        })


        const split_cveInput = cveInput.split("OR");
        split_cveInput.forEach(function (value, index, array) {
            let m = regex.exec(value);    
            var regexcve = /cve-/;
            var regexcve2 = /CVE-/;
            if(m){
              if(m[1]=='type') {
                if(tagapiurl.has('type') === true) {
                  alert('Already added Type');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'type:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('type', m[2]);
                }
              } else if(m[1]=='scanner') {
                if(tagapiurl.has('scanner') === true) {
                  alert('Already added scanner');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'scanner:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('scanner', m[2]);
                }
              }  else if(m[1]=='projectname') {
                if(tagapiurl.has('projectname') === true) {
                  alert('Already added projectname');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'projectname:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('projectname', m[2]);
                }
              } else if(m[1]=='docker') {
                if(tagapiurl.has('docker') === true) {
                  alert('Already added docker');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'docker:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('docker', m[2]);
                }
              } else if(m[1]=='label') {
                if(tagapiurl.has('label') === true) {
                  alert('Already added label');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'label:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('label', m[2]);
                }
              } else if(m[1]=='repoType') {
                if(tagapiurl.has('repoType') === true) {
                  alert('Already added repoType');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'repoType:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('repoType', m[2]);
                }
              } else if(m[1]=='system_os') {
                if(tagapiurl.has('system_os') === true) {
                  alert('Already added System Os');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'system_os:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('system_os', m[2]);
                }
              } else if(m[1]=='system_ip') {
                if(tagapiurl.has('system_ip') === true) {
                  alert('Already added System ip');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'system_ip:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('system_ip', m[2]);
                }
              } else if(m[1]=='system_name') {
                if(tagapiurl.has('system_name') === true) {
                  alert('Already added System Name');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'system_name:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('system_name', m[2]);
                }
              } else if(m[1]=='system_name') {
                if(tagapiurl.has('system_name') === true) {
                  alert('Already added System Name');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'system_name:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('system_name', m[2]);
                }
              } else if(m[1]=='os_version') {
                if(tagapiurl.has('os_version') === true) {
                  alert('Already added Os Version');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'os_version:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('os_version', m[2]);
                }
              } else if(m[1]=='language') {
                if(tagapiurl.has('language') === true) {
                  alert('Already added Language');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'language:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('language', m[2]);
                }
              } else if(m[1]=='installer_type') {
                if(tagapiurl.has('installer_type') === true) {
                  alert('Already added Installer Type');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'installer_type:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('installer_type', m[2]);
                }
              } else if(m[1]=='repository') {
                if(tagapiurl.has('repository') === true) {
                  alert('Already added Repository');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'repository:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('repository', m[2]);
                }
              } else if(m[1]=='scan_project') {
                if(tagapiurl.has('scan_project') === true) {
                  alert('Already added Scan Project');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'scan_project:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('scan_project', m[2]);
                }
              } else if(m[1]=='domainname') {
                if(tagapiurl.has('domainname') === true) {
                  alert('Already added Domain Name');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'domainname:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('domainname', m[2]);
                }
              } else if(m[1]=='cms') {
                if(tagapiurl.has('cms') === true) {
                  alert('Already added CMS');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'cms:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('cms', m[2]);
                }
              }        
            }
        })        
        setTagApiUrl(tagapiurl);
        setCVEInput('');
    }
   }
    
   const cvesearchcenter = (tabsData,col) => {

    return (
      <>
      <Grid
          item
          xs={12}          
          md={col}
          className="cvesearchcenter"
        >
          <Box position="relative">
          <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table" className={loadingRows?'big-table':'big-table'}>
                    <colgroup>
                        <col style={{width:'15%'}}/>
                        <col style={{width:'15%'}}/>
                     </colgroup>
                    {issearch?(<>
                      <TableHead>
                      <TableRow>
                          <TableCell key='active'>
                             <Skeleton animation="wave" height="20px" width="100%" />
                          </TableCell>
                          <TableCell key='active'>
                            <Skeleton animation="wave" height="20px" width="100%" />
                          </TableCell>
                          <TableCell key='active'>
                             <Skeleton animation="wave" height="20px" width="100%" />
                          </TableCell>
                          <TableCell key='active'>
                             <Skeleton animation="wave" height="20px" width="100%" />
                          </TableCell>
                          <TableCell key='active'>
                             <Skeleton animation="wave" height="20px" width="100%" />
                          </TableCell>
                        </TableRow>
                    </TableHead><TableBody>
                      <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                       <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow> 
                    </TableBody>
                      
                </>):(<> 
                  {!isEmpty(tabsData.results)?(<> <TableHead>
                      <TableRow>
                        {
                          Object.keys(tabsData.columns).map((key, i) => (
                            <><TableCell key={tabsData.columns[key].field}>
                               {tabsData.columns[key].title}   
                            </TableCell></>  
                            
                          ))
                        }  
                      </TableRow>
                    </TableHead>
                    <TableBody>
                       {
                          Object.entries(tabsData.results).map(([rkey, row]) => {
                            const isItemSelected = isSelected(rkey)
                          return (<TableRow hover onClick={event => handleClickRow('key',rkey)} key={rkey} role="checkbox" selected={isItemSelected} tabIndex={-1} >

                                { Object.keys(tabsData.columns).map((vkey) => (
                                 <TableCell key={tabsData.columns[vkey].field} >
                                      { tabsData.columns[vkey].field == 'vulnerability' ? (
                                        <>
                                         <Box className="scoreblock-vulnerabilities-div">
                                         {Object.entries(row.table[`${tabsData.columns[vkey].field}`]).map((vulnerabilities) => (
                                            <Box className={`scoreblock MuiGrid-grid-xs-3 ${vulnerabilities[0]}`}>
                                            <Box className="scoreblock-inner">
                                            <Box className="scoretitle">
                                              {vulnerabilities[0]}                                              
                                            </Box>
                                            <Box className="scorevalue" bgcolor={getBackgroundColorBySeverity(vulnerabilities[0])}>
                                              {vulnerabilities[1]?vulnerabilities[1]:'0'}                                              
                                            </Box>
                                            </Box>
                                            </Box>
                                           ))}
                                          </Box>  
                                        </>
                                    ) : '' }
                                    { tabsData.columns[vkey].field == 'project_details' ? (
                                        <>
                                         <Box className="projectdetails-div" flexWrap="wrap">
                                         {Object.entries(row.table[`${tabsData.columns[vkey].field}`]).map((projectdetails) => (
                                            <Box className={projectdetails[0]}>
                                              {!isEmpty(tabsData.colors[projectdetails[0]])?(projectdetails[0]=='Name'?<Tooltip title={projectdetails[0]}><Chip
                                                label={projectdetails[1]}
                                                className={classes.chip}
                                                color="secondary"
                                                size="small"
                                                 style={{
                                                 backgroundColor : tabsData.colors[projectdetails[0]]}}
                                              /></Tooltip>:''):(projectdetails[0]=='Name'?
                                                  <Tooltip title={projectdetails[0]}><span>{projectdetails[1]}</span></Tooltip>:'')
                                                  }
                                            </Box>
                                           ))}
                                           {Object.entries(row.table[`${tabsData.columns[vkey].field}`]).map((projectdetails) => (
                                            <Box className={projectdetails[0]}>
                                              {!isEmpty(tabsData.colors[projectdetails[0]])?(projectdetails[0]!='Name'?<Tooltip title={projectdetails[0]}><Chip
                                                label={projectdetails[1]}
                                                className={classes.chip}
                                                color="secondary"
                                                size="small"
                                                 style={{
                                                 backgroundColor : tabsData.colors[projectdetails[0]]}}
                                              /></Tooltip>:''):(projectdetails[0]!='Name'?
                                                  <Tooltip title={projectdetails[0]}><span>{projectdetails[1]}</span></Tooltip>:'')
                                                  }
                                            </Box>
                                           ))}
                                          </Box>  
                                        </>
                                    ) : '' }
                                    { tabsData.columns[vkey].field == 'report_details' ? (
                                        <>
                                         <Box className="reportdetails-div"  display="flex" flexWrap="wrap">
                                         {Object.entries(row.table[`${tabsData.columns[vkey].field}`]).map((reportdetails) => (
                                            <Box >
                                              {!isEmpty(tabsData.colors[reportdetails[0]])?<Tooltip title={reportdetails[0]}><Chip
                                                label={reportdetails[1]}
                                                className={classes.chip}
                                                size="small"
                                                color="secondary"
                                                 style={{
                                                 backgroundColor : tabsData.colors[reportdetails[0]]}}
                                              /></Tooltip>:(<Tooltip title={reportdetails[0]}><span>{reportdetails[1]}</span></Tooltip>)}
                                            </Box>
                                           ))}
                                          </Box>  
                                        </>
                                    ) : '' }
                                    { tabsData.columns[vkey].field == 'target_details' ? (
                                        <>
                                         <Box className="target_details-div"  display="flex" flexWrap="wrap">
                                         {Object.entries(row.table[`${tabsData.columns[vkey].field}`]).map((target_details) => (
                                          Object.entries(target_details[1]).map((targetdata) => (
                                            <Box >
                                              {!isEmpty(tabsData.colors[targetdata[0]])?<Tooltip title={targetdata[0]}><Chip
                                                label={targetdata[1]}
                                                className={classes.chip}
                                                size="small"
                                                color="secondary"
                                                 style={{
                                                 backgroundColor : tabsData.colors[targetdata[0]]}}
                                              /></Tooltip>:(<Tooltip title={targetdata[0]}><span>{targetdata[1]}</span></Tooltip>)}
                                            </Box>
                                            ))
                                           ))}
                                          </Box>  
                                        </>
                                    ) : '' }
                                    
                                  </TableCell>
                                )
                                )}
                            </TableRow>
                          ) }
                          )
                        } 
                    </TableBody></>) : (<TableBody><TableRow><TableCell colSpan={6} style={{ textAlign:'center' }}><Typography variant="h4" component="p">
                                        Not results Found
                                      </Typography></TableCell></TableRow></TableBody>)}</>)}
                  </Table>
                </TableContainer>
              </Paper>
            {isEmpty(tabsData.results) ? '':(<><Pagination color="primary" count={totalpages} page={page} onChange={handleChangePage} /></>)}
          </Box>
        </Grid>
      </>
     )
   }

   const getTabsData = () => {
        return (
            <>
              {loadingRows ?cvesearchcenter(tabsData,12):cvesearchcenter(tabsData,12)}
              {loadingRows ?(<>  
              <Grid
                item
                xs={12}
                md={4}
                className="cvesearchright"
              >
              <Box
                className="cvesearchright-inner"
                borderRadius={5}
              >
              {singlerows ? (
                    <>  
                        <Box className={classes.boxrightheader}
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          borderRadius={16}>
                          <IconButton className={classes.customizedButton}>
                            <HighlightOffIcon  onClick={handleRemoveRow}/>
                          </IconButton>
                          <Box className="boxdetailhead">
                              {singlerows.scan_insights ? (
                                <> 
                                <Box className="boxdetailtitle">
                                    <Typography gutterBottom variant="h5" component="h2">
                                     Scan Insights
                                    </Typography>
                                </Box> 
                                <Box className="boxtitlecontent"> 
                                <Typography variant="body2" color="textSecondary" component="div" className="scoreblock-div">
                                <List component="ul" className="snapshotlist">
                                  {Object.entries(singlerows.scan_insights).map((scan_insights) => (
                                    <>
                                    <ListItem>
                                        <ListItemText>
                                        {scan_insights[0]=='date' ? (<>
                                        <Box className="date-block">
                                        <Box className="snapshot-title">Report Date: </Box>
                                        <Box className="snapshot-content">{moment(setDateFormat(scan_insights[1])).format('MMM DD, YYYY')}</Box> </Box></>):''}
                                        {scan_insights[0]=='vulnerabilities' ? (<>
                                        <Box className="snapshot-content">
                                          <Box className="scoreblock-vulnerabilities-div">
                                            {Object.entries(scan_insights[1]).map((vulnerabilities) => (
                                              <>
                                              <Box className="scoreblock MuiGrid-grid-xs-3">
                                              <Box className="scoreblock-inner">
                                              <Box className="scoretitle">
                                                {vulnerabilities[0]}
                                              </Box>
                                              <Box className="scorevalue" bgcolor={getBackgroundColorBySeverity(vulnerabilities[0])}>
                                                {vulnerabilities[1]}
                                              </Box>
                                              </Box>
                                              </Box>
                                              </>
                                            ))}
                                          </Box>
                                      </Box>
                                      </>):''}
                                      {scan_insights[0]=='severity' ? (<> 
                                        <Box className="snapshot-content">
                                        <Box className="scoreblock-severity-div">
                                          {Object.entries(scan_insights[1]).map((severity) => (
                                            <>
                                            <Box className="scoreblock MuiGrid-grid-xs-3">
                                            <Box className="scoreblock-inner">
                                            <Box className="scoretitle">
                                              {severity[0]}
                                            </Box>
                                            <Box className="scorevalue" bgcolor={getBackgroundColorBySeverity(severity[0])}>
                                              {severity[1]}
                                            </Box>
                                            </Box>
                                            </Box>
                                            </>
                                          ))}
                                          </Box>
                                      </Box>
                                      </>):''}
                                         {scan_insights[0]=='data' ? (<>
                                        <Box className="snapshot-content data-block"> 
                                          {Object.entries(scan_insights[1]).map((data) => (
                                            <>
                                            <Box className="snapshot-block">
                                            <Box className="snapshot-title">{data[0]} : </Box>
                                            <Box className="snapshot-content">{data[1]}</Box>
                                            </Box>
                                            </>
                                          ))}
                                          </Box>
                                        </>):''}
                                        {scan_insights[0]=='reportname' ? (<>
                                           <Box className="view-report-btn">
                                          <a target="_blank" rel="noopener noreferrer" href={`/app/productsreports/${singlerows.scan_summary['Project Id']}/${scan_insights[1]}`}>View Report</a>
                                        </Box>
                                        </>):''}
                                      </ListItemText>
                                      </ListItem>                                
                                    </>
                                  ))}
                        
                                </List> 
                                  
                              </Typography>
                              </Box> 
                              </>
                              ): ''}
                          </Box>
                    </Box>
                    <Box className={classes.boxrightheader}
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          borderRadius={16}>
                          <Box className="boxdetailhead">
                            {singlerows.scan_summary ? (
                                <> 
                                <Box className="boxdetailtitle">
                                    <Typography gutterBottom variant="h5" component="h2">
                                     Project Summary
                                    </Typography>
                                </Box> 
                                <Box className="boxtitlecontent"> 
                                <Typography variant="body2" color="textSecondary" component="div" className="scoreblock-div">
                                <List component="ul" className="snapshotlist">
                                  {Object.entries(singlerows.scan_summary).map((scan_summary) => (
                                    
                                    scan_summary[0] == 'Project Created On' || scan_summary[0] == 'Project Updated On' ? (<>
                                        <ListItem>
                                        <ListItemText>
                                        <Box className="snapshot-title">{scan_summary[0]} : </Box>
                                        <Box className="snapshot-content">{moment(setDateFormat(scan_summary[1])).format('MMM DD, YYYY hh:mm a')}</Box>
                                      </ListItemText>
                                      </ListItem>  </>):(<><ListItem>
                                        <ListItemText>
                                        <Box className="snapshot-title">{scan_summary[0]} : </Box>
                                        <Box className="snapshot-content">{scan_summary[1]}</Box>
                                      </ListItemText>
                                      </ListItem></>)           
                                   
                                  ))}
                                </List> 
                                  
                              </Typography>
                              </Box> 
                              </>
                              ): ''}
                              
                          </Box>
                    </Box>
                    
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
              
              </Grid> 
              </>) :''}
         </>
        )
    }

    const getSearchBox = (chipData) => {
      return (
            <>
        <Container maxWidth="lg" className={classes.searchbarArea}>
             <Grid
                container
                spacing={0}
                className={classes.container}
              > 
              <Container maxWidth="lg" className={classes.searchbar}> 
                <Card className={classes.cardsearch}>
                  <CardHeader
                    action={
                      <IconButton
                        className={clsx(classes.expand, {
                          [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                      >
                        <ExpandMoreIcon />
                      </IconButton>
                    }
                    title="Search Criteria"
                  />
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                      
                <Box mt={3} mb={3}
                display="flex"
                justifyContent="center"
                alignItems="center"
               >  
                <Typography component="p" className="search-criteria">
                  <Chip
                    label="type:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  />
                  <Chip
                    label="scanner:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  />
                  <Chip
                    label="projectname:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  />
                  <Chip
                    label="docker:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  />
                  <Chip
                    label="label:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  /><Chip
                    label="repoType:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  /><Chip
                    label="system_os:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  /><Chip
                    label="system_ip:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  /><Chip
                    label="system_name:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  /><Chip
                    label="os_version:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  /><Chip
                    label="language:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  /><Chip
                    label="installer_type:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  /><Chip
                    label="repository:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  /><Chip
                    label="scan_project:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  /><Chip
                    label="domainname:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  /><Chip
                    label="cms:value"
                    size="small"
                    className={classes.chip}
                    color="secondary"
                  />
                   
                </Typography>
                </Box>
                    </CardContent>
                  </Collapse>
                </Card>
                 
                <Box mt={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  className={classes.searchBox}>

                  <TextField
                  required
                  value={cveInput}
                  onKeyDown={keyPress}
                  onChange={handleChangeCVE}
                  style={{
                    width: '100%',
                    color:'#000'
                  }}
                  id="cve"
                  placeholder="Search for a type:value"
                />
                <button onClick={addTagClick} className={classes.searchButton}>Add</button>
                </Box>
                {Object.keys(Object.fromEntries(apiurl)).length > 0  ? (<Box maxWidth="lg" className={classes.chipbar}>
                <Grid
                      container
                      spacing={0}
                      className={classes.container}
                    >
                   <Paper component="ul" className={classes.chippaper}>
                    {chipData ? Object.entries(chipData).map((data, i) => ( 
                        <li key={i}>
                          <Chip
                            label={data[1]}
                            onDelete={handleChipDelete(data[0])}
                            className={classes.chip}
                            color="secondary"
                          />
                        </li>
                    )) : ''}              
                    </Paper>
                    </Grid>
                    <Box
                        display="flex">
                        {isSearchLoading ? <Box m="auto">
                        <Typography  component="p" color="primary" style={{
                                                    textAlign: 'center'
                                                  }} >
                         <CircularProgress />
                         </Typography>
                         <button disabled className={classes.searchButton}>Search</button>
                        </Box> : <Box m="auto">
                         <button onClick={handleClick} className={classes.searchButton}>Search</button>
                        </Box>}
                      </Box>
                </Box>
                ): '' }
                
              </Container>
               </Grid> 
          </Container>
          
          </>
       )   
    }

    const cvenoresult = () => {
    return (
      <>
      
          <Grid
            item            
            xs={12}
            md={8}
            className="cvesearchcenter"
          >
            <Box position="relative">
            <Paper className={classes.root}>
                  <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                        <TableRow>
                          <TableCell>
                             <Skeleton animation="wave" height="20px" width="100%" />
                          </TableCell>
                          <TableCell >
                            <Skeleton animation="wave" height="20px" width="100%" />
                          </TableCell>
                          <TableCell >
                             <Skeleton animation="wave" height="20px" width="100%" />
                          </TableCell>
                          <TableCell >
                             <Skeleton animation="wave" height="20px" width="100%" />
                          </TableCell>
                          <TableCell >
                             <Skeleton animation="wave" height="20px" width="100%" />
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                       <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                          <TableCell><Skeleton animation="wave" height="40px" width="100%" /></TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Paper>
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            className="cvesearchright"
          >
          <Box className="boxleftheader"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            borderRadius={16}>
            <Box
              display="flex"
              flexDirection="column"
              className="cvesearchseverity"
              borderRadius={16}
            >
            <Skeleton animation="wave" height="20px" width="100%" />
            <Skeleton animation="wave" height="100px" width="100%" />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              className="cvesearchseverity"
              borderRadius={16}
            >
            <Skeleton animation="wave" height="20px" width="100%" />
            <Skeleton animation="wave" height="100px" width="100%" />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              className="cvesearchseverity"
              borderRadius={16}
            >
            <Skeleton animation="wave" height="20px" width="100%" />
            <Skeleton animation="wave" height="100px" width="100%" />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              className="cvesearchseverity"
              borderRadius={16}
            >
            <Skeleton animation="wave" height="20px" width="100%" />
            <Skeleton animation="wave" height="100px" width="100%" />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              className="cvesearchseverity"
              borderRadius={16}
            >
            <Skeleton animation="wave" height="20px" width="100%" />
            <Skeleton animation="wave" height="100px" width="100%" />
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              className="cvesearchseverity"
              borderRadius={16}
            >
            <Skeleton animation="wave" height="20px" width="100%" />
            <Skeleton animation="wave" height="100px" width="100%" />
            </Box>
          </Box>  
          </Grid>
      </>
     )
   }
    

    return (
    <Page
          
          title="My Scans"
        >
        <Container className={classes.root} maxWidth>
            <Grid
              container
              spacing={1}
              className="scan-report-list"
            >
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="left"
                  height="100%"
                  style={{ marginTop: '25px', width: '100%' }}
                >
                    {loading ? getLoader() : null}
                    <MySnackbar closeSnackbar={() => updateSnackbar(false, '')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />

                </Box>
                {getSearchBox(chipData)}
                <Container maxWidth className="cveresult">                  
                  <Grid
                        spacing={3}
                        container                        
                        className={classes.container}
                      >    
                      { noresult ? getTabsData() : (tabsData.total > 0 ? getTabsData(): cvenoresult())}
                  </Grid>
                </Container>
            </Grid>
        </Container>
        </Page>
    );
};

export default ProjectsReports;