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

const useStyles = makeStyles(() => ({
  root: {},
  chart: {
    height: '100%'
  }
}));

function PerformanceOverTime({ className, ...rest }) {
  const classes = useStyles();
  const performance = {
    thisWeek: {
      data: [],
      labels: []
    },
    thisMonth: {
      data: [],
      labels: []
    },
    thisYear: {
      data: [101, 51, 121, 202, 132, 282, 182, 42, 132, 122, 132, 52],
      data1: [100, 50, 110, 200, 130, 280, 180, 40, 130, 120, 130, 50],
      labels: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    }
  };

  useEffect(() => {
    var high = {
      x: ['Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'],
      y: [160, 50, 110, 90, 900, 120, 302, 102, 203, 3330, 3320, 2110],
      type: 'scatter',
      name: 'High Vulnerabilities'
    };

    var mid = {
      x: ['Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'],
      y: [2111, 51, 71, 829, 30, 22, 62, 1622, 263, 33, 132, 1111],
      type: 'scatter',
      name: 'Midium Vulnerabilities'
    };

    var low = {
      x: ['Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'],
      y: [16, 5, 11, 9, 90, 12, 32, 12, 23, 333, 332, 211],
      type: 'scatter',
      name: 'Low Vulnerabilities'
    };
    var layout = {
      title: 'Performance Over Time'
    };
    var dd = [high, mid, low];

    Plotly.newPlot('myDiv', dd, layout);
  });

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        
          <Box
            height={375}
            minWidth={500}
          >
            <div id='myDiv'></div>
          </Box>
        
      </CardContent>
    </Card>
  );
}

PerformanceOverTime.propTypes = {
  className: PropTypes.string
};

export default PerformanceOverTime;
