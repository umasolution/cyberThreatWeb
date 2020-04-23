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
                <Severity severity={issues.severity} />
                <Divider />
                {issues['package.json'] ? <PackageJSON jsonName="package.json" packageJSON={issues['package.json']}  /> : ''}
                <Divider />
                {issues['package-lock.json'] ? <PackageJSON jsonName="package-lock.json" packageJSON={issues['package-lock.json']}  /> : ''}

            </Grid>
        )
    );
};

export default Issues;