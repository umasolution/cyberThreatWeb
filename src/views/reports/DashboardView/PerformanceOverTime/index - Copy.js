import React, { useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  makeStyles
} from '@material-ui/core';
import GenericMoreButton from 'src/components/GenericMoreButton';
import Chart from './Chart';
import { Plotly } from '../../../../Util/Constants'
import isEmpty from './../../../../Util/Util';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: '100%'
  }
}));

function PerformanceOverTime({ className, chartsData, ...rest }) {
  const classes = useStyles();
  const apps = Object.keys(chartsData['Progress Chart'])
  const [app, setApp] = React.useState(apps[0]);
  const [cdata, setcData] = React.useState(apps[0]);

  useEffect(() => {
    createChart();
  }, [app]);

  const createChart = () => {
    let progressChartData = chartsData['Progress Chart'];
    progressChartData = progressChartData;
    for (const [ckey, cvalue] of Object.entries(progressChartData)) {
          const xAxis = [];
          const yAxises = new Map();
          for (const [pkey, pvalue] of Object.entries(cvalue.data)) {
            for (let i = 0; i < pvalue.length; i++) {
              const progress = pvalue[i];
              const keys = Object.keys(progress);
              for (let j = 0; j < keys.length; j++) {
                const key = keys[j];
                if (key.toLowerCase() === 'date') {
                  xAxis.push(progress[key]);
                  continue;
                }
                let entry = yAxises.get(key);
                if (isEmpty(entry)) {
                  entry = [];
                }
                entry.push(progress[key]);
                yAxises.set(key, entry);
              }

            }
          }
          var dd = [];
          for (let [key, value] of yAxises.entries()) {
            dd.push({
              x: xAxis,
              y: value,
              type: 'scatter',
              name: key,
              // automargin: true,
            })
          }
          var layout = {
            title: cvalue.title,
            margin: {
              b: 120,
            },
          };
          const config = { responsive: true };
          Plotly.newPlot('myDiv', dd, layout, config);
     }      

  }

  const handleChange = (event) => {
    setApp(event.target.value);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
    <CardHeader
        title="Libraries with most vulnerabilities"        
      />
      <Divider />
      <CardContent>
        <Box
          height={375}
           
        >
          <FormControl style={{ width: '20%' }}>
            <InputLabel id="demo-simple-select-label">Progress Chart</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={app}
              onChange={handleChange}
            >
              {apps.map(appp => <MenuItem value={appp}>{appp}</MenuItem>)}
            </Select>
          </FormControl>
          <div id='myDiv' />
        </Box>

      </CardContent>
    </Card>
  );
}

PerformanceOverTime.propTypes = {
  className: PropTypes.string
};

export default PerformanceOverTime;
