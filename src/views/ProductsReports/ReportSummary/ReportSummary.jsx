import React from 'react';
import { Grid, Paper,Card,Typography,List,ListItem,ListItemText,Box,Divider,CardContent,CardHeader } from '@material-ui/core';
import SeverityBarChart from './SeverityBarChart/SeverityBarChart';
import CWEPieChart from './CWEPieChart/CWEPieChart';
import ReportCount from './../ReportCount/ReportCount';
import isEmpty from './../../../Util/Util';
import PerformanceOverTime from './../../reports/DashboardView/PerformanceOverTime';
import ChartSecond from './../../reports/DashboardView/ChartSecond';
import RealTime from './../../reports/DashboardView/RealTime';
import { getBackgroundColorBySeverity, getFontColorBySeverity } from './../../../Util/Util';
import moment from 'moment';
import { setDateFormat } from './../../../Util/Util';


const ReportSummary = ({ summary, headerDate, projectName, isDocker = false, divId }) => {
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
          {
          Object.entries(summary.counter).map(([key, value],index) => (
            <ReportCount header={key} value={value} index={index%4} />
          ))}
          
      </Grid>      
      {
        isDocker ? (
          <>
            <Grid
                container
                spacing={2}
                className="report-summary-box"
              >
                <Grid
                  item
                  lg={3}
                  xs={12}
                  className="report-summary-box-left"
                >
                  <Grid
                        item
                        style={{ marginBottom: 10 }}
                        lg={12}
                        xs={12}
                        className="reports-charts-cwe"
                      >
                    <CWEPieChart title={summary.reports_charts.cwe.title} cwe={summary.reports_charts.cwe.charts} />
                  </Grid>
                  <Grid
                        item
                        style={{ marginBottom: 10 }}
                        lg={12}
                        xs={12}
                        className="reports-charts-severity"
                      >
                   <SeverityBarChart title={summary.reports_charts.severity.title} severity={summary.reports_charts.severity.charts} />
                  </Grid>
                  {summary.lastscan && (<Grid
                        item
                        style={{ marginBottom: 10 }}
                        lg={12}
                        xs={12}
                        className="lastscan-box"
                      >
                  <Card>
                    <CardHeader
                      title="Last Scan Results"        
                    />
                    <Divider />
                  <CardContent >
                    <List component="ul" className="lastscanlist">
                           <ListItem>
                              <ListItemText>
                              <Box className="lastscan-title">Report Date: </Box>
                              <Box className="lastscan-content">{moment(setDateFormat(summary.lastscan[0]['date']).replace("_"," ")).format('MMM DD, YYYY')}
                              </Box>
                              </ListItemText>
                            </ListItem> 
                           <ListItem>
                              <ListItemText>
                              <Box className="lastscan-title">Total Scanned Dependancies: </Box>
                              <Box className="lastscan-content">{summary.lastscan[0]['Total Scanned Dependancies']}
                              </Box>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>
                              <Box className="lastscan-title">Total Unique Vulnerabilities: </Box>
                              <Box className="lastscan-content">{summary.lastscan[0]['Total Unique Vulnerabilities']}
                              </Box>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>
                              <Box className="lastscan-title">Total Vulnerable Dependencies: </Box>
                              <Box className="lastscan-content">{summary.lastscan[0]['Total Vulnerable Dependencies']}
                              </Box>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>
                              <Box className="snapshot-block">
                                <Box className="snapshot-title">Severity : </Box>
                                <Box className="snapshot-content">
                                  <Box className="scoreblock-severity-div">
                                    {Object.entries(summary.lastscan[0]['severity']).map((severity) => (
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
                               </Box> 
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>
                              <Box className="snapshot-block">
                                <Box className="snapshot-title">Vulnerabilities : </Box>
                                <Box className="snapshot-content">
                                  <Box className="scoreblock-severity-div">
                                    {Object.entries(summary.lastscan[0]['vulnerabilities']).map((vulnerabilities) => (
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
                               </Box> 
                              </ListItemText>
                            </ListItem>
                      </List> 
                   </CardContent>   
                      {/*<List component="ul" className="snapshotlist">
                          {Object.entries(summary.lastscan[0]).map((scan_insights) => (
                            <>
                            <ListItem>
                                <ListItemText>
                                {scan_insights[0]=='date' ? (<>
                                <Box className="date-block">
                                <Box className="snapshot-title">Report Date: </Box>
                                <Box className="snapshot-content">{moment(setDateFormat(scan_insights[1]).replace("_"," ")).format('MMM DD, YYYY')}</Box> </Box></>):''}
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
                              </ListItemText>
                              </ListItem>                                
                            </>
                          ))}
                
                        </List> */}
                  </Card>
                  </Grid>)}
                  <Grid
                        item
                        style={{ marginBottom: 10 }}
                        lg={12}
                        xs={12}
                        className="project-summary-box"
                      >
                  <RealTime lib_details={summary.productwise} headtitle="Libraries with most vulnerabilities" />

                  </Grid>
                </Grid>
                <Grid
                    item
                    lg={9}
                    xs={12}
                    className="report-summary-box-right chartlist"
                  >
                
                  { 
                      Object.entries(summary.projects_charts).map(([ckey, charts],k) =>(<>
                        <Grid
                          item
                          style={{ marginBottom: 10 }}
                          lg={12}
                          xs={12}
                        >
                         {ckey=='chart1'?(<PerformanceOverTime chartsMainKey={k} chartsKey={ckey} chartsData={charts}/>):(<ChartSecond chartsMainKey={k} chartsKey={ckey} chartsData={charts}/>)}
                         </Grid>
                        </>))
                    
                  } 
                  </Grid>
              </Grid>
          </>
        )
          : (
            <Grid
                container
                spacing={2}
                className="report-summary-box"
              >
                <Grid
                  item
                  lg={3}
                  xs={12}
                  className="report-summary-box-left"
                >
                  <Grid
                        item
                        style={{ marginBottom: 10 }}
                        lg={12}
                        xs={12}
                        className="reports-charts-cwe"
                      >
                    <CWEPieChart title={summary.reports_charts.cwe.title} cwe={summary.reports_charts.cwe.charts} />
                  </Grid>
                  <Grid
                        item
                        style={{ marginBottom: 10 }}
                        lg={12}
                        xs={12}
                        className="reports-charts-severity"
                      >
                   <SeverityBarChart title={summary.reports_charts.severity.title} severity={summary.reports_charts.severity.charts} />
                  </Grid>
                  {summary.lastscan && (<Grid
                        item
                        style={{ marginBottom: 10 }}
                        lg={12}
                        xs={12}
                        className="lastscan-box"
                      >
                  <Card>
                    <CardHeader
                      title="Last Scan Results"        
                    />
                    <Divider />
                  <CardContent>
                    <List component="ul" className="lastscanlist">
                           <ListItem>
                              <ListItemText>
                              <Box className="lastscan-title">Report Date: </Box>
                              <Box className="lastscan-content">{moment(setDateFormat(summary.lastscan[0]['date']).replace("_"," ")).format('MMM DD, YYYY')}
                              </Box>
                              </ListItemText>
                            </ListItem> 
                           <ListItem>
                              <ListItemText>
                              <Box className="lastscan-title">Total Scanned Dependancies: </Box>
                              <Box className="lastscan-content">{summary.lastscan[0]['Total Scanned Dependancies']}
                              </Box>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>
                              <Box className="lastscan-title">Total Unique Vulnerabilities: </Box>
                              <Box className="lastscan-content">{summary.lastscan[0]['Total Unique Vulnerabilities']}
                              </Box>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>
                              <Box className="lastscan-title">Total Vulnerable Dependencies: </Box>
                              <Box className="lastscan-content">{summary.lastscan[0]['Total Vulnerable Dependencies']}
                              </Box>
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>
                              <Box className="snapshot-block">
                                <Box className="snapshot-title">Severity : </Box>
                                <Box className="snapshot-content">
                                  <Box className="scoreblock-severity-div">
                                    {Object.entries(summary.lastscan[0]['severity']).map((severity) => (
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
                               </Box> 
                              </ListItemText>
                            </ListItem>
                            <ListItem>
                              <ListItemText>
                              <Box className="snapshot-block">
                                <Box className="snapshot-title">Vulnerabilities : </Box>
                                <Box className="snapshot-content">
                                  <Box className="scoreblock-severity-div">
                                    {Object.entries(summary.lastscan[0]['vulnerabilities']).map((vulnerabilities) => (
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
                               </Box> 
                              </ListItemText>
                            </ListItem>
                      </List> 
                   </CardContent>   
                      {/*<List component="ul" className="snapshotlist">
                          {Object.entries(summary.lastscan[0]).map((scan_insights) => (
                            <>
                            <ListItem>
                                <ListItemText>
                                {scan_insights[0]=='date' ? (<>
                                <Box className="date-block">
                                <Box className="snapshot-title">Report Date: </Box>
                                <Box className="snapshot-content">{moment(setDateFormat(scan_insights[1]).replace("_"," ")).format('MMM DD, YYYY')}</Box> </Box></>):''}
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
                              </ListItemText>
                              </ListItem>                                
                            </>
                          ))}
                
                        </List> */}
                  </Card>
                  </Grid>)}
                  <Grid
                        item
                        style={{ marginBottom: 10 }}
                        lg={12}
                        xs={12}
                        className="project-summary-box"
                      >
                  <RealTime lib_details={summary.productwise} headtitle="Libraries with most vulnerabilities" />

                  </Grid>
                </Grid>
                <Grid
                    item
                    lg={9}
                    xs={12}
                    className="report-summary-box-right chartlist"
                  >
                
                  { 
                      Object.entries(summary.projects_charts).map(([ckey, charts],k) =>(<>
                        <Grid
                          item
                          style={{ marginBottom: 10 }}
                          lg={12}
                          xs={12}
                        >
                         {ckey=='chart1'?(<PerformanceOverTime chartsMainKey={k} chartsKey={ckey} chartsData={charts}/>):(<ChartSecond chartsMainKey={k} chartsKey={ckey} chartsData={charts}/>)}
                         </Grid>
                        </>))
                    
                  } 
                  </Grid>
              </Grid>
          )
      }

      
    </Grid>
  );
};

export default ReportSummary;