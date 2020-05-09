import React from 'react';
import { Typography, Grid, Divider } from '@material-ui/core';
import JSONTree from 'react-json-tree';
import Severity from './Severity/Severity';
import PackageJSON from './PackageJSON/PackageJSON';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from './../../Feed/TabPanel/TabPanel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  root: { 
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'block',
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    width: '100%'
  },
  borderDiv: {
    border: '1px',
    borderStyle: 'solid',
    borderRadius: '10px',
    borderColor: 'brown',
    marginTop: '5px'
  }
}));

const Issues = ({ issues, reportName, reportType }) => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    isHighIssueChecked: true,
    isLowIssueChecked: true,
    isMediumIssueChecked: true,
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getPlatformResult = () => {
    return (
      <>
      {
        Object.keys(issues).map(issue => {
          return (
            issue !== 'severity' ?
            (
              <>
              <Typography
                    variant="h2"
                    color="primary"
                >
              {issue} 
              </Typography>
               
              {
                issues[issue].map(iss => {
                  return (
                    <div className={classes.borderDiv}>
                     {Object.keys(iss).map(i => {
                      return (
                        <Typography
                        variant="h6"
                        style={{ color: '#ab396a', marginLeft: '10px' }}
                    >
                        {i} : {iss[i]}
                        </Typography>
                      )
                    })}
                    <Divider/>
                    </div>
                  )
                  
                })
              }
              </>
            )
            :
            (
              <>
              </>
            )
          )
        })
      }

      </>
    )
  }

  const handleCheckBoxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const getLanguageReport = () => {
    return (
      <>
       <div className={classes.root}>
         <div style={{display: 'flex'}}>
      <List component="nav" aria-label="main mailbox folders">
      <ListItem button>
        <FormControlLabel
        control={
          <Checkbox
            checked={state.isHighIssueChecked}
            onChange={handleCheckBoxChange}
            name="isHighIssueChecked"
            color="primary"
          />
        }
        label="High"
      />
          </ListItem>
          <ListItem button>
        
        <FormControlLabel
        control={
          <Checkbox
            checked={state.isMediumIssueChecked}
            onChange={handleCheckBoxChange}
            name="isMediumIssueChecked"
            color="primary"
          />
        }
        label="Medium"
      />
            </ListItem>
        
            <ListItem button>
        <FormControlLabel
        control={
          <Checkbox
            checked={state.isLowIssueChecked}
            onChange={handleCheckBoxChange}
            name="isLowIssueChecked"
            color="primary"
          />
        }
        label="Low"
      />
           </ListItem>
        
         </List>
         <div>

        
         {state.isHighIssueChecked &&  
     issues['High'] ? <PackageJSON jsonName="High" packageJSON={issues['High']}  /> : '' 
     }
    <Divider style={{display: 'block'}}/>
    {state.isMediumIssueChecked &&  
     issues['Medium'] ? <PackageJSON jsonName="Medium" packageJSON={issues['Medium']}  /> : '' 
     }
    <Divider style={{display: 'block'}}/>
    {state.isLowIssueChecked &&  
  issues['Low'] ? <PackageJSON jsonName="Low" packageJSON={issues['Low']}  /> : '' 
    }
     </div>
         </div>
    </div>
    
    {/* <Tabs
      orientation="vertical"
      variant="scrollable"
      value={value}
      onChange={handleChange}
      aria-label="Vertical tabs example"
      className={classes.tabs}
    >
      <Tab label="High"   />
      <Tab label="Medium"   />
      <Tab label="Low"   />
       
    </Tabs>
    <TabPanel value={value} index={0}>
    {issues['High'] ? <PackageJSON jsonName="High" packageJSON={issues['High']}  /> : ''}

    </TabPanel>
    <TabPanel value={value} index={1}>
    {issues['Medium'] ? <PackageJSON jsonName="Medium" packageJSON={issues['Medium']}  /> : ''}
    </TabPanel>
    <TabPanel value={value} index={2}>
    {issues['Low'] ? <PackageJSON jsonName="Low" packageJSON={issues['Low']}  /> : ''}
    </TabPanel> */}

    </>
  );
  }

    return (
            <Grid
              container
              spacing={1}
              style={{ display: 'block', margin: '5px' }}
            >
                <Divider />
                
           { 
           reportType === 'language'  ?    
           (
           <div className={classes.root}>
      {getLanguageReport()}
      </div>
      )
      :
      <div>
      {getPlatformResult()}
      </div>
       }
   
            </Grid>
    );
};

export default Issues;