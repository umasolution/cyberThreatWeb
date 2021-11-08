import { Container, Grid, LinearProgress, makeStyles, TextField,Typography,Box,
ListItem,ListItemIcon,ListItemText,List,ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails,
Slider,Drawer,
Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,
Card,CardActionArea,CardActions,CardContent,CardMedia,Radio,RadioGroup,FormLabel,Chip,Icon,CardHeader,Collapse,Button, Select, MenuItem
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tab from '@material-ui/core/Tab';
import Axios from 'axios';
import React, { useEffect, useState,useCallback } from 'react';
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
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import clsx from 'clsx';
import VulDrawerComponent from '../ProductDetailVul/VulDrawerComponent';
import { getBackgroundColorBySeverity, getFontColorBySeverity } from '../../Util/Util';
import { capitalCase } from 'change-case';

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
      margin: '20px auto',
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
    flexContainer: {
      display: 'flex',
      flexDirection: 'row',
      padding: 0,
    },
    cardsearch:{
      boxShadow: 'none',
      backgroundColor: 'initial'
    },
    advancecardsearch:{
      width: '70% !Important'
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
    input : {
      "&::placeholder": {
        textOverflow: "ellipsis !important",
        color: "white",


        fontSize: 14
      },
    },
    dragger: {
      width: '5px',
      cursor: 'ew-resize',
      padding: '4px 0 0',
      borderTop: '1px solid #ddd',
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      zIndex: '100',
      backgroundColor: '#f4f7f9'
    }
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

    const [browseData, setBrowseData] = useState();

    const [emptyData, setEmptyData] = useState(false);

    const aurl = new URL(Axios.defaults.baseURL);

    let apiparams = new URLSearchParams(aurl.search);

    const [apiurl, setApiUrl] = useState(apiparams);

    const [tagapiurl, setTagApiUrl] = useState(apiparams);

    const [chipData, setChipData] = useState([]);

    const [isSearchLoading, setIsSearchLoading] = React.useState(false);

    const [isSearchLoadingHome, setIsSearchLoadingHome] = React.useState(false);

    const [searchtype, setSearchType] = useState('home');

    const [expanded, setExpanded] = React.useState(false);


    const [searchlanguage, SetSearchLanguage] = React.useState();
    const [searchproduct, SetSearchProduct] = React.useState();
    const [searchplatform, SetSearchPlatform] = React.useState();
    const [searchplugin, SetSearchPlugin] = React.useState();
    const [searchvendor, SetSearchVendor] = React.useState();
    const [searchseverity, SetSearchSeverity] = React.useState();

    const [searchaccessvector, SetSearchAccessvector] = React.useState();

    const [searchBrowseType, SetSearchBrowseType] = React.useState('product');

    const [searchHomeType, SetSearchHomeType] = React.useState();

    const [searchProductType, SetSearchProductType] = React.useState();

    const [keywordSearch, SetKeywordSearch] = React.useState();

    const [homeTypeClass, SetHomeTypeClass] = React.useState('active');

    const [browseTypeClass, SetBrowseTypeClass] = React.useState();

    const [browseTab, SetBrowseTab] = React.useState(false);

    const [openDrawer,setOpenDrawer] = useState(false);

  
    
    const closeDrawer = () => {
      setOpenDrawer(false);
  };
    
    
    /*const [expanded, setExpanded] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);*/

    const handleSearchLanguage = (e) => {
        SetSearchLanguage(e.target.value);
    };

    const handleSearchProduct = (e) => {
        SetSearchProduct(e.target.value);
    };

    const handleSearchPlatform = (e) => {
        SetSearchPlatform(e.target.value);
    };

    const handleSearchPlugin = (e) => {
        SetSearchPlugin(e.target.value);
    };

    const handleSearchVendor = (e) => {
        SetSearchVendor(e.target.value);
    };

    
    const handleSearchSeverity = (e,value) => {
        SetSearchSeverity(value);
    };

    const [searchVector, setSearchVector] = useState([]);

    const handleSearchAccessvector = (e, value) => {
      const checked = e.target.checked;
        const checkedValue = e.target.value;
        const checkedName = e.target.name;
        /*SetSearchAccessvector(e.target.value);*/
        apiurl.delete('accessVector', checkedValue);
        if(checkedValue=='local'){
          if(checked){
            searchVector.push(checkedValue);
          } else {
            apiurl.delete('accessVector', checkedValue);
            var index = searchVector.indexOf(checkedValue);
            delete searchVector[index];
          }
        } else if(checkedValue=='remote'){
           if(checked){
            searchVector.push(checkedValue);
          } else {
            apiurl.delete('accessVector', checkedValue);
            var index = searchVector.indexOf(checkedValue);
            delete searchVector[index];
          }
        }
        setSearchVector(searchVector);
        const myList = (
          searchVector.map((item, i) => apiurl.append('accessVector', item))
        )
    };

    const handleProductType = (e) => {
        SetSearchProductType(e.target.value);
    };

     const handleKeywordSearch = (e) => {
        SetKeywordSearch(e.target.value);
    };

    const handleBrowseRadio = async (event) => {
        const productType = event.target.value;
        SetSearchBrowseType(productType);
        if(productType!='product'){
          SetSearchProductType();
        }
        
    } 
    const handleHomeRadio = async (event) => {
        const homeType = event.target.value;
        SetSearchHomeType(homeType);
    } 
    const handleSearchType = (value) => {
        setSearchType(value);
        if(value=='browse'){
          SetBrowseTab(false);
         // callApi_browse();
          SetHomeTypeClass();
          SetBrowseTypeClass('active');
        } else {
          callApi_home();
          SetBrowseTypeClass();
          SetHomeTypeClass('active');
        }
    };
   
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };


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
            
            setisSearch(true);
            var url = `/vuln/list`;
            setMainUrl('/vuln/list');
            setApiUrl(apiparams);
            let response = await Axios.get(url);
            setTabsData(response.data);
            setTabsColumns(response.data.columns);
            setTabsRows(response.data.results);
            setperRow(response.data.rowlimit);
            let totalpages = Math.ceil(response.data.total/response.data.rowlimit);
            setTotalpages(totalpages);
            
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
            var url = `/dash/browse`;
            let response = await Axios.get(url);
            setBrowseData(response.data.data);
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
        setSearchType('home');
        SetBrowseTypeClass();
        SetHomeTypeClass('active');         
        var url = `${mainurl}?${apiurl.toString()}`;  
        let response = await Axios.get(url);  
        if(response) {  
          setTabsData(response.data); 
          setPage(1); 
          let totalpages = Math.ceil(response.data.total/response.data.rowlimit); 
          setTotalpages(totalpages);  
          setperRow(response.data.rowlimit);  
          setisSearch(false); 
          setIsSearchLoading(false);                        
        } else {  
           setEmptyData(true);  
           setIsSearchLoading(false);   
        } 
    } 
    const callApi_home = async () => {  
        setloadingRows(false);  
        setIsSearchLoadingHome(true); 
        setSingleRows();  
        setisSearch(true);  
        setNoResult(true);  
        apiurl.delete('offset');  
        apiurl.delete('limit');   
        apiurl.delete('type');  
        apiurl.delete('language');  
        apiurl.delete('product');   
        apiurl.delete('severity');  
        apiurl.delete('accessvector');  
        apiurl.delete('productname'); 
        apiurl.delete('offset');  
        apiurl.delete('limit'); 
        var url = `${mainurl}?${apiurl.toString()}`;  
        let response = await Axios.get(url);  
        if(response) {  
          setTabsData(response.data); 
          setPage(1);           
          setperRow(response.data.rowlimit);  
          let totalpages = Math.ceil(response.data.total/response.data.rowlimit); 
          setTotalpages(totalpages);  
          setisSearch(false); 
          setIsSearchLoadingHome(false);                        
        } else {  
           setEmptyData(true);  
           setIsSearchLoadingHome(false);   
        } 
    } 



    const callApi_browse = async () => {  
        SetBrowseTab(true); 
        setloadingRows(false);  
        setIsSearchLoadingHome(true); 
        setSingleRows();  
        setisSearch(true);  
        setNoResult(true);  
        apiurl.delete('offset');  
        apiurl.delete('limit');   
        apiurl.delete('type');  
        apiurl.delete('language');  
        apiurl.delete('product');   
        apiurl.delete('severity');  
        apiurl.delete('accessvector');  
        apiurl.delete('productname'); 
        apiurl.delete('offset');  
        apiurl.delete('limit');   
        if(!isEmpty(searchBrowseType)){ 
           apiurl.set('type', searchBrowseType);  
        } else {  
           apiurl.set('type', 'product');   
        }       
        var url = `/scan/browse?${apiparams.toString()}`;  
        let response = await Axios.get(url);  
        if(response) {  
          setTabsData(response.data); 
          setPage(1);           
          setperRow(response.data.rowlimit);  
          let totalpages = Math.ceil(response.data.total/response.data.rowlimit); 
          setTotalpages(totalpages);  
          setisSearch(false); 
          setIsSearchLoadingHome(false);                        
        } else {  
           setEmptyData(true);  
           setIsSearchLoadingHome(false);   
        } 
    }

    const handleShowMore = async (event, value) => { 
        SetBrowseTab(true); 
        setloadingRows(false);  
        setIsSearchLoadingHome(true); 
        setSingleRows();  
        setisSearch(true);  
        setNoResult(true);  
        apiurl.delete('offset');  
        apiurl.delete('limit');   
        apiurl.delete('type');  
        apiurl.delete('language');  
        apiurl.delete('product');   
        apiurl.delete('severity');  
        apiurl.delete('accessvector');  
        apiurl.delete('productname'); 
        apiurl.delete('offset');  
        apiurl.delete('limit'); 
        apiurl.delete('keyword'); 
        
        if(value=='0'){
          apiurl.set('type', 'vendor');  
        } else if(value=='1') {
          apiurl.set('type', 'product');  
        } else if(value=='2') {
          apiurl.set('type', 'vulnerabilities');  
        }
        var url = `/scan/browse?${apiurl.toString()}`;  
        let response = await Axios.get(url);  
        if(response) {  
          setTabsData(response.data); 
          setPage(1);           
          setperRow(response.data.rowlimit);  
          let totalpages = Math.ceil(response.data.total/response.data.rowlimit); 
          setTotalpages(totalpages);  
          setisSearch(false); 
          setIsSearchLoadingHome(false);                        
        } else {  
           setEmptyData(true);  
           setIsSearchLoadingHome(false);   
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
        setloadingRows(true);
        setSingleRows();
        setloadingRows(true);
        let response = await Axios.get(url);
        response.data.cve_id = value;
        setSingleRows(response.data);
        const selectedIndex = selected.indexOf(value);
        let newSelected = [];
        newSelected = newSelected.concat([], value);
        setSelected(newSelected);
        setOpenDrawer(true);

    };  

    const handleRemoveRow = async (event, value) => {
        setloadingRows(false);
        setSingleRows(false);
        setloadingRows(false);
        
        const selectedIndex = selected.indexOf(value);
        let newSelected = [];
        newSelected = newSelected.concat([], []);
        setSelected(newSelected);
        setOpenDrawer(false);


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

    const handleChangeAdvance = async (event, value) => {
      const checked = event.target.checked;
      const checkedValue = event.target.value;
      const checkedName = event.target.name;
    } 

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
        let totalpages = Math.ceil(response.data.total/response.data.rowlimit);
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
        let totalpages = Math.ceil(response.data.total/response.data.rowlimit);
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
       apiurl.delete('keyword');
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
            } else if(m[1]=='keyword') {  
              apiurl.set('keyword', m[2]);  
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
        tagapiurl.delete('keyword');

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
              } else if(m[1]=='keyword') {  
                tagapiurl.set('keyword', m[2]); 
              } 
            } else {  
              tagapiurl.set('keyword', value);  
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
              } else if(m[1]=='keyword') {  
                if(tagapiurl.has('keyword') === true) { 
                  alert('Already added keyword'); 
                } else {  
                  let newSelected = []; 
                  newSelected = newSelected.concat(chipData, 'keyword:'+m[2]);  
                  setChipData(newSelected); 
                  tagapiurl.set('keyword', m[2]); 
                } 
              } 
            } else { 
              if(tagapiurl.has('keyword') === true) { 
                alert('Already added Keyword'); 
              } else {  
                let newSelected = []; 
                newSelected = newSelected.concat(chipData, 'keyword:'+value); 
                setChipData(newSelected); 
                tagapiurl.set('keyword', value);  
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

   const handleBrowseAdvanceClick = (event) => {
      apiurl.delete('offset');
      apiurl.delete('limit'); 
      apiurl.delete('type');
      apiurl.delete('language'); 
      apiurl.delete('product'); 
      apiurl.delete('severity');
      apiurl.delete('accessvector');
      apiurl.delete('producttype');

      apiparams = new URLSearchParams(aurl.search);
      if(searchBrowseType == 'product'){
        apiparams.set('type',searchBrowseType);
        apiparams.set('product',searchProductType);
        apiparams.set('producttype', typeData);
        apiparams.set('year',year);
      }else if(searchBrowseType == 'vulnerabilities'){
        apiparams.set('type',searchBrowseType);
        apiparams.set('cweid',cweid);
      }else if(searchBrowseType == 'vendor'){
        apiparams.set('type',searchBrowseType);
        apiparams.set('vendor',vendorInput);
      }

     

      callApi_browse();
    }

   const handleAdvanceClick = (event) => {
      apiurl.delete('offset');
      apiurl.delete('limit'); 
      apiurl.delete('type');
      apiurl.delete('language'); 
      apiurl.delete('product'); 
      apiurl.delete('severity');
      apiurl.delete('accessvector');
      console.log(searchseverity);
      if(!isEmpty(searchHomeType)){
     apiurl.set('type', searchHomeType);
     if(!isEmpty(keywordSearch)){
      apiurl.set('product', keywordSearch);
     } else {
      apiurl.set('product', 'all'); 
     }
    }

      if(!isEmpty(searchproduct)){
         apiurl.set('productname', searchproduct);
      }

      if(!isEmpty(searchvendor)){
         apiurl.set('vendor', searchvendor);
      }

      if(!isEmpty(searchseverity)){
         let slidervalue = 0;
         if(searchseverity==1){
          slidervalue = 'LOW';
          apiurl.set('severity', slidervalue);
        } else if(searchseverity==2){
          slidervalue = 'MEDIUM';
          apiurl.set('severity', slidervalue);
        } else if(searchseverity==3){
          slidervalue = 'HIGH';
          apiurl.set('severity', slidervalue);
        } 
      }

      if(!isEmpty(searchaccessvector)){
         apiurl.set('accessvector', searchaccessvector);
      }
      callApi_home();
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
                  {searchtype=='browse'?(!isEmpty(tabsData.results)?(<>
                    <TableHead>
                      <TableRow>
                        {
                          Object.keys(tabsData.columns).map((key, i) => (
                            tabsData.columns[key].field!='pub_date'?(<><TableCell key={tabsData.columns[key].field}>
                               {tabsData.columns[key].field!='pub_date'?tabsData.columns[key].title:''}   
                            </TableCell></>):''   
                            
                          ))
                        }  
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {
                          Object.values(tabsData.results).map((row) => {
                          return (<TableRow hover tabIndex={-1} >
                                {Object.keys(tabsData.columns).map((vkey) => (
                                tabsData.columns[vkey].field!='severity'?
                                 <>
                                 <TableCell key={tabsData.columns[vkey].field}>
                                         <Box flexWrap="wrap">
                                            <Typography
                                              variant="h5"
                                              color="textSecondary"
                                            >
                                              {row[`${tabsData.columns[vkey].field}`] }
                                            </Typography>
                                         </Box>
                                  </TableCell>
                                 </> 
                                :(<>
                                <TableCell key={tabsData.columns[vkey].field}>
                                   <Box className="b-scoreblock-severity-div">
                                   {!isEmpty(row[`${tabsData.columns[vkey].field}`])?Object.entries(row[`${tabsData.columns[vkey].field}`]).map((severity) => (
                                      <Box className={`b-scoreblock MuiGrid-grid-xs-3 ${severity[0]}`}>
                                      <Box className="b-scoreblock-inner">
                                      <Box className="b-scoretitle">
                                        {severity[0]}                                              
                                      </Box>
                                      <Box className="b-scorevalue" bgcolor={getBackgroundColorBySeverity(severity[0])}>
                                        {severity[1]?severity[1]:'0'}                                              
                                      </Box>
                                      </Box>
                                      </Box>
                                     )):''}
                                    </Box>  
                                  </TableCell>  
                                  </>)
                                )
                                )}
                            </TableRow>
                          ) }
                          )
                        }  
                    </TableBody></>):(<TableBody><TableRow><TableCell colSpan={6} style={{ textAlign:'center' }}>
                      <Typography variant="h4" component="p">
                                        Not results Found
                      </Typography></TableCell></TableRow></TableBody>)):
                      !isEmpty(tabsData.results)?(<>
                    <TableHead>
                      <TableRow>
                        {
                          Object.keys(tabsData.columns).map((key, i) => (
                            tabsData.columns[key].field!='pub_date'?(<><TableCell key={tabsData.columns[key].field}>
                               {tabsData.columns[key].field!='pub_date'?tabsData.columns[key].title:''}   
                            </TableCell></>):''   
                            
                          ))
                        }  
                        {/*<TableCell key='action'>
                           Action
                        </TableCell>*/}
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
                                {/*<TableCell key='action'>
                                  <Box flexWrap="wrap">
                                     <Link target="_blank" to={`/app/CVE/${row['cve_id']}`}> <VisibilityIcon/> View full Details</Link>
                                  </Box>   
                                </TableCell>*/}
                            </TableRow>
                          ) }
                          )
                        }  
                    </TableBody></>):(<TableBody><TableRow><TableCell colSpan={6} style={{ textAlign:'center' }}>
                      <Typography variant="h4" component="p">
                                        Not results Found
                      </Typography></TableCell></TableRow></TableBody>)}

                    </>)}
                  </Table>
                </TableContainer>
              </Paper>            
          </Box>
          {isEmpty(tabsData.results) ? '':(<><Pagination color="primary" count={totalpages} page={page} onChange={handleChangePage} /></>)}
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
              {loadingRows ?cvesearchcenter(tabsData,12):cvesearchcenter(tabsData,12)}
              {loadingRows ?(<>  
                <VulDrawerComponent openDrawer={openDrawer} closeDrawer={closeDrawer} singlerows = {singlerows} handleRemoveRow={handleRemoveRow} />
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

                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  className='searchBoxTop'>
                  <List component="ul" className={classes.flexContainer}>
                    <ListItem className={homeTypeClass}>                    
                      <ListItemText>
                        <Button value="home" onClick={() => { handleSearchType('home') }}>Home</Button>
                      </ListItemText>
                    </ListItem>
                    <ListItem className={browseTypeClass}>
                      <ListItemText>
                        <Button value="browse" onClick={() => { handleSearchType('browse') }} >Browse</Button>
                      </ListItemText>
                    </ListItem>
                  </List>
                </Box>
                 
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
                <Box mt={1}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  className={classes.searchAdvanceBox} className='advanceboxnew'>
                <Card className={classes.advancecardsearch}>
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
                    title="Advanced Search"
                  />
                  <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                    { searchtype=='homeXXX'? // This is not needed for now. Remove XXX if needed later.
                    (<Grid container spacing={3}>
                         <Grid item xs={12} sm={6} className='AdvanceSearchLeft'>
                            <Grid
                                item
                                md={12}
                                sm={6}
                                xs={12}
                              >
                              <Grid
                                item
                                xs={12}
                              >
                              <RadioGroup aria-label="hometype" name="hometype" value={searchHomeType} onChange={(e) => handleHomeRadio(e)}>
                                <FormControlLabel value="language" control={<Radio />} label={capitalizeFirstLetter('language')} />
                                <FormControlLabel value="application" control={<Radio />} label={capitalizeFirstLetter('application')} />
                                <FormControlLabel value="platform" control={<Radio />} label={capitalizeFirstLetter('Platform')} />
                                <FormControlLabel value="plugin" control={<Radio />} label={capitalizeFirstLetter('Plugin')} />
                            </RadioGroup>
                            {searchHomeType=='language'?(<TextField
                                  name="keywordsearch"
                                  type="keywordsearch"
                                  className='input-box keyword-box'
                                  placeholder="e.g. npm, java, python, ruby"
                                  onChange={handleKeywordSearch}
                                />):''}
                              {searchHomeType=='application'?(<TextField
                                  name="keywordsearch"
                                  type="keywordsearch"
                                  className='input-box keyword-box'
                                  placeholder="e.g. wordpress, struts, netweaver"
                                  onChange={handleKeywordSearch}
                                />):''}
                                {searchHomeType=='platform'?(<TextField
                                  name="keywordsearch"
                                  type="keywordsearch"
                                  className='input-box keyword-box'
                                  placeholder="e.g. windows, redhat, ubuntu"
                                  onChange={handleKeywordSearch}
                                />):''}
                                {searchHomeType=='plugin'?(<TextField
                                  name="keywordsearch"
                                  type="keywordsearch"
                                  className='input-box keyword-box'
                                  placeholder="e.g Wordpress, Drupal..."
                                  onChange={handleKeywordSearch}
                                />):''}  
                              </Grid>
                             </Grid>
                             <Grid
                                item
                                md={12}
                                sm={12}
                                xs={12}
                                className='input-wrap'
                              >
                              <Typography variant="h3" component="h2">
                                Product
                              </Typography>
                                <TextField
                                  name="product"
                                  type="product"
                                  placeholder="e.g Wordpress, Drupal..."
                                  className='input-box'
                                  onChange={handleSearchProduct}
                                />
                             </Grid>
                             
                             <Grid
                                item
                                md={12}
                                sm={12}
                                xs={12}
                                className='input-wrap'
                              >
                              <Typography variant="h3" component="h2">
                                Vendor
                              </Typography>
                                <TextField
                                  placeholder="e.g. Oracle, SAP, Microsoft"
                                  name="vendor"
                                  type="vendor"
                                  className='input-box'
                                  onChange={handleSearchVendor}
                                />
                             </Grid>
                         </Grid> 
                         <Grid item xs={12} sm={6} className='AdvanceSearchRight'>                          
                          <Box
                              display="flex"
                              flexDirection="column" 
                              className='cvesearchslider-box'                             
                              borderRadius={16}
                            > 
                              <Typography variant="h3"  id="severity-slider-custom" component="h2">
                                Severity
                              </Typography>
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
                                  min={0}
                                  max={3}
                                  onChange={handleSearchSeverity}
                                  marks={severitys}
                                />
                              </Box>
                            </Box> 
                           <Box
                              display="flex"
                              flexDirection="column"                              
                              borderRadius={16}
                            > 
                             <List>
                              <ListItem>
                                <ListItemIcon>
                                  <Checkbox
                                    inputProps="Remote"
                                    name="remote"
                                    value="remote" 
                                    onChange={handleSearchAccessvector}
                                  />
                                </ListItemIcon>
                                <ListItemText id="remote" primary="Remote" />
                              </ListItem>
                              <ListItem>
                                <ListItemIcon>
                                  <Checkbox
                                    inputProps="Local"
                                    name="local"
                                    value="local" 
                                    onChange={handleSearchAccessvector}
                                  />
                                </ListItemIcon>
                                <ListItemText id="local" primary="Local" />
                              </ListItem>
                              
                              </List>
                           </Box> 
                        </Grid>
                        <Grid xs={12} sm={12}>
                        <Box
                          display="flex">
                          {isSearchLoadingHome ? <Box m="auto">
                          <Typography  component="p" color="primary" style={{textAlign: 'center'}} >
                           <CircularProgress />
                           </Typography>
                           <button disabled onClick={handleAdvanceClick} className={classes.searchButton}>Search</button>
                          </Box> : <Box m="auto">
                           <button onClick={handleAdvanceClick} className={classes.searchButton}>Search</button>
                          </Box>}
                        </Box>
                        </Grid>
                    </Grid>
                    ):(<><Box
                        flexDirection="column"
                        className="browse-search"
                        borderRadius={16}
                      >
                      <List>
                        <ListItem>
                          <RadioGroup aria-label="browseradio" name="browseradio" value={searchBrowseType} onChange={(e) => handleBrowseRadio(e)}>
                              <FormControlLabel value="product" control={<Radio />} label={capitalizeFirstLetter('product')} />
                              {searchBrowseType=='product'? getProductControls() :''}
                              <FormControlLabel value="vulnerabilities" control={<Radio />} label={capitalizeFirstLetter('vulnerabilities')} />
                              {searchBrowseType=='vulnerabilities'? getVulnerabilityControls() :''}
                              <FormControlLabel value="vendor" control={<Radio />} label={capitalizeFirstLetter('vendor')} />
                              {searchBrowseType=='vendor'? getVendorControls() :''}
                          </RadioGroup>
                        </ListItem>  
                      </List>
                      </Box>
                      <Box
                        display="flex">
                        {isSearchLoadingHome ? <Box m="auto">
                        <Typography  component="p" color="primary" style={{textAlign: 'center'}} >
                         <CircularProgress />
                         </Typography>
                         <button disabled onClick={handleBrowseAdvanceClick} className={classes.searchButton}>Search</button>
                        </Box> : <Box m="auto">
                         <button onClick={handleBrowseAdvanceClick} className={classes.searchButton}>Search</button>
                        </Box>}
                      </Box></>
                      )}
                      
                        
                        </CardContent>
                      </Collapse>
                    </Card>
                    </Box>
                
              </Container>
               </Grid> 
          </Container>
          
          </>
       )   
    }
    const [typeData, setType] = useState('os');
    const [year, setYear] = useState(new Date().getFullYear());
    const [cweid, setCweId] = useState(0);
    const [vendorInput, setVendor] = useState('');

    let rollingYear = 1999;

    const handleYearSelect = (event) => {
      setYear(Number(event.target.innerText))
    }
  
    const getProductControls = () => {
      return (
        <Grid container spacing={1}>
          <Grid md = {4} item >
            <TextField
                  name="producttype"
                  type="producttype"
                  placeholder="e.g. os, application, hardware"
                  onChange={handleProductType}
                />
          </Grid>
          <Grid md = {4} item >
            <Select
              id="type"
              label="Type"  
              value = {typeData}
              labelId="demo-simple-select-label"
              variant = "outlined"
            >
           
              <MenuItem value={'os'} onClick={()=>setType('os')} >OS</MenuItem>
              <MenuItem value={'hardware'} onClick={()=>setType('hardware')}>Hardware</MenuItem>
              <MenuItem value={'application'} onClick={()=>setType('application')}>Application</MenuItem>
            </Select>
          </Grid>
          <Grid md = {4} item >
            <Select
                id="year"
                label="Years"  
                value = {year}
                labelId="demo-simple-select-label"
                variant = "outlined"
              >
               {getYears()}
              </Select>
          </Grid>
        </Grid>
      )
    }


    const getVulnerabilityControls = () => {
      return (
        <Grid container spacing={0}>
          <Grid md= {1} className = "vulnerability">
            <label>CWE-</label>
          </Grid>
          <Grid md = {4} item >
          
            <TextField
                  name="cwe"
                  type="cwe"
                  placeholder="e.g. 787"
                  onChange={(e)=>setCweId(e.target.value)}
                />
          </Grid>
         </Grid>
      )
    }

    const getVendorControls = () => {
      return (
        <Grid container >
          <Grid md = {4} item >
            <TextField
                  name="vendor"
                  type="vendor"
                  placeholder="vendor"
                  onChange={(e)=>setVendor(e.target.value)}
                />
          </Grid>
         </Grid>
      )
    }

    const getYears = () => {
      const menuItems = [];
      while(rollingYear < new Date().getFullYear()){
        rollingYear = rollingYear + 1;
        menuItems.push(<MenuItem value={rollingYear} onClick={handleYearSelect} >{rollingYear}</MenuItem>)
      }
      

      return menuItems.map(item=> {
        return item;
      })
    }
    const getBrowseTab = (browseDa) => {
      return (
            <>
            <Container maxWidth className="browse-wizard">
              <Box  >
                <Grid container spacing={3}>  
                {Object.entries(browseDa).map(([key, value],index) => (
                      <>
                      <Grid
                      item
                      xs={12}
                      md={4}
                      display="flex"
                      justifyContent="center"
                      className="browse-wizard-box"
                    >
                      <Card>
                        <CardHeader
                            title={value.header}
                         />
                        <CardContent>
                          <Typography variant="h6">{value.title}</Typography>
                           <List>
                           {Object.entries(value.data).map(([bkey, row]) => (
                                  <Grid container className="browse-list">
                                    {Object.entries(value.column).map(([browseColumnskey, browseColumns]) => (
                                      browseColumns=='name' || browseColumns=='product' || browseColumns=='vendor'?(
                                      <Grid
                                          item
                                          xs={12}
                                          md={6}

                                      >
                                      {capitalCase(row[`${browseColumns}`])}
                                      </Grid>):''
                                    ))}
                                    {Object.entries(value.column).map(([browseColumnskey, browseColumns]) => (
                                      browseColumns!='name' && browseColumns!='product' && browseColumns!='vendor'?(
                                      <Grid
                                          item
                                          xs={12}
                                          md={6}
                                      >
                                      {row[`${browseColumns}`]}
                                      </Grid>):''
                                    ))}
                                  </Grid>
                              ))}
                          </List> 
                        </CardContent>
                        <CardActions>
                          <Button onClick={event => handleShowMore(event,index)} size="small">Show More</Button>
                        </CardActions>
                      </Card>
                    </Grid>
                      </>
                    ))}    
                  

                </Grid>
            </Box>
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
                {browseTab == false && searchtype=='browse'?getBrowseTab(browseData):''}
                {browseTab == true && searchtype=='browse' ?(
                <Container maxWidth className="cveresult">
                  <Grid
                        container
                        spacing={3}
                        className={classes.container}
                      >
                      
                      { noresult ? getTabsData() : (tabsData.total > 0 ? getTabsData(): getTabsData())}
                  </Grid>
                </Container>):''}
                {searchtype=='home' ?(
                <Container maxWidth className="cveresult">
                  <Grid
                        container
                        spacing={3}
                        className={classes.container}
                      >
                      
                      { noresult ? getTabsData() : (tabsData.total > 0 ? getTabsData(): getTabsData())}
                  </Grid>
                </Container>):''}
                <MySnackbar closeSnackbar={() => updateSnackbar(false, '')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />
            </Grid>
        </Container>
        </Page>
    );
};


export default VuldbLogin;