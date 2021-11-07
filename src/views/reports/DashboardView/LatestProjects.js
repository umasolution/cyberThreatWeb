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
        fontFamily: '"Montserrat",sans-serif !important',
        color: '#546e7a',
      },
    },
  },
});


function LatestProjects({ className, project_details,onClickRow, ...rest }) {
  const classes = useStyles();
  const [selectedRow,setSelectedRow] =useState(null);
  const handleOnRowClick = (row) => {
    console.log(row);
    const splittedArray = row.reportname.split('/');
    window.open('http://'+window.location.host+'/app/productsreports/'+splittedArray[splittedArray.length-2]+'/'+splittedArray[splittedArray.length-1])
   // onClickRow('key',row[`vulnerability`].split('/')[0]);
   // setSelectedRow(row.tableData.id);

  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box>
        <ThemeProvider theme={theme}>
          <MaterialTable
            title="Open Vulnerabilities"
            columns={project_details.columns}
            data={project_details.data}
            style={{ width: '100%' }}
            className="secondary"
            onRowClick = {(event,row)=>{handleOnRowClick(row)}}
            options={{
              pageSize: 10,  
              toolbarStyle: {
                fontSize: 19,
                fontFamily: '"Montserrat",sans-serif !important',
                fontWeight: 400
              },
              cellStyle: {
                fontSize: 19,
                fontFamily: '"Montserrat",sans-serif !important',
                fontWeight: 400
              },
              headerStyle: {
                fontSize: 19,
                fontFamily: '"Montserrat",sans-serif !important',
                fontWeight: 600,
                borderBottom: '1px solid rgba(224, 224, 224, 1)'
              },
              rowStyle: x => ({
                backgroundColor:(selectedRow === x.tableData.id)?'#027de7':'white',
                color:(selectedRow === x.tableData.id)?'white':'black'
               
            })
            }}
          />
        </ThemeProvider>
      </Box>
    </Card>
  );
}

LatestProjects.propTypes = {
  className: PropTypes.string
};

export default LatestProjects;
