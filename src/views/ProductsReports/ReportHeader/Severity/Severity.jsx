import { makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    display: 'block',
    margin: '5px',
    textTransform: 'capitalize'
  },
  title: {
    color: theme.palette.primary.light,
    display: 'inline',
    marginRight: '5px'
  },
}));

const Severity = ({ severity }) => {

  const classes = useStyles();


  return (
    <div>
      <Typography
        variant="h6"
        className={classes.title}
      >
        Severity
            </Typography>
      {
        Object.keys(severity).map(value => {
          return (
            <div style={{ display: 'inline' }} key={value}>
              <Typography
                variant="h6"
                color="textSecondary"
                style={{ display: 'inline', marginLeft: '15px', marginRight: '5px' }}
              >
                {value}
              </Typography>
              {severity[value]}
            </div>
          )
        }
        )
      }
    </div>
  );
};

export default Severity;