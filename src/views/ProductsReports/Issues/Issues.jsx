import React from 'react';
import { Typography, Grid, Divider } from '@material-ui/core';
import JSONTree from 'react-json-tree';
import Severity from './Severity/Severity';
import PackageJSON from './PackageJSON/PackageJSON';
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
    width: '100%'
  },
}));

const Issues = ({ issues }) => {

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
                <Severity severity={issues.severity} />
                <Divider />
                <div className={classes.root}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        <Tab label="package.json"   />
        <Tab label="package-lock.json"   />
         
      </Tabs>
      <TabPanel value={value} index={0}>
      {issues['package.json'] ? <PackageJSON jsonName="package.json" packageJSON={issues['package.json']}  /> : ''}

      </TabPanel>
      <TabPanel value={value} index={1}>
      {issues['package-lock.json'] ? <PackageJSON jsonName="package-lock.json" packageJSON={issues['package-lock.json']}  /> : ''}
      </TabPanel>
       
    </div>
            </Grid>
    );
};

export default Issues;