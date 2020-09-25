import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Container,
  Grid,
  Typography,
  makeStyles,
  Button,
  TextField,
  Paper
} from '@material-ui/core';
import {
  withRouter
} from 'react-router-dom';
import moment from 'moment';
import CVEInput from './../../CVE/CVEInput/CVEInput';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    paddingTop: 20,
    paddingBottom: 20
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
  },
  featureImage:{

  },
  mainH4:{
    fontWeight: theme.fontfamily.semiBold,
  },
  body1:{
    fontWeight: theme.fontfamily.medium,
  }
}));

function SearchBar({ className, ...rest }) {
  const classes = useStyles();

  const { history } = { ...rest };
  const [searchByCVE, setSearchByCVE] = useState(true);
  const [cveInput, setCVEInput] = useState("");
  const [cveSearchStartDate, setCVESearchStartDate] = useState(new Date());
  const [cveSearchEndDate, setCVESearchEndDate] = useState(new Date());

  const handleChangeCVE = (event) => {
    setCVEInput(event.target.value);
  }
  const changeSearchByCVE = (event) => {
    setSearchByCVE(event.target.checked);
  };

  const onSearchClicked = () => {
    if (searchByCVE) {
      history.push(`/CVE/${cveInput}`);
    } else {
      // history.push(`/CVE/${moment(cveSearchStartDate).format("YYYY-MM-DD")}/${moment(cveSearchEndDate).format("YYYY-MM-DD")}`);
      history.push(`/CVE/${cveSearchStartDate}/${cveSearchEndDate}`);
    }
  }

  const keyPress = (event) => {
    if (event.keyCode === 13) {
      onSearchClicked();
    }
  }

  const setCVESearchDate = (dateType, date) => {
    if (dateType === 'startDate') {
      setCVESearchStartDate(date);
    } else {
      setCVESearchEndDate(date);
    }
  }

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    > 
      <Container maxWidth="md">       
        <Box mt={3}
          display="flex"
          justifyContent="center"
          alignItems="center">
          <TextField
          required
          value={cveInput}
          onKeyDown={keyPress}
          onChange={handleChangeCVE}
          style={{
            width: '500px'
          }}
          id="cve"
          placeholder="Search Vulnerabilities"
          label="Search Vulnerabilities"
        />
        </Box>
      </Container>
    </div>
  );
}

SearchBar.propTypes = {
  className: PropTypes.string
};

export default SearchBar;
