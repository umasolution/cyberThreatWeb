import React, { useState, useEffect, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardHeader,
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Chart from './Chart';

const useStyles = makeStyles((theme) => ({
  root: {},
  current: {
    marginTop: theme.spacing(0.5),
    marginRight: theme.spacing(0.5)
  },
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  }
}));

function getRandomInt(min, max) {
  // eslint-disable-next-line no-param-reassign
  min = Math.ceil(min);
  // eslint-disable-next-line no-param-reassign
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function RealTime({ className,lib_details,  ...rest }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();


  const pages = [
    {
      pathname: '/app/projects',
      views: '24'
    },
    {
      pathname: '/app/chat',
      views: '21'
    },
    {
      pathname: '/cart',
      views: '15'
    },
    {
      pathname: '/cart/checkout',
      views: '8'
    }
  ];

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        classes={{ action: classes.current }}
        subheaderTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
        title="Libraries with most vulnerabilities"
        titleTypographyProps={{ color: 'textPrimary' }}
      />
      <List>
        {lib_details.map((page) => (
          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={page.product}
          >
            <ListItemText
              primary={page.product}
              primaryTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
            />
            <Typography color="inherit">
              {page.count}
            </Typography>
          </ListItem>
        ))}
      </List>
      <Box
        p={2}
        display="flex"
        justifyContent="flex-end"
      >
        <Button
          component={RouterLink}
          size="small"
          to="#"
        >
          See all
          <NavigateNextIcon className={classes.navigateNextIcon} />
        </Button>
      </Box>
    </Card>
  );
}

RealTime.propTypes = {
  className: PropTypes.string
};

export default RealTime;
