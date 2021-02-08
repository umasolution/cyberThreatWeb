import { Divider, Grid, Typography, Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Box,Container
 ,TextField
 } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import PackageJSON from './PackageJSON/PackageJSON';
import File from './File/File';
import Skeleton from '@material-ui/lab/Skeleton';
import { getBackgroundColorBySeverity, getFontColorBySeverity } from './../../../Util/Util';
import ReportCount from './../ReportCount/ReportCount';
import moment from 'moment';
import { Link as RouterLink ,useHistory } from 'react-router-dom';

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
  // borderDiv: {
  //   border: '1px',
  //   borderStyle: 'solid',
  //   borderRadius: '10px',
  //   borderColor: 'brown',
  //   marginTop: '5px'
  // }
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
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const [selectData, setSelectData] = React.useState(reportName);

  const fileNames = issues ? Object.keys(issues) : [];

  useEffect(() => {
    let stateObject = {};
    fileNames.forEach(name => {
      stateObject[name] = true;
    })
    setState(stateObject);
    

  }, []);


  const handleSelect = (event) => {
    const value = event.target.value;
    setSelectData(value);     
    history.push(`/app/productsreports/${projectId}/${value}`);
    history.go(0);
  };

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
                  style={{
                    width: '100%',
                    color:'#000'
                  }}
                  id="cve"
                  placeholder="Search issues"
                />
                <button  className={classes.searchButton}>Add</button>
                </Box>
              </Container>
               </Grid> 
          </Container>
          
          </>
       )   
    }

  const getPlatformResult = () => {
    return (
      <>
        {
          Object.keys(issues).map(issue => {
            return (
              issue !== 'severity' ?
                (
                  <>
                    <Typography
                      variant="h2"
                      color="primary"
                    >
                      {issue}
                    </Typography>

                    {
                      issues[issue].map(iss => {
                        return (
                          <div >
                            {Object.keys(iss).map(i => {
                              return (
                                <Typography
                                  variant="h6"
                                  style={{ color: '#ab396a', marginLeft: '10px' }}
                                >
                                  {i}
                                  {' '}
:
                                  {iss[i]}
                                </Typography>
                              )
                            })}
                            <Divider />
                          </div>
                        )

                      })
                    }
                  </>
                )
                :
                (
                  <>
                  </>
                )
            )
          })
        }

      </>
    )
  }

  const handleCheckBoxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const getLanguageReport = () => {
    return (
      <>
        <div className={classes.root}>
          <div style={{ display: 'flex' }}>
            <List component="nav" aria-label="main mailbox folders">
              {
                Object.keys(state).length === fileNames.length ? fileNames.map(name => {
                  return (
                    <ListItem button>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={state[name]}
                            onChange={handleCheckBoxChange}
                            name={name}
                            color="primary"
                          />
                        )}
                        label={name}
                      />
                    </ListItem>
                  );
                }) : ''
              }

            </List>
            <div style={{ width: '100%' }}>

              {
                Object.keys(state).map(key => {
                  return (
                    state[key] ? <File name={key} file={issues[key]} /> : ''
                  )
                })
              }
              {/* {state.isHighIssueChecked &&
                issues.High ? <PackageJSON jsonName="High" packageJSON={issues.High} /> : ''}
              <Divider style={{ display: 'block' }} />
              {state.isMediumIssueChecked &&
                issues.Medium ? <PackageJSON jsonName="Medium" packageJSON={issues.Medium} /> : ''}
              <Divider style={{ display: 'block' }} />
              {state.isLowIssueChecked &&
                issues.Low ? <PackageJSON jsonName="Low" packageJSON={issues.Low} /> : ''} */}
            </div>
          </div>
        </div>

      </>
    );
  }

  return (
    <Grid
      container
      spacing={1}
      style={{ display: 'block', margin: '5px' }}
    >
      {
          historydata && (
            <>
            <Grid xs={12} container justify="flex-end">
              <select value={selectData} onChange={handleSelect.bind(this)} handleSelect className="report-history-dropdown">
              {Object.entries(historydata).map(([key, value]) => {                  
                  return (
                      <option key={value} value={value}>{moment(value.replace(".json","").replace("_"," ")).format('MMMM Do YYYY, h:mm:ss a')}</option>
                  );
              })}
            </select>
          </Grid>
            </>
           )
      }
      <Grid
          item
          xs={12}          
          md={12}
          className="report-inventrylist-search"
        >
      {getSearchBox()}
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
                      
                </>):(<> <TableHead>
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
                          Object.entries(issues.data).map(([rkey, row]) => {
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
                    </TableBody></>)}
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