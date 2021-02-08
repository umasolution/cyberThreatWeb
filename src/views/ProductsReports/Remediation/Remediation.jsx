import { Divider, Grid, Typography, Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Box,Container
 ,TextField
 } from '@material-ui/core';
import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import ShowMoreText from "react-show-more-text";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReportCount from './../ReportCount/ReportCount';
import { Link as RouterLink ,useHistory } from 'react-router-dom';
import moment from 'moment';
import './Remediation.css';

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

const Remediation = ({remediation,counter, reportName,historydata,projectId}) => {

  let history = useHistory();
  const classes = useStyles();

  const [issearch, setisSearch] = React.useState(false);

  const [singlerows, setSingleRows] = React.useState();

  const [selectData, setSelectData] = React.useState(reportName);


  const [selected, setSelected] = React.useState([]);
  const isSelected = (name) => selected.indexOf(name) !== -1;

  const [expand, setExpand] = React.useState(false);
   const onShowMore = () => {
      setExpand(!expand);
   };

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
            className="report-remediation-tab"
         >   
    <Grid
          item
          xs={12}          
          md={12}
          className="report-remediation-table"
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
                          Object.keys(remediation.column).map((key, i) => (
                            <><TableCell key={remediation.column[key].field}>
                               {remediation.column[key].title}   
                            </TableCell></>  
                            
                          ))
                        }  
                      </TableRow>
                    </TableHead><TableBody>
                       {
                          Object.entries(remediation.data).map(([rkey, row]) => {
                            const isItemSelected = isSelected(rkey)
                          return (<TableRow hover key={rkey} role="checkbox" tabIndex={-1} >

                                { Object.keys(remediation.column).map((vkey) => (
                                 <TableCell key={remediation.column[vkey].field}>
                                      { remediation.column[vkey].field=="Advisory-ID" || remediation.column[vkey].field=="CVEs" ? (
                                        <>
                                         <Grid item xs={12}>
                                            <Typography
                                              variant="h5"
                                              color="textSecondary"
                                            >
                                              <ShowMoreText
                                                lines={3}
                                                more={"Read More"}
                                                less={"Less More"}
                                                onClick={onShowMore}
                                                expanded={expand}
                                              >
                                                {row[`${remediation.column[vkey].field}`].replace(/,/g, " ") }
                                              </ShowMoreText>
                                            </Typography>

                                         </Grid>
                                        </>
                                    )  : row[`${remediation.column[vkey].field}`]
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

export default Remediation;