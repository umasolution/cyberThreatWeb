import { Container, Grid, LinearProgress, makeStyles, TextField,Typography,Box,
ListItem,
ListItemIcon,
ListItemText,
List,
Slider,
} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Tab from '@material-ui/core/Tab';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import MySnackbar from "../../Shared/Snackbar/MySnackbar";
import CONSTANTS from "../../Util/Constants";
import Copy from "../../Util/Copy";
import CVETextField from './../CVE/CVEInput/CVETextField';
import './Search.css';
import TabsData from './TabsData/TabsData';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import SearchBox from './SearchBox/SearchBox';
import MaterialTable from 'material-table';
import Pagination from '@material-ui/lab/Pagination';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';


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
    }
}));

export const Search = (/* {   } */) => {

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
    const [perRow, setperRow] = useState(50);
    const [totalpages, setTotalpages] = useState();
    const [tabscolumns, setTabsColumns] = useState();
    const [tabsrows, setTabsRows] = useState();
    

    useEffect(() => {
        fetchFeed();
    }, [feedType]);

    const fetchFeed = async () => {
        try {
            setLoadingTabs(true);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA);
            const url = "/search?product=tomcat";
            let response = await Axios.get(url);
            setTabsData(response.data);
            setTabsColumns(response.data.columns);
            setTabsRows(response.data.results);
            let totalpages = Math.ceil(response.data.total/perRow);
            setTotalpages(totalpages);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_SUCCESS);
            setLoadingTabs(false);
        } catch (error) {
            console.error(error);
            updateSnackbar(true, CONSTANTS.FETCHING_DATA_FAILED);
            setLoadingTabs(false);
        }
    }

    const handleChangePage = async (event, value) => {
        setPage(value);
        let Offset = value*50;
        const url = `/search?product=tomcat&offset=${Offset}&limit=${perRow}`;
        console.log(url);
        let response = await Axios.get(url);
        setTabsData(response.data);
        let totalpages = Math.ceil(response.data.total/perRow);
        setTotalpages(totalpages);
    };

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


    const handleChangeCVE = (event) => {
        setCVEInput(event.target.value);
    };

    const severitys = [
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

   

    const getTabsData = () => {
        return (
            <>
                <Container maxWidth="lg" className="topSearch">
                   <Grid
                      container
                      spacing={0}
                      className={classes.container}
                    > 
                    <SearchBox />
                    </Grid>
                </Container>
                <Container maxWidth="lg" className="cveresult">
                    <Grid
                          container
                          spacing={3}
                          className={classes.container}
                        >
                          <Grid
                            item
                            xs={12}
                            md={2}
                            className="cvesearchleft"
                          >
                            <Box
                              display="flex"
                              flexDirection="column"
                              justifyContent="center"
                              className="cvesearchseverity"
                              borderRadius={16}
                            >
                            <Typography id="severity-slider-custom" gutterBottom>
                                Custom marks
                              </Typography>
                              <Slider
                                defaultValue={1}
                                aria-labelledby="severity-slider-custom"
                                step={1}
                                min={1}
                                max={3}
                                marks={severitys}
                              />
                            </Box>
                            <Box
                              display="flex"
                              flexDirection="column"
                              justifyContent="center"
                              className="cvesearchremote"
                              borderRadius={16} 
                            >
                            <List>
                             <ListItem>
                                <ListItemIcon>
                                  <Checkbox
                                    edge="start"
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps="local"
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
                                    inputProps="remote"
                                  />
                                </ListItemIcon>
                                <ListItemText id="remote" primary="remote" />
                              </ListItem>
                              </List>
                            </Box>
                          </Grid>
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
                                          {
                                            Object.keys(tabsData.columns).map((key, i) => (
                                              <TableCell key={tabsData.columns[key].field}>
                                                 {tabsData.columns[key].title}   
                                              </TableCell>
                                            ))
                                          }  
                                        </TableRow>
                                      </TableHead>
                                      <TableBody>
                                        {
                                            Object.keys(tabsData.results).map((rkey) => (
                                             <TableRow hover role="checkbox" tabIndex={-1} >
                                                  {Object.keys(tabsData.columns).map((key) => (
                                                      <TableCell>
                                                        {tabsData.results[rkey]}
                                                      </TableCell>
                                                  ))}
                                              </TableRow>
                                            ))
                                          }  
                                      </TableBody>
                                    </Table>
                                  </TableContainer>
                                </Paper>
                            <MaterialTable
                                title={null}
                                columns={tabsData.columns}
                                data={tabsData.results}
                                style={{ width: '100%' }}
                                options={{
                                  search: false,
                                  paging :false,
                                  cellStyle: {
                                    fontSize: 13,
                                    fontFamily: '"Montserrat",sans-serif !important',
                                  },
                                  headerStyle: {
                                    fontSize: 16,
                                    fontFamily: '"Montserrat",sans-serif !important',
                                    color: '#546e7a',
                                  },
                                  rowStyle: x => {
                                    if (x.tableData.id % 2 === 0) {
                                      return { backgroundColor: "#e7e7ef" }
                                    }
                                  },
                                }}
                              />
                              <Typography>Page: {page}</Typography>
                              <Pagination color="primary" count={totalpages} page={page} onChange={handleChangePage} />
                            </Box>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            md={2}
                            className="cvesearchright"
                          >
                            <Box
                              display="flex"
                              flexDirection="column"
                              justifyContent="center"
                            >
                          
                          </Box>
                          </Grid>
                        </Grid>
                    
              </Container>
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

    return (
        <Container style={{ paddingLeft: '0px', paddingRight: '0px', maxWidth: 'unset' }} maxWidth="lg">
            <Grid style={{ width: '100%' }} container spacing={1}>
                {loadingTabs ? getLoader() : null}
                {tabsData.total > 0 && getTabsData()}
                <MySnackbar closeSnackbar={() => updateSnackbar(false, '')} snackbarMessage={snackbarMessage} snackbarOpen={snackbarOpen} />
            </Grid>
        </Container>
    );
};

export default Search;