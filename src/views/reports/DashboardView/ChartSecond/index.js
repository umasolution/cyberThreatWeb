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

function ChartSecond({ className, chartsMainKey,chartsKey,chartsData, ...rest }) {
  const classes = useStyles();
  const apps = Object.keys(chartsData.data);
  /*console.log(chartsMainKey);
  console.log(chartsKey);*/
  const [app, setApp] = React.useState(apps[0]);

  useEffect(() => {
    createChart();
  }, [app]);

  const createChart = () => {
    let progressChartData = chartsData.data;
    progressChartData = progressChartData[app];
    const xAxis = [];
    const yAxises = new Map();
    for (let i = 0; i < progressChartData.length; i++) {
      const progress = progressChartData[i];
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
      title: 'Performance Over Time',
      margin: {
        b: 120,
      },
    };
    const config = { responsive: true };
    Plotly.newPlot('myDiv2', dd, layout, config);
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
        title={chartsData.title}        
      />
      <Divider />
      <CardContent className="chart-data">
        <Box
          height={375}
           
        >
          <FormControl style={{ width: '20%' }}>
            <InputLabel id="demo-simple-select-label">Projects Chart</InputLabel>
            <Select
              labelId="chart-select-label"
              id="chart-simple-select"
              value={app}
              onChange={handleChange}
            >
              {apps.map(appp => <MenuItem value={appp}>{appp}</MenuItem>)}
            </Select>
          </FormControl>
          <div id='myDiv2' />

        </Box>

      </CardContent>
    </Card>
  );
}

ChartSecond.propTypes = {
  className: PropTypes.string
};

export default ChartSecond;