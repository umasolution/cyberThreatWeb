import { Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Severity from './Severity/Severity';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    display: 'flex',
    margin: '5px',
    textTransform: 'capitalize',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(1),
      padding: theme.spacing(1),

    },
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
              <Paper>
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
              </Paper>
            )
              : ''
          )
        }
        )
      }
      <Paper>
        <Severity severity={header.severity} />
      </Paper>
    </Grid>


  );
};

export default ReportHeader;