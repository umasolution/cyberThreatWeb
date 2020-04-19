import React from 'react';
import { Typography } from '@material-ui/core';

const Severity = ({severity}) => {
    return (
        <Typography>
            <Typography
              variant="h2"
             style={{color: 'red'}}
            >
                Severity
            </Typography>
            {
                Object.keys(severity).map(value => {
                    return ( <Typography
                        variant="h6"
                        color="textSecondary"
                      >  {value} : {severity[value]}</Typography>)
                }
                 )
            }
        </Typography>
    );
};

export default Severity;