import {
  Container, ExpansionPanel,
  ExpansionPanelDetails, ExpansionPanelSummary, Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { cloneDeep } from 'lodash';
import MaterialTable from 'material-table';
import React from 'react';
import CWEPieChart from "../../ProductsReports/ReportSummary/CWEPieChart/CWEPieChart";
import SeverityBarChart from "../../ProductsReports/ReportSummary/SeverityBarChart/SeverityBarChart";
import './TabsData.css';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: 'inherit' // theme.palette.background.paper,
  }
}));

const TabsData = ({ reportType, tabsData, expandPanel, bgcolor }) => {

  const classes = useStyles();


  const getTable = (tabData) => {
    if (!tabData.tableData) return;
    const columns = cloneDeep(tabData.tableData.columns);
    const severityColumn = columns.find(column => column.field === 'severity');
    severityColumn.render = rowData => {
      const rowDataSeverity = rowData.severity?.toLowerCase();
      const backgroundColor = rowDataSeverity === 'high' ? 'red'
        : rowDataSeverity === 'medium' ? 'yellow'
          : 'green';
      const color = rowDataSeverity === 'medium' ? 'black' : 'white';
      return (
        <div
          style={{
            backgroundColor,
            color,
            textAlign: 'center',
            padding: '10px'
          }}
        >
          {rowData.severity}
        </div>
      )
    };

    return (
      <MaterialTable
        title={null}
        columns={columns}
        data={tabData.tableData.data}
        style={{ width: '100%' }}
      />
    );
  };

  // const getHeader = (headers) => {
  //   return (
  //     <div className="flex">
  //       {
  //         headers.map(header => {
  //           return (
  //             <Paper style={{ padding: '10px' }}>
  //               <div>
  //                 <h6 className="details-header">
  //                   {Object.keys(header)[0]}
  //                 </h6>
  //               </div>
  //               {header[Object.keys(header)[0]]}
  //             </Paper>
  //           )
  //         })
  //       }
  //     </div>
  //   )

  // }

  const getCharts = (tabData, appName) => {
    const width = 200;
    const height = 200;
    return (
      <div className="flex justifyAround">
        {
          tabData.header && <CWEPieChart
            cwe={tabData.header}
            divId={`${appName}-header-pieChart`}
            bgColor="white"
            width={width}
            height={height}
            title="Vulnerabilities"
          />
        }
        {tabData.severity ? <SeverityBarChart
          severity={tabData.severity}
          divId={`${appName}-barChart`}
          bgColor="white"

        /> : ''}
        {tabData.CWE ? <CWEPieChart
          cwe={tabData.CWE}
          divId={`${appName}-pieChart`}
          bgColor="white"
          width={width}
          height={height}
        /> : ''}
      </div>
    )
  }

  return (
    <Container className={classes.root} maxWidth="lg">
      <Grid style={{ width: '100%' }} container spacing={1}>
        <List style={{ width: '100%' }} dense={false}>
          {tabsData.map((tabData) => {
            return (
              <ExpansionPanel
                key={tabData.appName}
                style={{ borderLeft: `15px solid  ${bgcolor}`, width: '100%' }}
                onChange={(event, expanded) =>
                  expandPanel(event, expanded, tabData, reportType)}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <ListItem key={tabData.appName}>
                    <ListItemIcon>
                      <img
                        className="languageImg"
                        src={`${process.env.PUBLIC_URL}/static/images1/${tabData.imageName}`}
                        alt="t"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={tabData.appName}
                      secondary={tabData.description}
                    />
                  </ListItem>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div style={{ width: '100%' }}>
                    {/* {tabData.tableData?.header ? getHeader(tabData.tableData?.header) : null} */}
                    {tabData.tableData ? getCharts(tabData.tableData, tabData.appName) : null}
                    {tabData.tableData
                      ? getTable(tabData)
                      : 'Loading Data...'}
                  </div>

                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </List>
      </Grid>
    </Container>
  );
};

export default TabsData;
