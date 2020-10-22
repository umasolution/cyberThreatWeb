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
    return searchedLibDetails && (
      <div className="odd-even-background"  key={key} style={style}>

          <TableRow>
          <TableCell><Typography color="inherit"
            className="secondary"
          >
            {searchedLibDetails[index].project}
          </Typography></TableCell>
          <TableCell><Typography color="inherit"
            className="secondary"
          >
            {searchedLibDetails[index].count}
          </Typography></TableCell>
        </TableRow>
      </div>
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
        action={
          <IconButton aria-label="settings">
            <SearchIcon onClick={handleSearchOpen} />
          </IconButton>
        }
      /> }
      { openSearch ? <TextField
        value={searchInput}
        onChange={handleChangeSearch}
        style={{
          marginLeft: '15px'
        }}
        className="secondary"
        labelClassName="secondary"
        id="search"
        label="Search"
      /> : null }
      { openSearch ? <IconButton aria-label="settings">
            <CloseIcon onClick={handleSearchClose} />
          </IconButton> : null }
    
       <Divider />
      

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
    </Card>
  );
}

TeamTasks.propTypes = {
  className: PropTypes.string
};

export default TeamTasks;
