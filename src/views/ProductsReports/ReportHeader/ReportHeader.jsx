import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';

const ReportHeader = ({header}) => {
    return (
        <Typography component="div">
        <Grid
              container
              spacing={1}
              style={{display: 'block'}}
            >
                 

            {
                Object.keys(header).map(title => {
                    
                    return (<div>  
                        <Typography
                        variant="h6"
                        color="textPrimary"
                        style={{display: 'inline'}}
                      > 
                        {title}
                        </Typography>
                         : {header[title]}</div>)
                }
                 )
            }
                    </Grid>
                    </Typography>

            
    );
};

export default ReportHeader;