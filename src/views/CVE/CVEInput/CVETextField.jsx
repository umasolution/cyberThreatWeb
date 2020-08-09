import React from 'react';
import { TextField } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';

const CVETextField = ({ cveInput, keyPress, handleChangeCVE }) => {
  return (
    <TextField
      required
      value={cveInput}
      onKeyDown={keyPress}
      onChange={handleChangeCVE}
      style={{
        width: "200px",
        background: "white",
      }}
      id="cve"
      placeholder="Search CVEs"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CVETextField;