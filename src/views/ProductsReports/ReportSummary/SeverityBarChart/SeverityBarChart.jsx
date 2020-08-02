import React, { useEffect } from 'react';
import { Plotly } from "../../../../Util/Constants";

const SeverityBarChart = ({ severity, divId, bgColor = "#f1f1f1", width = 360, height= 280 }) => {

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
        width:  width,
        height: height,
        // margin: { "t": 0, "b": 0, "l": 0, "r": 0 },
        showlegend: false,
        plot_bgcolor: bgColor,
        paper_bgcolor: bgColor
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