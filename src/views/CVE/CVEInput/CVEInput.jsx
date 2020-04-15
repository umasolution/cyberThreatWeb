import React from 'react';
import { Typography, Grid, TextField, Box, Button, makeStyles } from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { KeyboardDatePicker } from '@material-ui/pickers';
const useStyles = makeStyles((theme) => ({
  root: {},
  datePicker: {
    '& + &': {
      marginLeft: theme.spacing(2)
    }
  }
}));

const CVEInput = ({ searchByCVE, cveInput, changeSearchByCVE, keyPress, handleChangeCVE,
   onSearchClicked, isSearching,
    cveSearchStartDate, setCVESearchDate, cveSearchEndDate }) => {

  const classes = useStyles();


  const getDateInput = () => {
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
  }

  return (
    <>

      <Typography component="div">
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
      </Typography>

      {!searchByCVE && getDateInput()}
      {
        searchByCVE && (
          <TextField
            required
            value={cveInput}
            onKeyDown={keyPress}
            onChange={handleChangeCVE}
            style={{
              width: '500px'
            }}
            id="cve"
            placeholder="CVE"
            label="CVE"
          />
        )
      }
      <Box mt={2}>
        <Button
          color="secondary"
          size="large"
          type="button"
          variant="contained"
          onClick={onSearchClicked}
          disabled={isSearching}
        >
          Search
        </Button>
      </Box>
      <div style={{ margin: '10px' }} />

    </>
  );
};

export default CVEInput;