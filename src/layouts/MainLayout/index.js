import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import TopBar from './TopBar';

const useStyles = makeStyles((theme) => ({
  root: {
    // todo:
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

function MainLayout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TopBar />
      <div className={classes.wrapper} style={{ backgroundColor: '#f1f1f1' }}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.any
};

export default MainLayout;
