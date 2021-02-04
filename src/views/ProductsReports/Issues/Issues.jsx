import { Divider, Grid, Typography, Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,Box
 } from '@material-ui/core';
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
  
}));

const Issues = ({ issues, reportName, reportType,counter }) => {

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


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickRow = async (event, value) => {
    const selectedIndex = selected.indexOf(value);
    let newSelected = [];
    newSelected = newSelected.concat([], value);
    setSelected(newSelected);
  }; 
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
              <ListItem button>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={state.isHighIssueChecked}
                      onChange={handleCheckBoxChange}
                      name="isHighIssueChecked"
                      color="primary"
                    />
                  )}
                  label="High"
                />
              </ListItem>
              <ListItem button>

                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={state.isMediumIssueChecked}
                      onChange={handleCheckBoxChange}
                      name="isMediumIssueChecked"
                      color="primary"
                    />
                  )}
                  label="Medium"
                />
              </ListItem>

              <ListItem button>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={state.isLowIssueChecked}
                      onChange={handleCheckBoxChange}
                      name="isLowIssueChecked"
                      color="primary"
                    />
                  )}
                  label="Low"
                />
              </ListItem>

            </List>
            <div style={{ width: '100%' }}>
              {state.isHighIssueChecked &&
                (issues.HIGH || issues.high) ?
                <>
                  <PackageJSON jsonName="HIGH" packageJSON={issues.HIGH ? issues.HIGH : issues.medium} />
                </>
                : ''}
              {state.isMediumIssueChecked &&
                (issues.MEDIUM || issues.medium) ?
                <>
                  <PackageJSON jsonName="MEDIUM" packageJSON={issues.MEDIUM ? issues.MEDIUM : issues.medium} />
                </>
                : ''}
              {state.isLowIssueChecked &&
                (issues.LOW || issues.low) ? <>
                  <PackageJSON jsonName="LOW" packageJSON={issues.LOW ? issues.LOW : issues.low} />
                </>
                : ''}
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
      <Grid
           container
              style={{ marginTop: 10,marginBottom: 10 }}
              spacing={2}
              className="report-dashboardData"
           >
          {Object.keys(counter).map(key => 
            <ReportCount header={key} index={key%4} value={counter[key]} />
          )}
      </Grid>
    <Grid
          item
          xs={12}          
          md={12}
          className="repost-issuelist"
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
     </Grid>
  );
};

export default Issues;