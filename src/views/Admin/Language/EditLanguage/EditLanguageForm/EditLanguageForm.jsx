import React from 'react';
import { makeStyles, Typography, Divider, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    // borderDiv: {
    //   border: '1px',
    //   borderStyle: 'solid',
    //   borderRadius: '10px',
    //   borderColor: 'brown',
    //   marginTop: '5px',
    //   width: '1000px',
    //   overflow: 'auto',
    //   scrollBehavior: 'auto'
    // }
  }));
  
const EditLanguageForm = ({data, propertyChange, type, onApprovOrReject}) => {
    const classes = useStyles();


    const printValues = (key) => {
        return (
            <>
                { Object.keys(key).map(moduleKey => {
                    return (
                        <>
                   
                                            <Typography
                                                variant="h6"
                                                key={moduleKey}
                                                style={{ color: '#ab396a', display: 'inline', marginLeft: '10px' }}
                                            >
                                                {moduleKey}
                                                {' '}
:
<TextField disabled={moduleKey === 'id'}  label="Standard" 
style={ moduleKey === 'description' || moduleKey === 'recommendation'
 || moduleKey === 'reference' || moduleKey === 'versions' ? {width: '800px'} : {width: 'auto'}} name={moduleKey} value={key[moduleKey]} onChange={event => propertyChange(event,type,key['id'])}  />
                                            </Typography>
                                        
                            <Divider />
                        </>
                    )
                }
                )}
                <Button
               color="primary"
               size="large"
               type="button"
               variant="contained"
               onClick={(event) => onApprovOrReject(type,key['id'], 'approved')}
               style={{marginLeft: '10px'}}
             >
               Approv
             </Button> 
             <Button
               color="secondary"
               size="large"
               type="button"
               variant="contained"
               onClick={(event) => onApprovOrReject(type,key['id'], 'rejected')}
               style={{marginLeft: '10px'}}
             >
               Reject
             </Button> 
                </>
                 
                   
                        
        )

    }

    return (
        <div>
            {
                data.map(value => {
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

export default EditLanguageForm;