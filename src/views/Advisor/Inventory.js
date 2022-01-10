import React from 'react';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { expandIcon } from 'react-feather';
import { useSelector } from 'react-redux';
import { Grid } from '@material-ui/core';
import { splitAndSpaceStr } from './advisorUtil';
import { Box, Paper, makeStyles, Divider,TextField } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
      ...theme.typography.caption,
      textAlign: 'center',
  
      height: 30,
  
      margin: '5px',
      padding: '5px',
      display : 'flex'
    },
  
    divider:{
      marginRight : '3px',
      marginLeft : '3px'
    },
    
    header : {
      fontWeight : 400,
    },
  
    value : {
      fontWeight : 600,
    }
  }));

const Inventory = () => {
    const styles = useStyles();
    const inventories = useSelector(state => state.advisor.advisoryResults.analysis.vulnerability.inventory);

    return (
        <Grid container >
            {
                inventories.map(inventory => {
                    return Object.entries(inventory).map(([key, value]) => {
                        return <Grid item={1}>
                             <Paper className={styles.paper} elevation={8}>
                                <div className={styles.header}>{splitAndSpaceStr(key)}</div>
                                <Divider className={styles.divider} orientation="vertical" variant="middle" flexItem />
                                <div className={styles.value}>{value}</div>
                            </Paper>
                        </Grid>
                    })
                })

            }
        </Grid>
    )


}

export default Inventory;