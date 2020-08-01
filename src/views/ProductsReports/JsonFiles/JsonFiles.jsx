import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import React from 'react';
import JSONTree from 'react-json-tree';
import TabPanel from "../../Feed/TabPanel/TabPanel";
import { JSONTreeTheme } from "../../../Util/Constants";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    display: 'block',
    margin: '5px'
  },
  root: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
    display: 'flex',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const JsonFiles = ({ jsonFiles }) => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid
      container
      spacing={1}
      className={classes.mainGrid}
    >
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {
            jsonFiles.map(jsonFile => <Tab label={jsonFile.name} />)
          }
        </Tabs>
        {
          jsonFiles.map((jsonFile, index) => (
            <TabPanel style={{ minWidth: '655px' }} value={value} index={index}>
              <JSONTree theme={JSONTreeTheme} invertTheme hideRoot shouldExpandNode={() => true} data={jsonFile.data} />
            </TabPanel>
          ))
        }
      </div>
    </Grid>
  );
};

export default JsonFiles;