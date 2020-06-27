import { Box, Card, CardHeader, ListItem, ListItemText, makeStyles, TextField, Typography } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';
import { List as VirtualizedList } from 'react-virtualized';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import Copy from "../../../../Util/Copy";
import './index.css';

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

function RealTime({ className, lib_details, ...rest }) {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();

  const originalLibDetails = useRef(lib_details);

  const [searchedLibDetails, setSearchedLibDetails] = useState(Copy(lib_details));
  const [searchInput, setSearchInput] = useState();



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
  const rowHeight = 25;
  const width = 285;

  const rowRenderer = ({ index, isScrolling, key, style }) => {
    return searchedLibDetails && (
      <div key={key} style={style}>
        <ListItem
          classes={{ divider: classes.itemDivider }}
          divider
          className="spaceBetween"
          key={searchedLibDetails[index].product}
        >
          <Typography color="inherit"
            className="secondary"
          >
            {searchedLibDetails[index].product}
          </Typography>
          <Typography color="inherit"
            className="secondary"
          >
            {searchedLibDetails[index].count}
          </Typography>
        </ListItem>
      </div>
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
      <Typography
        component="h4"
        gutterBottom
        variant="overline"
        className="margin-general fontsize"
        color="textSecondary"
      >
        Libraries with most vulnerabilities
        </Typography>
      <TextField
        required
        value={searchInput}
        onChange={handleChangeSearch}
        className="secondary"
        labelClassName="secondary"
        style={{
          marginLeft: '15px'
        }}
        id="search"
        placeholder="..."
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
      </List> */}
      <Box
        p={2}
        display="flex"
        justifyContent="flex-end"
      >
        {/* <Button
          component={RouterLink}
          size="small"
          to="#"
        >
          See all
          <NavigateNextIcon className={classes.navigateNextIcon} />
        </Button> */}
      </Box>
    </Card>
  );
}

RealTime.propTypes = {
  className: PropTypes.string
};

export default RealTime;
