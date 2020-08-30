import React, { useEffect } from 'react';
import { Plotly } from "../../../../Util/Constants";

const CWEPieChart = ({ cwe, divId, bgColor = "#f1f1f1", width = 360, height= 280, title="CWE" }) => {
  useEffect(() => {
    if (cwe) {
      const labels = [];
      const values = [];
      cwe.forEach(sev => {
        labels.push(Object.keys(sev)[0]);
        values.push(sev[Object.keys(sev)[0]]);
      })
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
        title: title,
        width:  width,
        height: height,
        margin: { "t": 30, "b": 10, "l": 0, "r": 0 },
        showlegend: false,
        plot_bgcolor: bgColor,
        paper_bgcolor: bgColor,
      };
      var config = { responsive: true }
      Plotly.newPlot(`CWEPieChartDiv-${divId}`, data, layout, config);
    }
  }, [])

  return (
    <div id={`CWEPieChartDiv-${divId}`} />
  );
};

export default CWEPieChart;