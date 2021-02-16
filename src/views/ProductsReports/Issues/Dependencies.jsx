import { Divider, Grid, Typography, Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Box,Container
 ,TextField,FormControl,Select,InputLabel,Chip,Card
 } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import PackageJSON from './PackageJSON/PackageJSON';
import File from './File/File';
import Skeleton from '@material-ui/lab/Skeleton';
import { getBackgroundColorBySeverity, getFontColorBySeverity } from './../../../Util/Util';
import ReportCount from './../ReportCount/ReportCount';
import moment from 'moment';
import { Link as RouterLink ,useHistory } from 'react-router-dom';

import Axios from 'axios';
import isEmpty from '../../../Util/Util';
import Copy from "./../../../Util/Copy";
import { setDateFormat } from './../../../Util/Util';
const useStyles = makeStyles((theme) => ({
 root: {
      flexGrow: 1,
      width: '100%',
      backgroundColor: 'inherit', // theme.palette.background.paper
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '100%'
  },

  chip: {
    margin: theme.spacing(0.5),
  },
  searchbar: {
    backgroundColor: theme.palette.background.light,
    maxWidth:1180,
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
    maxWidth: '100%',
    [theme.breakpoints.down('sm')]: {
      bottom: -90,
    },
    left:0,
    paddingLeft:0,
    paddingRight:0
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
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
}));

const Dependencies = ({ issues, reportName, reportType,counter,historydata,projectId }) => {

  let history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [state, setState] = React.useState({
  });

  const [issearch, setisSearch] = React.useState(false);

  const [singlerows, setSingleRows] = React.useState();

  const [selected, setSelected] = React.useState([]);

  const [cveInput, setCVEInput] = useState("");

  const [loadingRows, setloadingRows] = React.useState(false);

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const [selectData, setSelectData] = React.useState(reportName);

  const fileNames = issues ? Object.keys(issues) : [];

  const aurl = new URL(Axios.defaults.baseURL);

  const apiparams = new URLSearchParams(aurl.search);

  const [tagapiurl, setTagApiUrl] = React.useState(apiparams);

  const [apiurl, setApiUrl] = useState(apiparams);

  const [chipData, setChipData] = React.useState([]);

  const [emptyData, setEmptyData] = React.useState(false);

  const [issuesdata, setIssuesData] = React.useState(issues);

  const [issuesvalue, setIssuesValue] = React.useState(issues.data);

  useEffect(() => {
    let stateObject = {};
    fileNames.forEach(name => {
      stateObject[name] = true;
    })
    setState(stateObject);
    

  }, []);

 

  const handleChipDelete = (chipToDelete) => () => {
    chipData.splice(chipToDelete, 1);
    let newSelected = [];
    newSelected = newSelected.concat(chipData);
    setChipData(newSelected);
  };


  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectData(value);     
    history.push(`/app/productsreports/${projectId}/${value}`);
    history.go(0);
  };

  const callApi = async () => {
      
  }

  const handleClick = (event) => {       
      const regex5 = /([^:\s]+):([^:\s]+)/g;
      const regex = new RegExp(regex5,'i');  
      setloadingRows(false); 
      
      apiurl.delete('Product');
      apiurl.delete('product');
      
      chipData.forEach(function (value, index, array) {
          let m = regex.exec(value);
          if(m){
            if(m[1]=='product') {                            
              apiurl.set('product', m[2]);              
            }  
          }
      })         
      if(chipData.length <= 0 ) {          
          let newSelected = [];
          newSelected = newSelected.concat([], issues.data);                           
          setIssuesValue(newSelected);
      } else {
        var filter = Object.fromEntries(apiurl);
        const copy = Copy(issues.data);
        
        var report = copy.filter(item => {
          for (let key in filter) {
            if (item[key] === undefined || item[key] != filter[key])
              return false;
          }
          return true;
        });
        let newSelected = [];
        newSelected = newSelected.concat([], report);
        setIssuesValue(newSelected);
      }

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
    };

    const onSearchClicked = () => {
      if (cveInput) {
        const regex5 = /([^:\s]+):([^:\s]+)/g;
        const regex = new RegExp(regex5,'i');
        
        tagapiurl.delete('Product');
        tagapiurl.delete('product');
        
        chipData.forEach(function (value, index, array) {
            let m = regex.exec(value);    
            var regexcve = /cve-/;
            var regexcve2 = /CVE-/;
            if(m){
              if(m[1]=='product') {
                tagapiurl.set('product', m[2]);
              } 
            }
        })
        const split_cveInput = cveInput.split("OR");
        split_cveInput.forEach(function (value, index, array) {
            let m = regex.exec(value);    
            
            if(m){
            
              if(m[1]=='product') {
                if(tagapiurl.has('product') === true) {
                  alert('Already added Name');
                } else {
                  let newSelected = [];
                  newSelected = newSelected.concat(chipData, 'product:'+m[2]);
                  setChipData(newSelected);
                  tagapiurl.set('product', m[2]);
                }
              }
            }
        })        
        setTagApiUrl(tagapiurl);
        setCVEInput('');
        
    }
    
   }

  const getSearchBox = () => {
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
                  placeholder="Search inventory for a product:value"
                />
                <button onClick={addTagClick} className={classes.searchButton}>Add</button>
                </Box>
                {Object.keys(Object.fromEntries(apiurl)).length > 0 ?
                <Box maxWidth="lg" className={classes.chipbar}>
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
                        <Box m="auto">
                         <button onClick={handleClick} className={classes.searchButton}>Search</button>
                        </Box>
                      </Box>
                </Box> :''}
                
              </Container>
               </Grid> 
          </Container>
          
          </>
       )   
    }

  return (
    <Grid
      container
      spacing={1}
      style={{ display: 'block', margin: '5px' }}
    >
      <Grid container className="report-issuelist-head-block">
        <Grid item xs={8} className="report-issuelist-search">
          {!isEmpty(issuesvalue)?getSearchBox():''}
        </Grid>
        
        <Grid item xs={4} className="report-issuelist-dd">
          {
                  historydata && (
                    <>
                    
                    <FormControl variant="outlined" className={classes.formControl}>
                     <InputLabel htmlFor="outlined-history-native-simple">History</InputLabel>
                      <Select native
                        onChange={handleSelect.bind(this)} handleSelect label="History"
                        inputProps={{
                          name: 'history',
                          id: 'outlined-history-native-simple',
                        }} >
                        <option aria-label="None" value="" />
                      {Object.entries(historydata).map(([key, value]) => {                  
                          return (
                              <option key={value} value={value}>{moment(setDateFormat(value).replace(".json","").replace("_"," ")).format('MMMM Do YYYY, h:mm:ss a')}</option>
                          );
                      })}
                    </Select>
                   </FormControl>           
                 
                    </>
                   )
              }
        </Grid>        
      </Grid>
    <Grid
           container
              style={{ marginTop: 10,marginBottom: 10 }}
              spacing={2}
              className="report-inventrylist-tab"
           >   
    <Grid
          item
          xs={12}          
          md={12}
          className="report-inventrylist-table"
        >
          <Box position="relative">
          <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                  <Table stickyHeader aria-label="sticky table" className="big-table">
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
                   {!isEmpty(issuesvalue)?(<>
                  <TableHead>
                      <TableRow>
                        {
                          Object.keys(issues.column).map((key, i) => (
                            <><TableCell key={issues.column[key].field}>
                               {issues.column[key].title}   
                            </TableCell></>  
                            
                          ))
                        }  
                      </TableRow>
                    </TableHead><TableBody>
                       {
                          Object.entries(issuesvalue).map(([rkey, row]) => {
                            const isItemSelected = isSelected(rkey)
                          return (<TableRow hover key={rkey} role="checkbox" selected={isItemSelected} tabIndex={-1} >

                                { Object.keys(issues.column).map((vkey) => (
                                 <TableCell key={issues.column[vkey].field}>
                                      { issues.column[vkey].field == 'vulnerability' ? (
                                        <>
                                         <Box className="scoreblock-vulnerabilities-div">
                                         {Object.entries(row.table[`${issues.column[vkey].field}`]).map((vulnerabilities) => (
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
                                              {row[`${issues.column[vkey].field}`].replace(',', '\n') }
                                            </Typography>

                                         </Grid>
                                        </>
                                    )  : row[`${issues.column[vkey].field}`].replace(',', '\n'))
                                    }
                                  </TableCell>
                                )
                                )}
                            </TableRow>
                          ) }
                          )
                        } 
                    </TableBody></>):(<><TableBody><TableRow><TableCell style={{ textAlign:'center' }}>Not results Found</TableCell></TableRow></TableBody></>)}

                    </>)}
                  </Table>
                </TableContainer>
              </Paper>
            
          </Box>
        </Grid>
        </Grid>
         </Grid>
  );
};

export default Dependencies;