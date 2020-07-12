import React from 'react';
import { Grid, Paper } from '@material-ui/core';
import SeverityBarChart from './SeverityBarChart/SeverityBarChart';
import CWEPieChart from './CWEPieChart/CWEPieChart';

const ReportSummary = ({ summary, headerDate, projectName }) => {
  return (
    <Grid
      container
      spacing={1}
      style={{ display: 'block', margin: '5px' }}
    >
      <h6 className="details-header" style={{ display: 'block' }}>
        Vulnerability report for project "{projectName}" ({headerDate})
      </h6>
      <div style={{ display: 'flex', margin: '5px' }}>
        {summary.Severity ? <SeverityBarChart severity={summary.Severity} /> : ''}
        {summary.CWE ? <CWEPieChart cwe={summary.CWE} /> : ''}
        <div style={{ display: 'flex', margin: '5px', flexDirection: 'column' }}>
          <div style={{ display: 'flex', margin: '5px' }}>
            <Paper elevation={3} className="paper" style={{ marginRight: '10px' }}>
              <h5 className="details-header red-font" style={{ display: 'block', marginRight: '2px' }}>
                {summary['Total Scanned Packages']}
              </h5>
            Scanned Packages
        </Paper>
            <Paper elevation={3} className="paper" style={{ marginRight: '10px' }}>
              <h5 className="details-header red-font" style={{ display: 'block', marginRight: '2px' }}>
                {summary['Total Vulnerable Packages']}
              </h5>
            Vulnerable Packages
        </Paper>
            <Paper elevation={3} className="paper" style={{ marginRight: '10px' }}>
              <h6 className="details-header red-font" style={{ display: 'block', marginRight: '2px' }}>
                {summary['Total Unique Vulnerabilities']}
              </h6>
            Unique Vulnerabilities
        </Paper>
          </div>
          <h6 className="details-header" style={{ display: 'block' }}>
            Vulnerabilities Compared to previous scan on  {summary['last scan date']}
          </h6>
          <div style={{ display: 'flex', margin: '5px' }}>
            <Paper elevation={3} className="paper" style={{ marginRight: '10px', width:'117px' }}>
              <h6 className="details-header red-font" style={{ display: 'block', marginRight: '2px' }}>
                {summary['New Vulnerabilities']}
              </h6>
        New
          </Paper>
            <Paper elevation={3} className="paper" style={{ marginRight: '10px', width:'131px' }}>
              <h6 className="details-header red-font" style={{ display: 'block', marginRight: '2px' }}>
                {summary['Vulnerabilities Remediated']}
              </h6>
        Remediated
        </Paper>
            <Paper elevation={3} className="paper" style={{ marginRight: '10px', width:'141px' }}>
              <h6 className="details-header red-font" style={{ display: 'block', marginRight: '2px' }}>
                {summary['Vulnerabilities Carried Over']}
              </h6>
          Carried Over
        </Paper>
          </div>
        </div>
      </div>

      {/* <h6 className="details-header" style={{ display: 'block' }}>
        To view a complete report of vulnerability Trending information subscribe us
            </h6> */}
    </Grid>
  );
};

export default ReportSummary;