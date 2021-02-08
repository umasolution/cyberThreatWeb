import {
    Box, Container, Grid,List, LinearProgress, makeStyles, Typography, ExpansionPanel, ExpansionPanelSummary,
    ListItem, ListItemIcon, ListItemText, ExpansionPanelDetails, Divider, Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,
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
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { getBackgroundColorBySeverity, getFontColorBySeverity } from '../../Util/Util';
import './ProjectsReports.css';
import moment from 'moment';
import Page from 'src/components/Page';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: 'inherit', // theme.palette.background.paper,
        paddingLeft: '16px !important',
        paddingRight: '16px !important',
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
    const [apiurl, setApiUrl] = useState();

    const [selected, setSelected] = useState([]);
    const isSelected = (name) => selected.indexOf(name) !== -1;


    const aurl = new URL(Axios.defaults.baseURL);
    const apiparams = new URLSearchParams(aurl.search);

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

    const handleChangeRemote = async (event, value) => {
        let newSelected = [];
        setSelected(newSelected);
        const checked = event.target.checked;
        const checkedValue = event.target.value;
        const checkedName = event.target.name;
        setloadingRows(false);
        setSingleRows();
        setisSearch(true);
        setNoResult(true);
        apiurl.delete('offset');
        apiurl.delete('limit');
        apiurl.delete('type', checkedValue);
        if(checkedValue=='organization'){
          if(checked){
            selecttype.push(checkedValue);
          } else {
            apiurl.delete('type', checkedValue);
            var index = selecttype.indexOf(checkedValue);
            delete selecttype[index];
          }
        } else if(checkedValue=='user'){
           if(checked){
            selecttype.push(checkedValue);
          } else {
            apiurl.delete('type', checkedValue);
            var index = selecttype.indexOf(checkedValue);
            delete selecttype[index];
          }
        }
        setSelecttype(selecttype);
        const myList = (
          selecttype.map((item, i) => apiurl.append('type', item))
        )
        
        setApiUrl(apiurl);
        if(selecttype[0] && selecttype[1]) {  
          apiurl.delete('type', 'organization');
          apiurl.delete('type', 'user');
          var url = `${mainurl}`;
        } else if(selecttype[0]) { 
          var url = `${mainurl}?${apiurl.toString()}`;  
        } else if(selecttype[1]) { 
          var url = `${mainurl}?${apiurl.toString()}`;  
        } else { 
          var url = `${mainurl}`;  
        } 
        console.log(url);
        
        let response = await Axios.post(url);
        setTabsData(response.data);
        setPage(1);
        let totalpages = Math.ceil(response.data.total/perRow);
        setTotalpages(totalpages);
        setperRow(response.data.rowlimit);
        setisSearch(false);
    };

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



     const getFieldData = () => {
     return (
       <>
        <Grid
            item
            xs={12}
            md={12}
            className="cvesearchleft"
          > 
            <Box className="boxleftheader"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              borderRadius={16}>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              className="cvesearchremote"
              borderRadius={16} 
            >
            <Box>
            <ExpansionPanel
                    style={{ width: '100%' }}
                    
                  > 
                  <ExpansionPanelSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="type-content"
                      id="type-header"
                    >
                    <Typography variant="h3"  id="type-slider-custom" component="h2">
                         Options
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
                                  inputProps="org"
                                  name="type"
                                  value="organization" 
                                  onChange={handleChangeRemote}
                                />
                              </ListItemIcon>
                              <ListItemText id="organization" primary="Organization" />
                            </ListItem>
                            <ListItem>
                              <ListItemIcon>
                                <Checkbox
                                  edge="start"
                                  tabIndex={-1}
                                  disableRipple
                                  inputProps="user"
                                  value="user" 
                                  name="type"
                                  onChange={handleChangeRemote}
                                />
                              </ListItemIcon>
                              <ListItemText id="user" primary="User" />
                            </ListItem>
                            </List>
                    </ExpansionPanelDetails>
               </ExpansionPanel>
            
             </Box> 
            </Box>
            </Box>
          </Grid>
        </>
     )
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
                  <Table stickyHeader aria-label="sticky table" className={loadingRows?'small-table':'big-table'}>
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
                      
                </>):(<> <TableHead>
                      <TableRow>
                        {
                          Object.keys(tabsData.columns).map((key, i) => (
                            <><TableCell key={tabsData.columns[key].field}>
                               {tabsData.columns[key].title}   
                            </TableCell></>  
                            
                          ))
                        }  
                      </TableRow>
                    </TableHead><TableBody>
                       {
                          Object.entries(tabsData.results).map(([rkey, row]) => {
                            const isItemSelected = isSelected(rkey)
                          return (<TableRow hover onClick={event => handleClickRow('key',rkey)} key={rkey} role="checkbox" selected={isItemSelected} tabIndex={-1} >

                                { Object.keys(tabsData.columns).map((vkey) => (
                                 <TableCell key={tabsData.columns[vkey].field}>
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
                                    ) : (vkey==0? (
                                        <>
                                         <Grid item xs={12}>
                                            <Typography
                                              variant="h5"
                                              color="textSecondary"
                                            >
                                              {row.table[`${tabsData.columns[vkey].field}`].replace(',', '\n') }
                                            </Typography>

                                         </Grid>
                                        </>
                                    )  : row.table[`${tabsData.columns[vkey].field}`].replace(',', '\n'))
                                    }
                                  </TableCell>
                                )
                                )}
                            </TableRow>
                          ) }
                          )
                        } 
                    </TableBody></>)}
                  </Table>
                </TableContainer>
              </Paper>
            {issearch ? '':(<><Pagination color="primary" count={totalpages} page={page} onChange={handleChangePage} /></>)}
          </Box>
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
                                        <Box className="snapshot-content">{moment(scan_insights[1]).format('MMM DD, YYYY')}</Box> </Box></>):''}
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
                                    <>
                                    <ListItem>
                                        <ListItemText>
                                        <Box className="snapshot-title">{scan_summary[0]} : </Box>
                                        <Box className="snapshot-content">{scan_summary[1]}</Box>
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
          className={classes.root}
          title="My Scans"
        >
        <Container className={classes.root} maxWidth>
            <Grid
              container
              spacing={1}
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
                <Container maxWidth className="cveresult">
                  <Grid
                        spacing={3}
                        container                        
                        className={classes.container}
                      >
                      {getFieldData()}
                  </Grid>
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