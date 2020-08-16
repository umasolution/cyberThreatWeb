import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './DockerIssue.css';
import PackageJSON from './../Issues/PackageJSON/PackageJSON';
import { Divider } from '@material-ui/core';


const DockerIssue = ({ fileName, issues }) => {
  console.log(fileName, issues);

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



  return (
    <div>
      <div className="dockerIssue">
        <List component="nav" aria-label="main mailbox folders">
          {
            Object.keys(state).length === fileNames.length ? fileNames.map(name => {
              return (
                <ListItem button style={{ display: 'inline' }}>
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
      </div>
      <Divider className="divider"/>
      {
        Object.keys(issues).map(issue => {
          return state[issue] ? <PackageJSON packageJSON={issues[issue]} /> : ''
        })
      }
      {/* <PackageJSON packageJSON={issue} /> */}
    </div>
  );
};

export default DockerIssue;