import { Divider, Grid, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect } from 'react';
import PackageJSON from './PackageJSON/PackageJSON';
import File from './File/File';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: '#f1f1f1',
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

const Dependencies = ({ issues, reportName, reportType }) => {


  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const [state, setState] = React.useState({
  });


  const fileNames = issues ? Object.keys(issues) : [];

  useEffect(() => {
    let stateObject = {};
    fileNames.forEach(name => {
      stateObject[name] = true;
    })
    setState(stateObject);
    console.log(stateObject);

  }, []);



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
                          <div >
                            {Object.keys(iss).map(i => {
                              return (
                                <Typography
                                  variant="h6"
                                  style={{ color: '#ab396a', marginLeft: '10px' }}
                                >
                                  {i}
                                  {' '}
:
                                  {iss[i]}
                                </Typography>
                              )
                            })}
                            <Divider />
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
            <div style={{ width: '100%' }}>

              {
                Object.keys(state).map(key => {
                  return (
                    state[key] ? <File name={key} file={issues[key]} /> : ''
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
      <div className={classes.root}>
        {getLanguageReport()}
      </div>
    </Grid>
  );
};

export default Dependencies;