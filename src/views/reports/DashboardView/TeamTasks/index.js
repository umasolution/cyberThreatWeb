import { Card, CardHeader, ListItem, ListItemText, makeStyles, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { List as VirtualizedList } from 'react-virtualized';
import Copy from "../../../../Util/Copy";


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

  const rowRenderer = ({ index, isScrolling, key, style }) => {
    return searchedLibDetails && (
      <div className="odd-even-background"  key={key} style={style}>
        <ListItem
          classes={{ divider: classes.itemDivider }}
          divider
          className="spaceBetween"
          key={searchedLibDetails[index].project}
        >
          <Typography color="inherit"
            className="secondary"
          >
            {searchedLibDetails[index].project}
          </Typography>
          <Typography color="inherit"
            className="secondary">
            {searchedLibDetails[index].count}
          </Typography>
        </ListItem>
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
        <Typography
        component="h4"
        gutterBottom
        variant="overline"
        className="margin-general fontsize"
        color="textSecondary"
      >
       Projects with most vulnerabilities
        </Typography>

      <TextField
        value={searchInput}
        onChange={handleChangeSearch}
        style={{
          marginLeft: '15px'
        }}
        className="secondary"
        labelClassName="secondary"
        id="search"
        label="Search"
      />

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
