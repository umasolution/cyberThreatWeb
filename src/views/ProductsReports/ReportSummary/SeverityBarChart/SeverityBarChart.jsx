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

const SeverityBarChart = ({ severity, divId, displayModeBar = true, title = 'Severity', bgColor = "#fff", width = 280, height = 175 }) => {

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
            color: '#4285f4'
          },
          width: 0.2,
        }
      ];
      const layout = {
        title:'',
        width,
        height,
        margin: { "t": 0, "b": 20, "l": 10, "r": 10 },
        showlegend: false,
        plot_bgcolor: bgColor,
        paper_bgcolor: bgColor,
        xaxis: {
          titlefont: {
            color: '#a3a3a3'
          },
          tickfont: {
            color: '#a3a3a3'
          },
          linecolor: '#a3a3a3',
          zeroline: true,
          zerolinecolor: '#a3a3a3',
          zerolinewidth: 1,
        },
        yaxis: {
          titlefont: {
            color: '#a3a3a3'
          },
          tickfont: {
            color: '#a3a3a3'
          },
          linecolor: '#a3a3a3',
          zeroline: true,
          zerolinecolor: '#a3a3a3',
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