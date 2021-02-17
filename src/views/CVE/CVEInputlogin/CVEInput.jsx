import React from 'react';
import { Typography, Grid, TextField, Box, Button, makeStyles, Tooltip,Container,Icon } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { KeyboardDatePicker } from '@material-ui/pickers';
import './CVEInput.css';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import NotificationsOffIcon from '@material-ui/icons/NotificationsOff';
import CVETextField from './CVETextField';

const useStyles = makeStyles((theme) => ({
  root: {},
  datePicker: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  },
  searchbarArea: {
    
    width: '100%',
    bottom: -70,
    [theme.breakpoints.down('sm')]: {
      bottom: -90,
    },
    left:0,
  },
  searchbar: {
    backgroundColor: theme.palette.background.light,
    maxWidth:1180,
    background: '#fff url(/static/bg_searchbar.png)',
    padding:'35px 0px',
    boxShadow:'4px 0px 54px rgba(0,0,0,0.1)',
    borderRadius: 5,
    [theme.breakpoints.down('sm')]: {
      padding:'15px 10px',
    },
  },
  searchBox: {
    marginTop: 0,
    maxWidth:815,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#fff',
    boxShadow:'4px 0px 27px rgba(0,0,0,0.08)',
    height:62,
    borderRadius:50,
    border:'1px solid #e8e8f2',
    padding:8,
    position: 'relative',
    '& > div' : {
      paddingLeft: 60,
    }
  },
  searchIcon: {
    position:'absolute',
    left:'30px',
    color:'#747474',
    fontSize:'25px',
  },
  searchButton: {
    backgroundColor:'#ff0476',
    padding:'0 !important',
    textAlign: 'center',
    width: 176,
    height: 45,
    lineHeight: '45px',
    color: '#fff',
    borderRadius: 50,
    fontWeight: theme.fontfamily.bold,
    fontFamily: '"Montserrat",sans-serif',
    letterSpacing: '1px',
    border:0,
    fontSize:'16px',
  }
}));

const CVEInput = ({ searchByCVE, cveInput, changeSearchByCVE, keyPress, handleChangeCVE,
  onSearchClicked, isSearching,
  cveSearchStartDate, setCVESearchDate, cveSearchEndDate, setAlert, canSetAlert = false, alarmAlreadySet = false }) => {

  const classes = useStyles();


  /* const getDateInput = () => {
    return (
<Box mt={2}>
        <KeyboardDatePicker
          className={classes.datePicker}
          label="Start Date"
          format="MM/DD/YYYY"
          name="startDate"
          variant="inline"
          value={cveSearchStartDate}
          onChange={(date) => setCVESearchDate('startDate', date)}
        />
        <KeyboardDatePicker
          className={classes.datePicker}
          label="End Date"
          format="MM/DD/YYYY"
          name="endDate"
          variant="inline"
          value={cveSearchEndDate}
          onChange={(date) => setCVESearchDate('endDate', date)}
        />
</Box>
    );
  } */

  return (
    <>

      {/* <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>Search By Date</Grid>
          <Grid item>
            <Switch
              checked={searchByCVE}
              onChange={changeSearchByCVE}
              name="searchByCVE"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          </Grid>
          <Grid item>CVE</Grid>
        </Grid>
      </Typography> */}

      
      {
        searchByCVE && (<>
        <Container maxWidth="lg" className={classes.searchbarArea}>
     <Grid
        container
        spacing={0}
        className={classes.container}
      > 
      <Container maxWidth="lg" className={classes.searchbar}> 
         
        <Box mt={3}
          display="flex"
          justifyContent="center"
          alignItems="center"
          className={classes.searchBox}>
            <CVETextField
              cveInput={cveInput}
              keyPress={keyPress}
              handleChangeCVE={handleChangeCVE}
            />
            <Icon className={classes.searchIcon}>search</Icon>
            
            <Button
                className={classes.searchButton}
                size="large"
                type="button"
                variant="contained"
                onClick={onSearchClicked}
                disabled={isSearching}
              >
                Search
              </Button>
            {canSetAlert ?
              alarmAlreadySet ? (
                <Tooltip title="Remove Alert">
                  <NotificationsOffIcon
                    style={{ marginLeft: '10px', color:'red' }}
                    onClick={setAlert}
                  />
                </Tooltip>
              )
                : (
                  <Tooltip title="Set Alert">
                    <AddAlertIcon
                      style={{ marginLeft: '10px', color:'#3949ab' }}
                      onClick={setAlert}
                    />
                  </Tooltip>
                )
              : null}
              </Box>
        </Container>
        </Grid>
        </Container>
          
        </>)
      }
      <Box mt={2}>
        
      </Box>
      <div style={{ margin: '10px' }} />

    </>
  );
};

export default CVEInput;