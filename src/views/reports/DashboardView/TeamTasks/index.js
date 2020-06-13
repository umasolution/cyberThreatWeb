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

  const height = 309;
  const rowHeight = 40;
  const width = 266;

  const originalLibDetails = useRef(project_vuln_details);

  const [searchedLibDetails, setSearchedLibDetails] = useState(Copy(project_vuln_details));
  const [searchInput, setSearchInput] = useState();

  const rowRenderer = ({ index, isScrolling, key, style }) => {
    return searchedLibDetails && (
      <div key={key} style={style}>
        <ListItem
          classes={{ divider: classes.itemDivider }}
          divider
          key={searchedLibDetails[index].project}
        >
          <ListItemText
            primary={searchedLibDetails[index].project}
            primaryTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
          />
          <Typography color="inherit">
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
      style={{ width: 'fit-content' }}
    >
      <CardHeader
        classes={{ action: classes.current }}
        subheaderTypographyProps={{ color: 'textSecondary', variant: 'body2' }}
        title="Projects with most vulnerabilities"
        titleTypographyProps={{ color: 'textPrimary' }}
      />

      <TextField
        required
        value={searchInput}
        onChange={handleChangeSearch}
        style={{
          marginLeft: '15px'
        }}
        id="search"
        placeholder="Search"
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
      {/* <List>
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
      </List> */}
    </Card>
  );
}

TeamTasks.propTypes = {
  className: PropTypes.string
};

export default TeamTasks;
