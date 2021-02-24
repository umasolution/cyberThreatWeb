import { Container, Grid, LinearProgress, makeStyles, TextField,Typography,Box,
ListItem,ListItemIcon,ListItemText,List,ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,
Slider,
Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,
Card,CardActionArea,CardActions,CardContent,CardMedia,Radio,RadioGroup,FormLabel,Chip,Icon
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tab from '@material-ui/core/Tab';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MySnackbar from "../../Shared/Snackbar/MySnackbar";
import CONSTANTS from "../../Util/Constants";
import isEmpty  from '../../Util/Util';
import Copy from "../../Util/Copy";
import CVETextField from './../CVE/CVEInput/CVETextField';
import './VuldbLogin.css';
import TabsData from './TabsData/TabsData';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import SearchBox from './../Search/SearchBoxVul/SearchBoxVul';
import MaterialTable from 'material-table';
import Pagination from '@material-ui/lab/Pagination';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ReactSpeedometer from "react-d3-speedometer"
import SendIcon from '@material-ui/icons/Send';
import ShowMoreText from "react-show-more-text";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import * as qs from 'query-string';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import Page from 'src/components/Page';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'inherit',
    },
    checkBoxes: {
        display: 'flex',
        alignItems: 'center',
        margin: '20px',
        textTransform: 'capitalize',
        justifyContent: 'space-between',
        width: '100%',
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
      margin: '38px auto',
      maxWidth: '100%',
      [theme.breakpoints.down('sm')]: {
        bottom: -90,
      },
      left:0,
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
    longTextStyle: {
      wordWrap: 'break-word',
      maxWidth: 1000,
    },
}));

export const VuldbLogin = (/* {   } */) => {
    
    const classes = useStyles();
    const [tabIndex, setTabIndex] = useState(0);
    const [loadingTabs, setLoadingTabs] = useState(false);
    const [tabsName, setTabsName] = useState([]);
    const [tabsData, setTabsData] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const { feedType } = useParams();
    const [reportTypes, setReportTypes] = useState([]);
    const [cveInput, setCVEInput] = useState("");
    const [page, setPage] = useState(1);
    const [offset, setOffset] = useState();
    const [perRow, setperRow] = useState(10);
    const [totalpages, setTotalpages] = useState();
    const [tabscolumns, setTabsColumns] = useState();
    const [tabsrows, setTabsRows] = useState();
    const [singlerows, setSingleRows] = useState();
    
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const keyword = params.get('keyword');
    const product = params.get('product');
    const vendor = params.get('vendor');

    const [selected, setSelected] = useState([]);
    const isSelected = (name) => selected.indexOf(name) !== -1;
    const [loadingRows, setloadingRows] = useState(false);
    const [keyworddata, setKeywordData] = useState(false);
    const [mainurl, setMainUrl] = useState();
    const [issearch, setisSearch] = useState(false);
    const [noresult, setNoResult] = useState(false);  

    const [fieldsData, setFieldsData] = useState();

    const [emptyData, setEmptyData] = useState(false);

    const aurl = new URL(Axios.defaults.baseURL);

    const apiparams = new URLSearchParams(aurl.search);

    const [apiurl, setApiUrl] = useState(apiparams);

    const [tagapiurl, setTagApiUrl] = useState(apiparams);

    const [chipData, setChipData] = useState([]);

    const [isSearchLoading, setIsSearchLoading] = React.useState(false);

    const handleChipDelete = (chipToDelete) => () => {
      chipData.splice(chipToDelete, 1);
      let newSelected = [];
      newSelected = newSelected.concat(chipData);
      setChipData(newSelected);
    };

    useEffect(() => {
        fetchFeed();
    }, [feedType]);

    const fetchFeed = async () => {
        try {
            setLoadingTabs(true);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA);
            setisSearch(true);
            var url = `/vuln/list`;
            setMainUrl('/vuln/list');
            setApiUrl(apiparams);
            let response = await Axios.get(url);
            setTabsData(response.data);
            setTabsColumns(response.data.columns);
            setTabsRows(response.data.results);
            setperRow(response.data.rowlimit);
            let totalpages = Math.ceil(response.data.total/perRow);
            setTotalpages(totalpages);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_SUCCESS);
            setLoadingTabs(false);
            setisSearch(false);
        } catch (error) {
            console.error(error);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_FAILED);
            setLoadingTabs(false);
            setisSearch(false);
        }

        try {
            setLoadingTabs(true);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA);
            var url = `/vuln`;
            let response = await Axios.get(url);
            setFieldsData(response.data);
            /*console.log(response.data);
            return ;*/
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_SUCCESS);
            setLoadingTabs(false);
        } catch (error) {
            console.error(error);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_FAILED);
            setLoadingTabs(false);
        }
    }

    const callApi = async () => {
        setloadingRows(false);
        setIsSearchLoading(true);
        setSingleRows();
        setisSearch(true);
        setNoResult(true);
        apiurl.delete('offset');
        apiurl.delete('limit');        
        var url = `${mainurl}?${apiurl.toString()}`;
        let response = await Axios.get(url);
        if(response) {
          setTabsData(response.data);
          setPage(1);
          let totalpages = Math.ceil(response.data.total/perRow);
          setTotalpages(totalpages);
          setperRow(response.data.rowlimit);
          setisSearch(false);
          setIsSearchLoading(false);                      
        } else { 
           setEmptyData(true);
           setIsSearchLoading(false); 
        }
    }

    const handleChangePage = async (event, value) => {
        setloadingRows(false);
        setSingleRows();
        setisSearch(true);
        let Offset = ((value-1)*perRow)+1;
        apiurl.set('offset', Offset);
        apiurl.set('limit', perRow);
        var url = `${mainurl}?${apiurl.toString()}`;
        let response = await Axios.get(url);
        setPage(value);
        setTabsData(response.data);
        setisSearch(false);
        let totalpages = Math.ceil(response.data.total/perRow);
        setTotalpages(totalpages);
    };

    const handleClickRow = async (event, value) => {
        let url = `/search/cve?cve=${value}`;
        /*const url = `/single-searchcve.php?asds=edd3ddads&cve=${value}`;*/
        setloadingRows(false);
        setSingleRows();
        setloadingRows(true);
        let response = await Axios.get(url);
        setSingleRows(response.data);
        const selectedIndex = selected.indexOf(value);
        let newSelected = [];
        newSelected = newSelected.concat([], value);
        setSelected(newSelected);

    };  

    const handleChangeSlider = async (event, value) => {
        let slidervalue = 0;
        apiurl.delete('offset');
        apiurl.delete('limit');
        apiurl.delete('severity');
        if(value==1){
          slidervalue = 'LOW';
          apiurl.set('severity', slidervalue);
        } else if(value==2){
          slidervalue = 'MEDIUM';
          apiurl.set('severity', slidervalue);
        } else if(value==3){
          slidervalue = 'HIGH';
          apiurl.set('severity', slidervalue);
        } 
        setloadingRows(false);
        setSingleRows();
        setisSearch(true);
        setNoResult(true);
        var url = `${mainurl}?${apiurl.toString()}`;
        let response = await Axios.get(url);
        setTabsData(response.data);
        setPage(1);
        let totalpages = Math.ceil(response.data.total/perRow);
        setTotalpages(totalpages);
        setperRow(response.data.rowlimit);
        setisSearch(false);
    };

    const [selectvector, setSelectvector] = useState([]);
    
    const handleChangeRemote = async (event, value) => {
        const checked = event.target.checked;
        const checkedValue = event.target.value;
        const checkedName = event.target.name;
        setloadingRows(false);
        setSingleRows();
        setisSearch(true);
        setNoResult(true);
        apiurl.delete('offset');
        apiurl.delete('limit');
        apiurl.delete('accessVector', checkedValue);
        if(checkedValue=='local'){
          if(checked){
            selectvector.push(checkedValue);
          } else {
            apiurl.delete('accessVector', checkedValue);
            var index = selectvector.indexOf(checkedValue);
            delete selectvector[index];
          }
        } else if(checkedValue=='network'){
           if(checked){
            selectvector.push(checkedValue);
          } else {
            apiurl.delete('accessVector', checkedValue);
            var index = selectvector.indexOf(checkedValue);
            delete selectvector[index];
          }
        } 
        setSelectvector(selectvector);
        const myList = (
          selectvector.map((item, i) => apiurl.append('accessVector', item))
        )
        setApiUrl(apiurl);
        var url = `${mainurl}?${apiurl.toString()}`;
        let response = await Axios.get(url);
        setTabsData(response.data);
        setPage(1);
        let totalpages = Math.ceil(response.data.total/perRow);
        setTotalpages(totalpages);
        setperRow(response.data.rowlimit);
        setisSearch(false);
    };  

    const [selectradio, setSelectradio] = useState([]);

    const handleChangeRadio = async (event, value) => {
        const product = event.target.value;
        const typename = value;
        setloadingRows(false);
        setSingleRows();
        setisSearch(true);
        setNoResult(true);
        apiurl.delete('offset');
        apiurl.delete('limit');
        apiurl.delete('accessVector');
        apiurl.set('type', typename);
        apiurl.set('product', product);
        setApiUrl(apiurl);
        var url = `${mainurl}?${apiurl.toString()}`;
        let response = await Axios.get(url);
        setTabsData(response.data);
        setPage(1);
        let totalpages = Math.ceil(response.data.total/perRow);
        setTotalpages(totalpages);
        setperRow(response.data.rowlimit);
        setisSearch(false);
    }  

    
    const handleChange = (event, newValue) => {
        setTabIndex(newValue);
    };

    const getTabs = () => {
        if (tabsName && tabsName.length > 0) {
            return tabsName.map(tab => {
                return <Tab label={tab} key={tab} />
            })
        }
    }

    const fetchFeedData = async (data, tabIndexParams, reportType) => {
        const url = `${data.uri}`;
        const response = await Axios.get(url);
        if (response.data) {
            const copy = Copy(tabsData);
            const copyData = copy.find(d => d['report type'] === reportType);
            const orginalData = copyData.results.find((d) => d.appName === data.appName);
            orginalData.tableData = response.data;
            const linkColumn = orginalData.tableData.columns[0];
            linkColumn.render = (rowData) => {
                return <Link target="_blank" to={`/CVE/${rowData.cve_id}`}>{rowData.cve_id}</Link>
            }
            setTabsData(copy);
        }
    }

    const expandPanel = (event, expanded, tabData, reportType) => {
        if (expanded && !tabData.tableData) {
            fetchFeedData(tabData, tabIndex, reportType);
        }
    }

    const handleCheckBoxChange = (event, type) => {
        const copy = Copy(tabsData);
        const report = copy.find(data => data['report type'] === type);
        if (report) {
            report.isShowing = event.target.checked;
            setTabsData(copy);
        }

    }

    const handleClick = (event) => {
      apiurl.delete('offset');
      apiurl.delete('limit'); 
      apiurl.delete('type');
      apiurl.delete('language'); 
      apiurl.delete('product'); 
      apiurl.delete('severity');
      apiurl.delete('accessvector');
      const regex5 = /([^:\s]+):([^:\s]+)/g;
      const regex = new RegExp(regex5,'i');
      chipData.forEach(function (value, index, array) {
          let m = regex.exec(value);    
          var regexcve = /cve-/;
          var regexcve2 = /CVE-/;
          if(m){
            if(m[1]=='language'){
              apiurl.set('type', 'language');
              apiurl.set('product', m[2]);
            } else if(m[1]=='advisory') {
              apiurl.set('type', 'advisory');
              apiurl.set('product', m[2]);
            } else if(m[1]=='platform') {
              apiurl.set('type', 'platform');
              apiurl.set('product', m[2]);
            } else if(m[1]=='plugin') {              
              apiurl.set('type', 'plugin');
              apiurl.set('product', m[2]);
            } else if(m[1]=='severity') {
              apiurl.set('severity', m[2]);
            } else if(m[1]=='accessvector') {
              apiurl.set('accessvector', m[2]);
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

        tagapiurl.delete('language'); 
        tagapiurl.delete('advisory'); 
        tagapiurl.delete('platform');
        tagapiurl.delete('plugin');
        tagapiurl.delete('severity');
        tagapiurl.delete('accessvector');

        chipData.forEach(function (value, index, array) {
            let m = regex.exec(value);    
            var regexcve = /cve-/;
            var regexcve2 = /CVE-/;
            if(m){
              if(m[1]=='language'){
                tagapiurl.set('language', m[2]);
              } else if(m[1]=='advisory') {
                tagapiurl.set('advisory', m[2]);
              } else if(m[1]=='platform') {
                tagapiurl.set('platform', m[2]);
              } else if(m[1]=='plugin') {              
                tagapiurl.set('plugin', m[2]);
              } else if(m[1]=='severity') {
                tagapiurl.set('severity', m[2]);
              } else if(m[1]=='accessvector') {
                tagapiurl.set('accessvector', m[2]);
              } 
            }
        })


        const split_cveInput = cveInput.split("OR");
        split_cveInput.forEach(function (value, index, array) {
            let m = regex.exec(value);    
            var regexcve = /cve-/;
            var regexcve2 = /CVE-/;
            if(m){
              if(m[1]=='language'){
                if(tagapiurl.has('language') === true || tagapiurl.has('advisory') === true || tagapiurl.has('platform') === true || tagapiurl.has('plugin') === true) {
                  alert('You can add only language or advisory or platform or plugin');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'language:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('language', m[2]);
                }
              } else if(m[1]=='advisory') {
                if(tagapiurl.has('language') === true || tagapiurl.has('advisory') === true || tagapiurl.has('platform') === true || tagapiurl.has('plugin') === true) {
                  alert('You can add only language or advisory or platform or plugin');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'advisory:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('advisory', m[2]);
                }
              } else if(m[1]=='platform') {
                if(tagapiurl.has('language') === true || tagapiurl.has('advisory') === true || tagapiurl.has('platform') === true || tagapiurl.has('plugin') === true) {
                  alert('You can add only language or advisory or platform or plugin');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'platform:'+m[2]);                  
                  setChipData(newSelected);
                  tagapiurl.set('platform', m[2]);
                }
              } else if(m[1]=='plugin') {
                if(tagapiurl.has('language') === true || tagapiurl.has('advisory') === true || tagapiurl.has('platform') === true || tagapiurl.has('plugin') === true) {
                  alert('You can add only language or advisory or platform or plugin');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'plugin:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('plugin', m[2]);
                }
              } else if(m[1]=='severity') {
                if(tagapiurl.has('severity') === true) {
                  alert('Already added Severity');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'severity:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('severity', m[2]);
                }
              } else if(m[1]=='accessvector') {
                if(tagapiurl.has('accessvector') === true) {
                  alert('Already added AccessVector');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'accessvector:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('accessvector', m[2]);
                }
              } 
            }
        })        
        setTagApiUrl(tagapiurl);
        setCVEInput('');
        
    }
    
   }
 
    const severitys = [
      {
        value: 0,
        label: 'All',
      },
      {
        value: 1,
        label: 'Low',
      },
      {
        value: 2,
        label: 'Medium',
      },
      {
        value: 3,
        label: 'High',
      }
    ];

     const [expand, setExpand] = useState(false);
     const onShowMore = () => {
        setExpand(!expand);
     };

   
   

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
                  <Table stickyHeader aria-label="sticky table" className={loadingRows?'small-table':'big-table'}>
                    {issearch?(<>
                      <TableHead>
                      <TableRow>
                          
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
                  {!isEmpty(tabsData.results)?(<>
                  <TableHead>
                      <TableRow>
                        {
                          Object.keys(tabsData.columns).map((key, i) => (
                            tabsData.columns[key].field!='pub_date'?(<><TableCell  key={tabsData.columns[key].field}>
                               {tabsData.columns[key].field!='pub_date'?tabsData.columns[key].title:''}   
                            </TableCell></>):''   
                            
                          ))
                        }  
                        <TableCell key='action'>
                           Action
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                          Object.values(tabsData.results).map((row) => {
                            const isItemSelected = isSelected(row[`cve_id`])
                          return (<TableRow hover onClick={event => handleClickRow('key',row[`cve_id`])} key={row[`cve_id`]} role="checkbox" selected={isItemSelected} tabIndex={-1} >

                                {Object.keys(tabsData.columns).map((vkey) => (
                                tabsData.columns[vkey].field!='pub_date'?
                                 <>
                                 <TableCell key={tabsData.columns[vkey].field}>
                                      {vkey==0 ? (
                                        <>
                                         <Box flexWrap="wrap">
                                            <Typography
                                              variant="h5"
                                              color="textSecondary"
                                            >
                                              {row[`${tabsData.columns[vkey].field}`] }
                                            </Typography>
                                            {row[`pub_date`]? <> <Typography
                                              variant="h6"
                                              color="textSecondary"
                                              className="pub-date-column"
                                            >
                                            {moment(row[`pub_date`]).format('MMM DD, YYYY')}
                                            </Typography> </>:''}

                                         </Box>
                                        </>
                                    )  : <Box className={classes.longTextStyle}>{row[`${tabsData.columns[vkey].field}`]}</Box>}
                                  </TableCell>
                                 </> 
                                :''
                                )
                                )}
                                <TableCell key='action'>
                                  <Box flexWrap="wrap">
                                     <Link target="_blank" to={`/CVE/${row['cve_id']}`}> <VisibilityIcon/> View full Details</Link>
                                  </Box>   
                                </TableCell>
                            </TableRow>
                          ) }
                          )
                        }  
                    </TableBody>
                    </>):(<TableBody><TableRow><TableCell colSpan={6} style={{ textAlign:'center' }}><Typography variant="h4" component="p">
                                        Not results Found
                                      </Typography></TableCell></TableRow></TableBody>)}
                    </>)}
                  </Table>
                </TableContainer>
              </Paper>
            {isEmpty(tabsData.results) ? '':(<><Pagination color="primary" count={totalpages} page={page} onChange={handleChangePage} /></>)}
          </Box>
        </Grid>
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

   const capitalizeFirstLetter = (str) =>  {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    
   const expansionFields = () => {
      return(
        <>
          {Object.entries(fieldsData.panel).map((key, i) => (
            <Grid
                display="flex"
                flexDirection="column"
                className="cvesearchseverity"
                borderRadius={16}                
                xs={12}
                md={3}
              >
            <ExpansionPanel
                  style={{ width: '100%' }}
                > 
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header{key[1].title}"
                  >
                  <Typography variant="h3"  id="severity-slider-custom" component="h2">
                       {key[1].title}
                  </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                     <Box
                        display="flex"
                        flexDirection="column"
                        className="cvesearchslider"
                        borderRadius={16}
                      >
                      <List>
                      <RadioGroup aria-label={key[0]} name={key[0]} onChange={(e) => handleChangeRadio(e,key[0])}>
                        {Object.values(key[1].values).map((vkey, vi) => (<>

                          {vkey?<FormControlLabel value={vkey} control={<Radio />} label={capitalizeFirstLetter(vkey)} />:''}
                           </>))
                          }
                        </RadioGroup>
                      </List>
                      </Box>
                  </ExpansionPanelDetails>
             </ExpansionPanel>
          </Grid> 
         ))} 
        </>
      )
   }

   const getFieldData = () => {
     return (
       <>
        <Grid
            item
            xs={12}
            md={12}
            className="cvesearchleft"
          > 
            <Grid className="boxleftheader" >
              {fieldsData ? '':''}
              <Grid 
                  xs={12}
                  md={3}
                  display="flex"
                  flexDirection="column"
                  className="cvesearchseverity"
                  borderRadius={16}
                >
              <ExpansionPanel
                    style={{ width: '100%' }}
                    expanded="false"
                  > 
                  <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                    <Typography variant="h3"  id="severity-slider-custom" component="h2">
                         Severity
                    </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                       <Box
                          display="flex"
                          flexDirection="column"
                          className="cvesearchslider"
                          borderRadius={16}
                        >
                          <Slider
                            defaultValue={0}
                            aria-labelledby="severity-slider-custom"
                            step={1}
                            onChange={handleChangeSlider}
                            min={0}
                            max={3}
                            marks={severitys}
                          />
                        </Box>
                    </ExpansionPanelDetails>
               </ExpansionPanel>
            </Grid>  
            <Grid
              xs={12}
              md={3}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              className="cvesearchremote"
              borderRadius={16} 
            >
            
            <ExpansionPanel
                    style={{ width: '100%' }}
                    expanded="false"
                  > 
                  <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="accessvector-content"
                      id="accessvector-header"
                    >
                    <Typography variant="h3"  id="accessvector-slider-custom" component="h2">
                         AccessVector
                    </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                       <List>
                           <ListItem>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps="local"
                                  name="accessVector"
                                  value="local" 
                                  onChange={handleChangeRemote}
                                />
                              </ListItemIcon>
                              <ListItemText id="local" primary="Local" />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps="network"
                                  value="network" 
                                  name="accessVector"
                                  onChange={handleChangeRemote}
                                />
                              </ListItemIcon>
                              <ListItemText id="network" primary="Network" />
                            </ListItem>
                            </List>
                    </ExpansionPanelDetails>
               </ExpansionPanel>
            
            
            </Grid>
            </Grid>
          </Grid>
        </>
     )
   }

    const getTabsData = () => {
        return (
            <>
              {loadingRows ?cvesearchcenter(tabsData,8):cvesearchcenter(tabsData,12)}
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
                          <Box className="boxdetailhead">
                              <Box className="boxdetailtitle">
                                  <Typography gutterBottom variant="h5" component="h2">
                                    Severity Scores
                                  </Typography>
                              </Box> 
                              <Box className="boxtitlecontent">     
                                {singlerows.severity ? (
                                  <> <Typography variant="body2" color="textSecondary" component="div" className="scoreblock-div">
                                    
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
                                </>
                                ): ''}

                                {singlerows.niah_meter ? (
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
                                  ) :''}
                              </Box> 
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
                                    Valnerability Snapshot
                                  </Typography>
                              </Box> 
                              <Box className="boxtitlecontent"> 
                                <Typography variant="body2" color="textSecondary" component="div">
                                <List component="ul" className="snapshotlist">
                                  {Object.entries(singlerows.snapshot).map((snapshot) => (
                                    <>
                                    {snapshot[1] ? (
                                     <> 
                                     {snapshot[0]=="Description" ? (
                                      <ListItem>
                                        <ListItemText>
                                        <Box className="snapshot-title">{snapshot[0]} :  </Box>
                                        <Box className="snapshot-content description"><ShowMoreText
                                          lines={3}
                                          more={"Read More"}
                                          less={"Less More"}
                                          onClick={onShowMore}
                                          expanded={expand}
                                          maxWidth={500}
                                        >
                                          {snapshot[1]}
                                        </ShowMoreText></Box>
                                        </ListItemText>
                                      </ListItem>
                                      ): <ListItem>
                                        <ListItemText>
                                        {snapshot[0]=="publishedDate" ? (<>
                                        <Box className="snapshot-title">Published Date: </Box>
                                        <Box className="snapshot-content">{moment(snapshot[1]).format('MMM DD, YYYY')}</Box></>):
                                        ( <>
                                        <Box className="snapshot-title">{snapshot[0]} : </Box>
                                        <Box className="snapshot-content">{snapshot[1]}</Box>
                                        </>)}
                                        </ListItemText>
                                      </ListItem>}
                                    </> ): ''} 
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
              
              </Grid> 
              </>) :''}
         </>
        )
    }

    const getLoader = () => {
        if (loadingTabs) {
            return <LinearProgress style={{ margin: '15px' }} />
        }
        return null;
    }

    const updateSnackbar = (open, message) => {
        setSnackbarOpen(open);
        setSnackbarMessage(message)
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
                  placeholder="Search for a advisory:value, language:value, platform:value, plugin:value, severity:value, accessvector:value..."
                />
                <button onClick={addTagClick} className={classes.searchButton}>Add</button>
                </Box>
                {Object.keys(Object.fromEntries(apiurl)).length > 0 ? (<Box maxWidth="lg" className={classes.chipbar}>
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

    return (
        <Page
          title="Vulnerabilities DB - Niah Security"
        >
        <Container style={{ paddingLeft: '0px', paddingRight: '0px', maxWidth: 'unset' }} maxWidth="lg">
            <Grid style={{ width: '100%' }} container spacing={1} className="vuldb-login">
                {loadingTabs ? getLoader() : null}
                {getSearchBox(chipData)}
                <Container maxWidth className="cveresult">
                  
                   <Grid
                        container
                        spacing={3}
                        className={classes.container}
                      >   
                      { noresult ? getTabsData() : (tabsData.total > 0 ? getTabsData(): getTabsData())}
                  </Grid>
                </Container>
                <MySnackbar closeSnackbar={() => updateSnackbar(false, '')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />
            </Grid>
        </Container>
        </Page>
    );
};

export default VuldbLogin;