import React, { useEffect } from 'react';
import { Plotly } from "../../../../Util/Constants";
import { getBackgroundColorBySeverity } from '../../../../Util/Util';

const SeverityBarChart = ({ severity, divId, displayModeBar = true, title = 'Severity', bgColor = "#f1f1f1", width = 360, height = 280 }) => {

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
            color: 'white'
          },
          width: 0.2,
        }
      ];
      const layout = {
        title,
        width,
        height,
        margin: { "t": 10, "b": 20, "l": 30, "r": 0 },
        showlegend: false,
        plot_bgcolor: bgColor,
        paper_bgcolor: bgColor,
        xaxis: {
          titlefont: {
            color: 'white'
          },
          tickfont: {
            color: 'white'
          },
          linecolor: 'white',
          zeroline: true,
          zerolinecolor: 'white',
          zerolinewidth: 1,
        },
        yaxis: {
          titlefont: {
            color: 'white'
          },
          tickfont: {
            color: 'white'
          },
          linecolor: 'white',
          zeroline: true,
          zerolinecolor: 'white',
          zerolinewidth: 1,
        },
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