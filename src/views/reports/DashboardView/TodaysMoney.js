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
import './index.css';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height:85
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: 48,
    width: 48
  },
  contentH3: {
     fontWeight: theme.fontfamily.semiBold,
     fontSize: '20px',
     lineHeight: 1.5
  }
}));

function TodaysMoney({ className,header, value,index, ...rest }) {
  const classes = useStyles();  

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Grid container
          spacing={2}>
        <Grid
          item
          lg={9}
          xs={9}
        >
          <Typography
          component="h3"
          gutterBottom
          className={classes.contentH3}
          variant="overline"
          color="textSecondary"
        >
         {header}
        </Typography>
        </Grid>
        <Grid
          item
          lg={3}
          xs={3}
        >
          <Avatar variant="rounded" className={`rounded-dashboard rounded-color-${index}`}>
            {value}
          </Avatar>
        </Grid>
      </Grid>
    </Card>
  );
}

TodaysMoney.propTypes = {
  className: PropTypes.string
};

export default TodaysMoney;
