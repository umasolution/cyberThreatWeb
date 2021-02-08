import { Divider, Grid, Typography, Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Box,ListItemText,Container
 ,TextField} from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PackageJSON from './PackageJSON/PackageJSON';
import Skeleton from '@material-ui/lab/Skeleton';
import Pagination from '@material-ui/lab/Pagination';
import { getBackgroundColorBySeverity, getFontColorBySeverity } from './../../../Util/Util';
import ReportCount from './../ReportCount/ReportCount';
import { Link as RouterLink ,useHistory } from 'react-router-dom';
import moment from 'moment';
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
  
}));

const Issues = ({ issues, reportName, reportType,counter,historydata,projectId }) => {
  let history = useHistory();
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    isHighIssueChecked: true,
    isLowIssueChecked: false,
    isMediumIssueChecked: false,
  });

  const [issearch, setisSearch] = React.useState(false);

  const [singlerows, setSingleRows] = React.useState();

  const [selected, setSelected] = React.useState([]);
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const [selectData, setSelectData] = React.useState(reportName);


  const [loadingRows, setloadingRows] = React.useState(false);

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

  const handleClickRow = async (event, value) => {
    setloadingRows(false);
    setSingleRows();
    setloadingRows(true);    
    let newSelected = [];
    newSelected = newSelected.concat([], value);
    setSelected(newSelected);
    setSingleRows(issues.data[value]);
  }; 

  const cvesearchcenter = (issues,col) => {

    return (
      <>
      <Grid
          item
          xs={12}          
          md={12}
          className="report-issuelist-search"
        >
      {getSearchBox()}
      </Grid>
      <Grid
          item
          xs={12}          
          md={col}
          className="report-issuelist-left"
        >
      <Box position="relative">
      <Paper className={classes.root}>
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table" className={'big-table'}>
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
                      Object.keys(issues.display.table).map((key, i) => (
                        <><TableCell key={issues.display.table[key].field}>
                           {issues.display.table[key].title}   
                        </TableCell></>  
                        
                      ))
                    }  
                  </TableRow>
                </TableHead><TableBody>
                   {
                      Object.entries(issues.data).map(([rkey, row]) => {
                        const isItemSelected = isSelected(rkey)
                      return (<TableRow hover hover onClick={event => handleClickRow('key',rkey)}  key={rkey} role="checkbox" selected={isItemSelected} tabIndex={-1} >

                            { Object.keys(issues.display.table).map((vkey) => (
                             <TableCell key={issues.display.table[vkey].field}>
                                  {vkey==0? (
                                    <>
                                     <Grid item xs={12}>
                                        <Typography
                                          variant="h5"
                                          color="textSecondary"
                                        >
                                          {row[`${issues.display.table[vkey].field}`].replace(',', '\n') }
                                        </Typography>

                                     </Grid>
                                    </>
                                )  : row[`${issues.display.table[vkey].field}`].replace(',', '\n')}
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
      </>
     )
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
           container
              style={{ marginTop: 10,marginBottom: 10 }}
              spacing={2}
              className="report-issues-tab"
           > 
     {loadingRows ?cvesearchcenter(issues,8):cvesearchcenter(issues,12)}
     {loadingRows ?(<>  
              <Grid
                item
                xs={12}
                md={4}
                className="report-issuelist-right"
              >
              <Box
                className="cvesearchright-inner"
                borderRadius={5}
              >
              
              {singlerows ? (<> 
              <Box className={classes.boxrightheader}
                          display="flex"
                          flexDirection="column"
                          justifyContent="center"
                          borderRadius={16}>
                          <Box className="boxdetailhead">
                              <Box className="boxdetailtitle">
                                  <Typography gutterBottom variant="h5" component="h2">
                                   More Data
                                  </Typography>
                              </Box> 
                              <Box className="boxtitlecontent"> 
                              <Typography variant="body2" color="textSecondary" component="div" className="scoreblock-div">
                              <List component="ul" className="snapshotlist">
                               { Object.keys(issues.display.option).map((vkey) => (                                 
                                 <ListItem key={issues.display.option[vkey].field}>
                                    <ListItemText>
                                    <Box className="snapshot-title">{issues.display.option[vkey].title} : </Box>
                                    <Box className="snapshot-content">{singlerows[`${issues.display.option[vkey].field}`].replace(',', '\n') }</Box>
                                    </ListItemText>
                                  </ListItem>
                                )
                                )}
                              </List>
                            </Typography>
                            </Box>
                          </Box>
                    </Box></>): ''} 
              </Box></Grid>
              </>):''}
            </Grid>  
     </Grid>
  );
};

export default Issues;