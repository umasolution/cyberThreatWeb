import { Divider, Grid, Typography } from '@material-ui/core';
import React from 'react';
import JSONTree from 'react-json-tree';

const JsonFiles = ({ jsonFiles }) => {
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
                    JsonFiles
                </Typography> 
                <Typography
                  variant="h4"
                  color="primary"
                >
                    package.json
                </Typography>
                {/* <Severity severity={issues.severity} /> */}
                {jsonFiles['package.json'] ? <JSONTree hideRoot shouldExpandNode={() => true} data={jsonFiles['package.json']}  /> : ''}
                <Divider />
                <Typography
                  variant="h4"
                  color="primary"
                >
                    package-lock.json
                </Typography>
                {jsonFiles['package-lock.json'] ? <JSONTree shouldExpandNode={() => true} data={jsonFiles['package-lock.json']} /> : ''}


            </Grid>
        )
    );
};

export default JsonFiles;