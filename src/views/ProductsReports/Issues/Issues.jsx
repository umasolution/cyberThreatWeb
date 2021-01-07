import { Divider, Grid, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import PackageJSON from './PackageJSON/PackageJSON';

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
  // borderDiv: {
  //   border: '1px',
  //   borderStyle: 'solid',
  //   borderRadius: '10px',
  //   borderColor: 'brown',
  //   marginTop: '5px'
  // }
}));

const Issues = ({ issues, reportName, reportType }) => {

  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [state, setState] = React.useState({
    isHighIssueChecked: true,
    isLowIssueChecked: false,
    isMediumIssueChecked: false,
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
              <ListItem button>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={state.isHighIssueChecked}
                      onChange={handleCheckBoxChange}
                      name="isHighIssueChecked"
                      color="primary"
                    />
                  )}
                  label="High"
                />
              </ListItem>
              <ListItem button>

                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={state.isMediumIssueChecked}
                      onChange={handleCheckBoxChange}
                      name="isMediumIssueChecked"
                      color="primary"
                    />
                  )}
                  label="Medium"
                />
              </ListItem>

              <ListItem button>
                <FormControlLabel
                  control={(
                    <Checkbox
                      checked={state.isLowIssueChecked}
                      onChange={handleCheckBoxChange}
                      name="isLowIssueChecked"
                      color="primary"
                    />
                  )}
                  label="Low"
                />
              </ListItem>

            </List>
            <div style={{ width: '100%' }}>


              {state.isHighIssueChecked &&
                (issues.HIGH || issues.high) ?
                <>
                  <PackageJSON jsonName="HIGH" packageJSON={issues.HIGH ? issues.HIGH : issues.medium} />
                </>
                : ''}
              {state.isMediumIssueChecked &&
                (issues.MEDIUM || issues.medium) ?
                <>
                  <PackageJSON jsonName="MEDIUM" packageJSON={issues.MEDIUM ? issues.MEDIUM : issues.medium} />
                </>
                : ''}
              {state.isLowIssueChecked &&
                (issues.LOW || issues.low) ? <>
                  <PackageJSON jsonName="LOW" packageJSON={issues.LOW ? issues.LOW : issues.low} />
                </>
                : ''}
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

export default Issues;