import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  Typography,
  makeStyles,
  Grid
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Label from 'src/components/Label';
import { THEMES } from 'src/constants';
import ReportCount from './../ReportCount/ReportCount';

function CountData({ counter}) {
  const classes = useStyles();  

  return (
    <Grid
         container
            style={{ marginTop: 10,marginBottom: 10 }}
            spacing={2}
            className="report-dashboardData"
         >
        {Object.keys(counter).map(key => 
          <ReportCount header={key} index={key%4} value={counter[key]} />
        )}
    </Grid>
  );
}

export default CountData;
