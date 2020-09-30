import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import TopBar from './TopBar';
import Footer from './Footer';

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
    paddingTop: 85
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
      <div className={classes.wrapper} style={{ backgroundColor: '#ffffff' }}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            {children}
            <Footer />
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
