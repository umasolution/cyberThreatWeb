import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    borderDiv: {
        // border: '1px',
        // borderStyle: 'solid',
        // borderRadius: '10px',
        // borderColor: 'brown',
        marginTop: '5px',
        maxWidth: '1000px',
        overflow: 'auto',
        scrollBehavior: 'auto',
        textTransform: 'capitalize'
    },
    title: {
        color: theme.palette.primary.light,
        display: 'inline',
        marginRight: '5px'
    },
    secondaryText: {
        color: "inherit",
        display: 'inline',
        marginRight: '5px'
    }
}));

const PackageJSON = ({ packageJSON }) => {

    const classes = useStyles();


    const printValues = (key) => {
        return (
            <ExpansionPanel>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >

                    {Object.keys(key).map(moduleKey => {
                        return (
                            (moduleKey === 'cve_id' || moduleKey === 'vuln_name' || moduleKey === 'product' || moduleKey === 'vendor'
                                || moduleKey === 'severity') ? (
                                    <div key={moduleKey}>
                                        <Typography
                                            variant="h6"
                                            color="textPrimary"
                                            className={classes.title}
                                        >
                                            {moduleKey}
                                        </Typography>

                                        {' '}
                                        <Typography className={classes.secondaryText}>
                                            {key[moduleKey]}
                                        </Typography>
                                    </div>
                                ) : ''
                        )
                    })}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {Object.keys(key).map(moduleKey => {
                        return (
                            !(moduleKey === 'cve_id' || moduleKey === 'vuln_name' || moduleKey === 'product' || moduleKey === 'vendor'
                                || moduleKey === 'severity') ? (
                                    <div key={moduleKey}>
                                        <Typography
                                            variant="h6"
                                            color="textPrimary"
                                            className={classes.title}
                                        >
                                            {moduleKey}
                                        </Typography>
                                        <Typography className={classes.secondaryText}>
                                            {key[moduleKey]}
                                        </Typography>
                                        {' '}

                                    </div>
                                )


                                : ''
                        )
                    })}
                </ExpansionPanelDetails>
            </ExpansionPanel>

        )

    }

    return (
        <div>
            {
                packageJSON.map(value => {
                    return (
                        <div key={value}>
                            <Paper className={classes.borderDiv}>
                                {printValues(value)}
                            </Paper>
                        </div>
                    )
                }
                )
            }

        </div>
    );
};

export default PackageJSON;