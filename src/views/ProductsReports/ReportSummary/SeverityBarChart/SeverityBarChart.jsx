import React, { useEffect } from 'react';
import { Plotly } from "../../../../Util/Constants";
import { getBackgroundColorBySeverity } from '../../../../Util/Util';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles
} from '@material-ui/core';

const SeverityBarChart = ({ severity, divId, displayModeBar = true, title = 'Severity', bgColor = "#fff", width = 300, height = 280 }) => {

  useEffect(() => {

    if (severity) {
      const x = [];
      const y = [];
      const colors = [];
      for (var key in severity) {
        x.push(key);
        y.push(severity[key]);
        colors.push(getBackgroundColorBySeverity(key));
      }  

      /*severity = JSON.parse(severity);*/
      /*severity.forEach(sev => {
        x.push(Object.keys(sev));
        y.push(sev[Object.keys(sev)]);
        colors.push(getBackgroundColorBySeverity(Object.keys(sev)));
      });*/

      const data = [
        {
          x,
          y,
          type: 'bar',
          // automargin: true,
          marker: {
            color: 'red'
          },
          width: 0.2,
        }
      ];
      const layout = {
        title:'',
        width,
        height,
        margin: { "t": 20, "b": 20, "l": 10, "r": 10 },
        showlegend: false,
        plot_bgcolor: bgColor,
        paper_bgcolor: bgColor,
        xaxis: {
          titlefont: {
            color: 'red'
          },
          tickfont: {
            color: 'red'
          },
          linecolor: 'red',
          zeroline: true,
          zerolinecolor: 'red',
          zerolinewidth: 1,
        },
        yaxis: {
          titlefont: {
            color: 'red'
          },
          tickfont: {
            color: 'red'
          },
          linecolor: 'red',
          zeroline: true,
          zerolinecolor: 'red',
          zerolinewidth: 1,
        },
      };
      const config = { responsive: true ,displayModeBar: false };
      Plotly.newPlot(`SeverityBarChartDiv-${divId}`, data, layout, config);
    }
  }, [])

  return (
    <Card>
    <CardHeader
        title={title}        
      />
      <Divider />
      <CardContent className="chart-data">
        <Box> 
        <div id={`SeverityBarChartDiv-${divId}`} />
        </Box>

      </CardContent>
    </Card>
    
  );
};

export default SeverityBarChart;