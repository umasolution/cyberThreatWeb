import React from 'react';
import { Typography } from '@material-ui/core';

const PackageJSON = ({ packageJSON, jsonName }) => {

    const printValues = (key) => {
        const values = packageJSON[key];
        return Object.keys(values).map(value => {
            return (
                <>
              
            {
                value !== 'severity' ? 
                <>
                <Typography
                variant="h6"
                color="primary"
            >
                {value}
            </Typography>
                        {Object.keys(values[value]).map(subValue => {
                            return (
                                <>
                                {subValue !== 'Dependancy' ? 
                                <p style={{    marginLeft: '25px'}}> 
                                <Typography
                variant="h6"
                
                style={{color: '#ab396a', display: 'inline'}}
            >
{subValue}
            </Typography>
                                
                                 : {values[value][subValue]} 
                                </p>
                                
                                 : 
                                 <>
                                 <Typography
                variant="h6"
                
                style={{    marginLeft: '25px', color: '#ab396a'}}
            >
{subValue} :
            </Typography>
                                    
                                    {
                                        values[value][subValue][0].map(sv => {
                                            return (
                                                <div style={{    marginLeft: '40px'}}>
                                                {sv}
                                                </div>
                                            )
                                        })
                                    }
                                 </>
                                 
                                 }

                                
                                </>
                                )
                        })
                        }
                       </>  
                  
                  : 
                  <Typography
                variant="h6"
                color="primary"
            >
                {value} : {values[value]}
            </Typography>
            }
            </>
            
            )
          });
         
    }

    return (
        <div>
            <Typography
                variant="h2"
                color="primary"
            >
                {jsonName}
             </Typography>
            {
                Object.keys(packageJSON).map(value => {
                    return (
                        <>
                            <div style={{marginLeft: '25px'}}>
                            <Typography
                variant="h5"
                color="primary"
            >
                                {value}
                                </Typography>
                            </div>
                            <div style={{marginLeft: '50px'}}>
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