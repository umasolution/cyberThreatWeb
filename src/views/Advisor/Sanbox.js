import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { expandIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { splitAndSpaceStr } from './advisorUtil';
import { Box, Paper, makeStyles, Divider, TextField } from '@material-ui/core';



const Sandbox = () => {

    const versions = useSelector(state => Object.entries(state.advisor.advisoryResults.analysis.sandboxing));
    const searchTerm = useSelector(state=>state.advisor.searchTerm);

    const content = (value) => {


        return Object.entries(value).map(([keyy, valuee]) => {

            return (
                <div style={{ display: 'flex' }}>
                    <div style={{ fontWeight: '600' }}>{splitAndSpaceStr(keyy)}</div> :   {typeof valuee == 'string' ? valuee : ''}
                </div>
            )

        })

    }

    const contentWrapper = (version) => {
        return Object.entries(version[1] ? version[1] : []).map(([key, value]) => {
            return <Paper elevation={8} style={{margin:'10px',padding:'10px'}}>
                {content(value)}
            </Paper>
        })
  }



    return (<div style={{ overflowY: 'auto', height: '500px' }}>
        {
            versions.map(version => {
                if(searchTerm  && (typeof version[0] == 'string') && version[0].indexOf(searchTerm) == -1){
                    return;
                }
                return (
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<expandIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{version[0]}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid container>
                                <Grid item xs={12} style={{ overflowY: 'auto' }}>
                                    {contentWrapper(version)}
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                )
            })
        }


    </div>)
}

export default Sandbox;



