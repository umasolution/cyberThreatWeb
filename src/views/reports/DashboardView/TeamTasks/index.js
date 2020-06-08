import React, {
  useCallback,
  useState,
  useEffect
} from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  List,
  makeStyles,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import GenericMoreButton from 'src/components/GenericMoreButton';
import TaskItem from './TaskItem';

const useStyles = makeStyles(() => ({
  root: {}
}));

function TeamTasks({ className,project_vuln_details, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
      style={{ width: 'fit-content'}}
    >
      <CardHeader
        classes={{ action: classes.current }}
        subheaderTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
        title="Projects with most vulnerabilities"
        titleTypographyProps={{ color: 'textPrimary' }}
      />
      <List>
        {project_vuln_details.map((page) => (
          <ListItem
            classes={{ divider: classes.itemDivider }}
            divider
            key={page.project}
          >
            <ListItemText
              primary={page.project}
              primaryTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
            />
            <Typography color="inherit">
              {page.count}
            </Typography>
          </ListItem>
        ))}
      </List>
    </Card>
  );
}

TeamTasks.propTypes = {
  className: PropTypes.string
};

export default TeamTasks;
