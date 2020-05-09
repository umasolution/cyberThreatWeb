import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    borderDiv: {
      border: '1px',
      borderStyle: 'solid',
      borderRadius: '10px',
      borderColor: 'brown',
      marginTop: '5px',
      width: '1000px',
      overflow: 'scroll',
      scrollBehavior: 'auto'
    }
  }));

const PackageJSON = ({ packageJSON, jsonName }) => {

  const classes = useStyles();


    const printValues = (key) => {
        return (
            
                 Object.keys(key).map(moduleKey => {
                    return (
                        <>
                   
                                            <Typography
                                                variant="h6"
                                                style={{ color: '#ab396a', display: 'inline', marginLeft: '10px' }}
                                            >
                                                {moduleKey}
                                                {' '}
:
{key[moduleKey]}
                                            </Typography>
                                        
                            <Divider />
                        </>
                    )
                }
                ) 
        )

    }

    return (
        <div>
            {
                packageJSON.map(value => {
                    return (
                        <>
                            <div   className={classes.borderDiv}>
                                {printValues(value)}
                            </div>
                        </>
                    )
                }
                )
            }

        </div>
    );
};

export default PackageJSON;