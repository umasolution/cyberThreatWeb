import React, {
  useState,
  useEffect,
  useCallback
} from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  makeStyles,
  ThemeProvider,
  createMuiTheme
} from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import axios from 'src/utils/axios';
import getInitials from 'src/utils/getInitials';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import GenericMoreButton from 'src/components/GenericMoreButton';
import MaterialTable from 'material-table';

const technologyMap = {
  'html-css': '/static/images/technologies/html.svg',
  'react-js': '/static/images/technologies/react-js.svg',
  'vue-js': '/static/images/technologies/vue-js.svg',
  angular: '/static/images/technologies/angular.svg',
  figma: '/static/images/technologies/figma.svg',
  sketch: '/static/images/technologies/sketch.svg'
};

const useStyles = makeStyles((theme) => ({
  root: {},
  technology: {
    height: 30,
    '& + &': {
      marginLeft: theme.spacing(1)
    }
  },
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  }
}));

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h6: {
        fontSize: 16,
        fontFamily: '"Montserrat", sans-serif',
        color: '#546e7a',
      },
    },
  },
});


function LatestProjects({ className, project_details, ...rest }) {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      {/* <CardHeader
        action={<GenericMoreButton />}
        title="Latest Projects"
      /> */}
      {/* <Divider /> */}
      <Box>
        <ThemeProvider theme={theme}>
          <MaterialTable
            title="Open Vulnerabilities"
            columns={project_details.columns}
            data={project_details.data}
            style={{ width: '100%' }}
            className="secondary"
            options={{
              cellStyle: {
                fontSize: 13,
                fontFamily: '"Montserrat", sans-serif',
              },
              headerStyle: {
                fontSize: 16,
                fontFamily: '"Montserrat", sans-serif',
                color: '#546e7a',
              }
            }}
          />
        </ThemeProvider>
        {/* <Table>
            <TableHead>
              <TableRow>
                <TableCell sortDirection="desc">
                  <Tooltip
                    enterDelay={300}
                    title="Sort"
                  >
                    <TableSortLabel
                      active
                      direction="desc"
                    >
                      Project Name
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  Owner
                </TableCell>
                <TableCell>
                  Amount
                </TableCell>
                <TableCell>
                  Technology
                </TableCell>
                <TableCell align="right">
                  Date
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow
                  hover
                  key={project.id}
                >
                  <TableCell>
                    {project.title}
                  </TableCell>
                  <TableCell>
                    <Box
                      display="flex"
                      alignItems="center"
                    >
                      <Avatar
                        alt="Author"
                        className={classes.avatar}
                        src={project.author.avatar}
                      >
                        {getInitials(project.author.name)}
                      </Avatar>
                      <Box ml={1}>
                        {project.author.name}
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {project.currency}
                    {project.price}
                  </TableCell>
                  <TableCell>
                    {project.technologies.map((technology) => (
                      <img
                        alt="Tech"
                        key={technology}
                        className={classes.technology}
                        src={technologyMap[technology]}
                      />
                    ))}
                  </TableCell>
                  <TableCell align="right">
                    {moment(project.createdAt).format('DD MMM, YYYY')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> */}
      </Box>
    </Card>
  );
}

LatestProjects.propTypes = {
  className: PropTypes.string
};

export default LatestProjects;
