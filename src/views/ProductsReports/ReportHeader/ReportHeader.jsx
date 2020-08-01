import { Grid, makeStyles, Typography } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Severity from './Severity/Severity';

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
            (title !== 'Severity' && title !== 'docker') ? (
              <Paper key={title}>
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
      {header.Severity ?
        <Paper>
          <Severity severity={header.Severity} />
        </Paper>
        : ''}
    </Grid>


  );
};

export default ReportHeader;