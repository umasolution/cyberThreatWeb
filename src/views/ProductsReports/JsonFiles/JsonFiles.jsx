import { Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import JSONTree from 'react-json-tree';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './../../Feed/TabPanel/TabPanel';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
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
      style={{ display: 'block', margin: '5px' }}
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
            jsonFiles.map(jsonFile =>  <Tab label={jsonFile.name} />)
          }
        </Tabs>
        {
            jsonFiles.map((jsonFile, index) =>  <TabPanel style={{minWidth: '655px'}}  value={value} index={index}>
            <JSONTree hideRoot shouldExpandNode={() => true} data={jsonFile.data} /> 
          </TabPanel>)
          }
      </div>
    </Grid>
  );
};

export default JsonFiles;