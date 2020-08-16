import { Grid, Divider } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React, { useEffect } from 'react';
import ReportSummary from './../ReportSummary/ReportSummary';


const DockerSummaries = ({ summary, reportType, headerDate, projectName }) => {

  const [state, setState] = React.useState({
  });

  const fileNames = Object.keys(summary);

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
              <ListItem style={{ paddingTop: '0px', paddingBottom: '5px' }}>
                <h6 className="details-header">
                  Docker Images
              </h6>
              </ListItem>
              {
                Object.keys(state).length === fileNames.length ? fileNames.map(name => {
                  return (
                    <ListItem style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={state[name] && Object.keys(summary[name].Issues).map(issue => summary[name].Issues[issue].length).reduce((total, num) => total + num, 0) !== 0}
                            onChange={handleCheckBoxChange}
                            name={name}
                            color="primary"
                            disabled={Object.keys(summary[name].Issues).map(issue => summary[name].Issues[issue].length).reduce((total, num) => total + num, 0) === 0}
                          />
                        )}
                        label={`${name} (${Object.keys(summary[name].Issues).map(issue => summary[name].Issues[issue].length).reduce((total, num) => total + num, 0)})`}
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
                    state[key] && Object.keys(summary[key].Issues).length > 0 ? (
                      <>

                        <ReportSummary
                          summary={summary[key].summary}
                          headerDate={headerDate}
                          projectName={projectName}
                          isDocker={true}
                          divId={key}
                        />
                        <Divider className="divider" />
                      </>
                    ) : ''
                  )
                })
              }
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
      {/* {
        reportType === 'language' || reportType === 'application' ?
          (
            <div>
              {getLanguageReport()}
            </div>
          )
          : ''
      } */}
      {getLanguageReport()}
    </Grid>
  );
};

export default DockerSummaries;