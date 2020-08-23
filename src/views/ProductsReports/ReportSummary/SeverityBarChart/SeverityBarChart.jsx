import React, { useEffect } from 'react';
import { Plotly } from "../../../../Util/Constants";
import { getBackgroundColorBySeverity } from '../../../../Util/Util';

const SeverityBarChart = ({ severity, divId, displayModeBar = true, title = 'Severity', bgColor = "#f1f1f1", width = 360, height = 280 }) => {

  useEffect(() => {
    if (severity) {
      const x = [];
      const y = [];
      const colors = [];
      severity.forEach(sev => {
        x.push(Object.keys(sev)[0]);
        y.push(sev[Object.keys(sev)[0]]);
        colors.push(getBackgroundColorBySeverity(Object.keys(sev)[0]));
      });

      const data = [
        {
          x,
          y,
          type: 'bar',
          // automargin: true,
          marker: {
            color: colors
          }
        }
      ];
      const layout = {
        title,
        width,
        height,
        margin: { "t": 10, "b": 20, "l": 30, "r": 0 },
        showlegend: false,
        plot_bgcolor: bgColor,
        paper_bgcolor: bgColor
      };
      const config = { responsive: true, displayModeBar };
      Plotly.newPlot(`SeverityBarChartDiv-${divId}`, data, layout, config);
    }
  }, [])

  return (
    <div id={`SeverityBarChartDiv-${divId}`} />
  );
};

export default SeverityBarChart;