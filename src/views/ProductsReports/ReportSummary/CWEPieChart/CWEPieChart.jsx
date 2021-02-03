import React, { useEffect } from 'react';
import { Plotly } from "../../../../Util/Constants";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles
} from '@material-ui/core';

const CWEPieChart = ({ cwe, divId, bgColor = "#fff", width = 300, height= 280, title="CWE" }) => {
  useEffect(() => {
    if (cwe) {
      const labels = [];
      const values = [];
      for (var key in cwe) {
        labels.push(key);
        values.push(cwe[key]);
      } 

      const data = [
        {
          labels,
          values,
          type: 'pie',
          textinfo: "none",
          hole: .5,
        }
      ];
      var layout = {
        title: '',
        width:  width,
        height: height,
        margin: { "t": 20, "b": 20, "l": 10, "r": 10 },
        showlegend: false,
        plot_bgcolor: bgColor,
        paper_bgcolor: bgColor,
      };
      var config = { responsive: true,displayModeBar: false }
      Plotly.newPlot(`CWEPieChartDiv-${divId}`, data, layout, config);
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
        <div id={`CWEPieChartDiv-${divId}`} />
        </Box>

      </CardContent>
    </Card>
    
  );
};

export default CWEPieChart;