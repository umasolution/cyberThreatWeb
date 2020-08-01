import React, { useEffect } from 'react';
import { Plotly } from "../../../../Util/Constants";

const SeverityBarChart = ({ severity, divId }) => {

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
      const config = { responsive: true };
      Plotly.newPlot(`SeverityBarChartDiv-${divId}`, data, layout, config);
    }
  }, [])

  return (
    <div id={`SeverityBarChartDiv-${divId}`} />
  );
};

export default SeverityBarChart;