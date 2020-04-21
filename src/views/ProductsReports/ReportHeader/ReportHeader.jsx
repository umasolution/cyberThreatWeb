import React from 'react';
import { Grid, Box, Typography } from '@material-ui/core';

const ReportHeader = ({header}) => {
    return (
        <Grid
              container
              spacing={1}
              style={{display: 'block', margin: '5px'}}
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

            
    );
};

export default ReportHeader;