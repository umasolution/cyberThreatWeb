import React from 'react';
import { Typography, Grid, Divider } from '@material-ui/core';
import Severity from './Severity/Severity';
import PackageJSON from './PackageJSON/PackageJSON';
import JSONTree from 'react-json-tree';

const Issues = ({ issues }) => {
    return (
        (
            <JSONTree hideRoot shouldExpandNode={() => true} data={ issues } />
           /* { <Typography component="div">
                <Grid
                  container
                  spacing={1}
                  style={{display: 'block'}}
                >
                    <Severity severity={issues.severity} />
                    <Divider/>
                    {issues['package.json'] ? <PackageJSON jsonName="package.json" packageJSON={issues['package.json']}  /> : ''}
                    <Divider/>
                    {issues['package-lock.json'] ? <PackageJSON jsonName="package-lock.json" packageJSON={issues['package-lock.json']}  /> : ''}

                </Grid>
            </Typography> }*/


        )
    );
};

export default Issues;