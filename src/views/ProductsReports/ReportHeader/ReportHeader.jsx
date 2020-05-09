import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import Severity from './../Issues/Severity/Severity';

const ReportHeader = ({header}) => {
    return (
        <Grid
              container
              spacing={1}
              style={{display: 'block', margin: '5px'}}
            >
                 

            {
                Object.keys(header).map(title => {
                  
                    return (
                      title !== 'severity' ?
                    <div>  
                        <Typography
                        variant="h6"
                        color="textPrimary"
                        style={{display: 'inline'}}
                      > 
                        {title}
                        </Typography>
                         : {header[title]}</div>
                         : ''
                         )
                }
                 )
            }
             <Severity severity={header.severity} />
                    </Grid>

            
    );
};

export default ReportHeader;