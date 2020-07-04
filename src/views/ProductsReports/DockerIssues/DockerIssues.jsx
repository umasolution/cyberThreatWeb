import React, { useEffect } from 'react';
import List  from '@material-ui/core/List';
import  FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox  from '@material-ui/core/Checkbox';
import ListItem  from '@material-ui/core/ListItem';
import PackageJSON from "../Issues/PackageJSON/PackageJSON";
import { Divider, Grid, Typography } from '@material-ui/core';
import DockerIssue from './DockerIssue';


const DockerIssues = ({ issues, reportType }) => {

  const [state, setState] = React.useState({
  });

  const fileNames = Object.keys(issues);

  useEffect(() => {
    const stateObject = {};
    fileNames.forEach(name => {
      stateObject[name] = true;
    })
    setState(stateObject);
    console.log(stateObject);

  }, []);

  const handleCheckBoxChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const getLanguageReport = () => {
    return (
      <>
        <div>
          <div style={{ display: 'flex' }}>
            <List component="nav" aria-label="main mailbox folders">
              {
                Object.keys(state).length === fileNames.length ? fileNames.map(name => {
                  return (
                    <ListItem button>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={state[name]}
                            onChange={handleCheckBoxChange}
                            name={name}
                            color="primary"
                          />
                        )}
                        label={name}
                      />
                    </ListItem>
                  );
                }) : ''
              }

            </List>
            <div style={{width:'100%'}}>

              {
                Object.keys(state).map(key => {
                  return (
                    state[key] && Object.keys(issues[key].Issues).length > 0 ? (
                      <>
                          <DockerIssue fileName={key} issues={issues[key].Issues}/>
                      </>
                    ) : ''
                  )
                })
              }
              {/* {state.isHighIssueChecked &&
                issues.High ? <PackageJSON jsonName="High" packageJSON={issues.High} /> : ''}
              <Divider style={{ display: 'block' }} />
              {state.isMediumIssueChecked &&
                issues.Medium ? <PackageJSON jsonName="Medium" packageJSON={issues.Medium} /> : ''}
              <Divider style={{ display: 'block' }} />
              {state.isLowIssueChecked &&
                issues.Low ? <PackageJSON jsonName="Low" packageJSON={issues.Low} /> : ''} */}
            </div>
          </div>
        </div>

      </>
    );
  }


  return (
    <Grid
      container
      spacing={1}
      style={{ display: 'block', margin: '5px' }}
    >
      {
        reportType === 'language' || reportType === 'application' ?
          (
            <div>
              {getLanguageReport()}
            </div>
          )
          : ''
      }

    </Grid>
  );
};

export default DockerIssues;