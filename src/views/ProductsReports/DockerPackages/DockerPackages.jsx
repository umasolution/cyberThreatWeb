import { Grid, Divider } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import React, { useEffect } from 'react';
import DockerPackage from './DockerPackage/DockerPackage';


const DockerPackages = ({ packages, reportType }) => {

  const [state, setState] = React.useState({
  });

  const fileNames = Object.keys(packages);

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
                    <ListItem style={{ paddingTop: '0px', paddingBottom: '0px' }}>
                      <FormControlLabel
                        control={(
                          <Checkbox
                            checked={state[name] && packages[name].length !== 0}
                            onChange={handleCheckBoxChange}
                            name={name}
                            color="primary"
                            disabled={packages[name].length === 0}

                          />
                        )}
                        label={`${name} (${packages[name].length}) `}
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
                    state[key] && packages[key].length > 0 ? (
                      <>
                        <DockerPackage file={packages[key]} />
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

export default DockerPackages;