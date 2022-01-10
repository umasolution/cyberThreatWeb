import React from 'react';
import { Grid, Box, makeStyles, Paper, Typography,Badge,LinearProgress } from '@material-ui/core';

const useStyles = (() => ({
    paper: {

        textAlign: 'center',

        marginTop : '5px',

        margin: '5px',
        padding: '5px',

        padding: '10px'

    },

    divider: {
        marginRight: '3px',
        marginLeft: '3px'
    },

    header: {
        fontWeight: 400,
    },

    value: {
        fontWeight: 600,
    },

    circularDiv: {
        borderRadius: '50%',
        color: 'blue'
    }
}));


const Score = ({ score }) => {

    const styles = useStyles();

    if (score == undefined) {
        return <></>
    }

    const calculateScore = () => {
        let score = 0;

        Object.entries(score).map(([key, value]) => {
            score = score + Number(value);
        });

        return score;
    }

    const shapeStyles = { bgcolor: 'blue', width: 40, height: 40 };
    const shapeCircleStyles = { borderRadius: '50%' };

    const circle = (val)  => (
        <Box component="span" sx={{ ...shapeStyles, ...shapeCircleStyles }} ><div>{val}</div></Box>
    );

    const SqDisplay = ({val, color, bgColor}) => {
        return (
            <div style={{padding:'5px',borderRadius:'3px', color:'#fff', fontWeight:400, fontSize:'12px', backgroundColor:'#fe0a7b',width:'20px'}}>
                {val}
            </div>
        )
      
    }
    return (
        <Paper className={styles.paper} elevation={8}>
            <Grid container  style={{padding:'10px'}}>

                <Grid item xs={8} style={{marginBottom:'10px'}}>
                    <Typography variant="h6" >
                        Niah Score
                    </Typography>
                </Grid>
                <Grid item xs={4} style={{marginBottom:'10px'}}>
                    <Typography variant="h6" >
                    {calculateScore()}/100
                    </Typography>
                </Grid>
                <Grid item xs={12} style={{marginBottom:'10px'}}>
                    <LinearProgress variant="buffer" value={calculateScore()} valueBuffer={calculateScore()+5} />
                </Grid>
                {
                    Object.entries(score).map(([key, value]) => {
                        return (
                            <>
                                <Grid item xs={8} style={{marginBottom:'10px'}} >
                                    <Typography variant="button" >
                                    {key}
                                </Typography>
                                </Grid>
                                <Grid item xs={4}><SqDisplay val={value}  /></Grid>
                            </>
                        )

                    })}

            </Grid>
        </Paper>
    )
}

export default Score;