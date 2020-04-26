import React from 'react';
import { Typography, Divider } from '@material-ui/core';

const PackageJSON = ({ packageJSON, jsonName }) => {

    const printValues = (key) => {
        const values = packageJSON[key];
        return (
            <>
                {Object.keys(values.header).map(headerKey => {
                    return (
                        <>
                            <Typography
                                variant="h6"
                                style={{width: '60%', overflow: 'auto'}}
                            >
                                {headerKey}
                                {' '}
:
{values.header[headerKey]}
                            </Typography>
                        </>
                    )
                }
                )}

                <Typography
                    variant="h6"
                    color="primary"
                >
                    Modules
                </Typography>
                {Object.keys(values.modules).map(moduleKey => {
                    return (
                        <>
                            {Object.keys(values.modules[moduleKey]).map(loadeshKey => {
                                return (
                                    loadeshKey !== 'Dependancy' ? (
                                        <>
                                            <Typography
                                                variant="h6"
                                                style={{ color: '#ab396a', display: 'inline', marginLeft: '10px' }}
                                            >
                                                {loadeshKey}
                                                {' '}
:
{values.modules[moduleKey][loadeshKey]}
                                            </Typography>
                                        </>
                                    )
                                        : (
                                            <>
                                            </>
                                        )
                                )
                            })}
                            {Object.keys(values.modules[moduleKey]).map(loadeshKey => {
                                return (
                                    loadeshKey !== 'Dependancy' ? (
                                        <>
                                        </>
                                    )
                                        : (
                                            <>
                                                <Typography
                                                    variant="h6"
                                                    color="primary"
                                                style={{  marginLeft: '10px' }}

                                                >
                                                    Dependancy
                                            </Typography>
                                                <Divider />
                                                {values.modules[moduleKey][loadeshKey].map(dependency => {
                                                    return dependency.map(dep => {
                                                        return (
                                                            <>
                                                                <Typography
                                                                    variant="h6"
                                                                    color="primary"
                                                                    style={{ color: '#ab396a', display: 'inline', marginLeft: '20px' }}
                                                                >
                                                                    {dep}
                                                                </Typography>
                                                            </>
                                                        )
                                                    })

                                                })}
                                            </>
                                        )
                                )
                            })}
                            <Divider />
                        </>
                    )
                }
                )}
            </>
        )

    }

    return (
        <div>
            {
                Object.keys(packageJSON).map(value => {
                    return (
                        <>
                            <div style={{ marginLeft: '25px' }}>
                                <Typography
                                    variant="h5"
                                    color="primary"
                                >
                                    {value}
                                </Typography>
                            </div>
                            <div style={{ marginLeft: '50px' }}>
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