import React, { useEffect } from 'react';
import { Plotly } from "../../../../Util/Constants";

const SeverityBarChart = ({ severity }) => {

  useEffect(() => {
    if (severity) {
      const x = [];
      const y = [];
      severity.forEach(sev => {
        x.push(Object.keys(sev)[0]);
        y.push(sev[Object.keys(sev)[0]]);
      })
      const data = [
        {
          x,
          y,
          type: 'bar',
          automargin: true
        }
      ];
      var layout = {
        title: 'Severity',
        width: 360,
        height: 280,
        showlegend: false,
        plot_bgcolor: "#f1f1f1",
        paper_bgcolor: "#f1f1f1"
      };
      Plotly.newPlot('SeverityBarChartDiv', data, layout);
    }
  }, [])

  return (
    <div id='SeverityBarChartDiv' />
  );
};

export default SeverityBarChart;