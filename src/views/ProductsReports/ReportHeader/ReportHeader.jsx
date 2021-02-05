import { Grid, makeStyles, Typography,Card } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import React from 'react';
import Severity from './Severity/Severity';
import moment from 'moment';
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
  },
  cardMain: {
    margin: theme.spacing(1),
    padding: theme.spacing(1)
  },
}));

const ReportHeader = ({ header }) => {

  const classes = useStyles();

  return (<>
    <Grid
      container
      spacing={1}
      className="report-main-title"
    >
      <Typography
        variant="h6"
        color="textPrimary"
        className={classes.title}
      >
        SCAN REPORT FOR {header.Project.toUpperCase()}
      </Typography>
    </Grid>
    
    <Grid
      container
      spacing={1}
      className="report-main-box"
    >
      
      {Object.entries(header.display).map((severity) => (
        severity[1].field == 'Date'?
        ( <Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}              
            >
           <Card key={severity[0]} className={classes.cardMain}>
            <Typography
              variant="h6"
              color="textPrimary"
              className={classes.title}
            >
              {severity[1].title}
            </Typography>
            <Typography className={classes.secondaryText}>
              {moment(header[severity[1].field].replace('_', ' ')).format("YYYY-MM-DD H:I:s")}
            </Typography>
          </Card> </Grid>) : (<Grid
              item
              lg={6}
              md={6}
              sm={12}
              xs={12}
              xl={4}
            >
            <Card key={severity[0]} className={classes.cardMain}>
            <Typography
              variant="h6"
              color="textPrimary"
              className={classes.title}
            >
              {severity[1].title}
            </Typography>
            <Typography className={classes.secondaryText}>
              {header[severity[1].field]}
            </Typography>
          </Card> </Grid>
          ) 
      ))}
      {/*header.Severity ?
        <Card>
          <Severity severity={header.Severity} />
        </Card>
        : ''*/}
    </Grid>
  </>);
};

export default ReportHeader;