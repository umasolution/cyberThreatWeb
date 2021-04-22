import { TextField, colors } from '@material-ui/core';
import { createMuiTheme, withStyles } from "@material-ui/core/styles";
import React from 'react';
import InputAdornment  from '@material-ui/core/InputAdornment';
import './CVETextField.css';
import SearchIcon  from '@material-ui/icons/Search';


const styles = theme => ({
  input: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "white",
      fontSize: 14
    },
  },
});

const theme = createMuiTheme({
  palette: {
    primary: colors.white
  },
  typography: { useNextVariants: true }
});

const CVETextField = (props) => {
  const { classes, cveInput, keyPress, handleChangeCVE } = props;
  return (
    <TextField
      required
      value={cveInput}
      onKeyDown={keyPress}
      onChange={handleChangeCVE}
      style={{
        width: "200px",
      }}
      id="cve"
      placeholder="Search CVEs"
      className="searchbtn"
      InputProps={{
        classes: {
          input: classes.input
        },
        startAdornment: (
          <InputAdornment position="start" onChange={keyPress}>
            <SearchIcon style={{ color: 'white'}} onChange={keyPress} />
          </InputAdornment>
        ),
      }}
    // InputProps={{ classes: { input: 'input' } }}
  /*   InputProps={{
      
    }} */
    />
  );
};

export default withStyles(styles)(CVETextField);