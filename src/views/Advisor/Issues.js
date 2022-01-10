import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { expandIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { splitAndSpaceStr } from './advisorUtil';



const Issues = () => {

    const versions = useSelector(state=>state.advisor.advisoryResults.analysis.vulnerability.Issues.data);
    return (<div style={{overflowY:'auto', height:'500px'}}>
        {
            versions.map(version=>{
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<expandIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{version.CVEID}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                        <Grid container>
                                <Grid item xs={12} style={{overflowY:'auto'}}>
                                    {
                                        Object.entries(version).map(([key, value]) => {
                                            return (
                                                <div style={{display:'flex'}}>
                                                    <div style={{fontWeight:'600'}}>{splitAndSpaceStr(key)}</div> :   {typeof value == 'string' ? value : ''}
                                                </div>
                                            )
                                        }       
                                        )}
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                )
            })
        }
        
        
    </div>)
}

export default Issues;



