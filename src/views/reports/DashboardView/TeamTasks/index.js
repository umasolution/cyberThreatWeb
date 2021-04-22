import { Card, CardHeader, ListItem, ListItemText, makeStyles, TextField, Typography,Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,Divider } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { List as VirtualizedList } from 'react-virtualized';
import Copy from "../../../../Util/Copy";
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import CloseIcon from '@material-ui/icons/Close';


const useStyles = makeStyles(() => ({
  root: {}
}));

function TeamTasks({ className, project_vuln_details, ...rest }) {
  const classes = useStyles();

  const height = 448;
  const rowHeight = 25;
  const width = 265;

  const originalLibDetails = useRef(project_vuln_details);

  const [searchedLibDetails, setSearchedLibDetails] = useState(Copy(project_vuln_details));
  const [searchInput, setSearchInput] = useState();

   const [openSearch, setOpenSearch] = useState(false);

  const handleSearchOpen = () => {
    setOpenSearch(true);
  };

  const handleSearchClose = () => {
    setOpenSearch(false);
  };

  const rowRenderer = ({ index, isScrolling, key, style }) => {
    console.log(searchedLibDetails);
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
    const filteredResult = originalLibDetails.current.filter(details => details.project.toLowerCase().includes(event.target.value)
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
        title="Projects with most vulnerabilities"
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

TeamTasks.propTypes = {
  className: PropTypes.string
};

export default TeamTasks;
