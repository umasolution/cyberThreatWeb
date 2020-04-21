import React from 'react';
import { Typography, Grid, Divider } from '@material-ui/core';
import JSONTree from 'react-json-tree';
import Severity from './Severity/Severity';
import PackageJSON from './PackageJSON/PackageJSON';

const Issues = ({ issues }) => {
    return (
        (

            <Grid
              container
              spacing={1}
              style={{ display: 'block', margin: '5px' }}
            >
              <Typography
                variant="h2"
                color="primary"
              >
                    Issues
              </Typography> 
                <Typography
                  variant="h4"
                  style={{ color: 'red' }}
                >
                    Severity
                </Typography>
                {/* <Severity severity={issues.severity} /> */}
                <JSONTree hideRoot shouldExpandNode={() => true} data={issues.severity} />
                <Divider />
                <Typography
                  variant="h4"
                  color="primary"
                >
                    package.json
                </Typography>
                {issues['package.json'] ? <JSONTree shouldExpandNode={() => true} data={issues['package.json']} /> : ''}
                {/* {issues['package.json'] ? <PackageJSON jsonName="package.json" packageJSON={issues['package.json']}  /> : ''} */}
                <Divider />
                <Typography
                  variant="h4"
                  color="primary"
                >
                    package-lock.json
                </Typography>
                {issues['package-lock.json'] ? <JSONTree shouldExpandNode={() => true} data={issues['package-lock.json']} /> : ''}

                {/* {issues['package-lock.json'] ? <PackageJSON jsonName="package-lock.json" packageJSON={issues['package-lock.json']}  /> : ''} */}

            </Grid>
        )
    );
};

export default Issues;