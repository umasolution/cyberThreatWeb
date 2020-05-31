import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Severity from './Severity/Severity';

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
  secondaryText: {
    color: "inherit",
    display: 'inline'
  }
}));

const ReportHeader = ({ header }) => {

  const classes = useStyles();


  return (
    <Grid
      container
      spacing={1}
      className={classes.mainGrid}
    >
      {
        Object.keys(header).map(title => {

          return (
            title !== 'severity' ? (
              <div>
                <Typography
                  variant="h6"
                  color="textPrimary"
                  className={classes.title}
                >
                  {title}
                </Typography>
                <Typography className={classes.secondaryText}>
                  {header[title]}
                </Typography>

              </div>
            )
              : ''
          )
        }
        )
      }
      <Severity severity={header.severity} />
    </Grid>


  );
};

export default ReportHeader;