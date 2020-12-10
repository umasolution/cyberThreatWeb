import { Box, Card, CardHeader, ListItem, ListItemText, makeStyles, TextField, Typography,Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,Divider } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { List as VirtualizedList } from 'react-virtualized';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Copy from "../../../../Util/Copy";
import './index.css';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles((theme) => ({
  root: {},
  navigateNextIcon: {
    marginLeft: theme.spacing(1)
  },
}));

function getRandomInt(min, max) {
  // eslint-disable-next-line no-param-reassign
  min = Math.ceil(min);
  // eslint-disable-next-line no-param-reassign
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function TableList({ className, lib_details, ...rest }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();

  const originalLibDetails = useRef(lib_details);

  const [searchedLibDetails, setSearchedLibDetails] = useState(Copy(lib_details));
  const [searchInput, setSearchInput] = useState();

  const [openSearch, setOpenSearch] = useState(false);

  const handleSearchOpen = () => {
    setOpenSearch(true);
  };

  const handleSearchClose = () => {
    setOpenSearch(false);
  };


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

  const height = 309;
  const rowHeight = 52;
  const width = 398;
  

  const rowRenderer = ({ index, isScrolling, key, style }) => {
    return searchedLibDetails && (
        
        <TableRow className="odd-even-background">
          <TableCell style={{width: '50%'}}><Typography color="inherit"
            className="secondary"
          >
             {searchedLibDetails[index].name}
          </Typography></TableCell>
          <TableCell style={{width: '10%'}}><Typography color="inherit"
            className="secondary"
          >
            {searchedLibDetails[index].value}
          </Typography></TableCell>
        </TableRow>
    )
      ;
  };

  const handleChangeSearch = (event) => {
    const filteredResult = originalLibDetails.current.filter(details => details.product.toLowerCase().includes(event.target.value)
      || details.count.toString().toLowerCase().includes(event.target.value));
    setSearchedLibDetails(filteredResult);
    setSearchInput(event.target.value);
  }

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      
    { openSearch ? null : <CardHeader
        title="Libraries with most vulnerabilities"
      /> }
      { openSearch ? <TextField
        required
        value={searchInput}
        onChange={handleChangeSearch}
        className="secondary"
        labelClassName="secondary"
        style={{
          marginLeft: '15px',
        }}
        id="search"
        placeholder="Search"
      /> : null }
      
      <Divider />
      <Table>
        <TableBody>
      {searchedLibDetails && (
        <VirtualizedList
          rowCount={searchedLibDetails.length}
          width={width}
          height={height}
          rowHeight={rowHeight}
          rowRenderer={rowRenderer}
          overscanRowCount={3}
        />
      )}
       </TableBody>
      </Table>
    </Card>
  );
}

TableList.propTypes = {
  className: PropTypes.string
};

export default TableList;
