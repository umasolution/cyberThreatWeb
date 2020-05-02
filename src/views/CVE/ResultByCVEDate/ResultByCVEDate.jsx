import React from 'react';
import {
    Box, Container, Divider, Grid, LinearProgress, makeStyles, TextField, Typography,
    List,
    ExpansionPanel,
    ExpansionPanelSummary,
    ListItem,
    ListItemIcon,
    ListItemText,
    ExpansionPanelDetails,
    Paper
} from '@material-ui/core';
import MaterialTable from 'material-table';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        paddingTop: 200,
        paddingBottom: 200,
        [theme.breakpoints.down('md')]: {
            paddingTop: 60,
            paddingBottom: 60
        }
    },
    image: {
        perspectiveOrigin: 'left center',
        transformStyle: 'preserve-3d',
        perspective: 1500,
        '& > img': {
            maxWidth: '90%',
            height: 'auto',
            transform: 'rotateY(-35deg) rotateX(15deg)',
            backfaceVisibility: 'hidden',
            boxShadow: theme.shadows[16]
        }
    },
    shape: {
        position: 'absolute',
        top: 0,
        left: 0,
        '& > img': {
            maxWidth: '90%',
            height: 'auto'
        }
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'left',
        color: theme.palette.text.primary,
        overflow: 'auto'
    },
    list: {
        width: '100%',
        maxWidth: 800,
        backgroundColor: theme.palette.background.paper
    },
    headerGrid: {
        width: 'fit-content',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        }
    },
    gridHeaderSpan: {
        paddingLeft: '1rem',
        borderLeft: '0.10rem solid skyblue',
        paddingRight: '1rem'
    },
    urlTable: {
        width: "100%",
        border: "1px solid black",
        borderCollapse: "collapse"
    },
    urlTh: {
        border: "1px solid black",
        borderCollapse: "collapse",
        padding: "5px",
        textAlign: "left",
        width: "350px"
    },
    urlTd: {
        border: "1px solid black",
        borderCollapse: "collapse",
        padding: "5px",
        textAlign: "left",
    }
}));

const ResultByCVEDate = ({ cveResultByDate }) => {

    const classes = useStyles();

    const getCVEHeaderGrid12 = () => {
        return (
            <Grid item xs={12}>
                {
                    cveResultByDate.CVEs.map(result => {
                        return (
                            <Grid container spacing={1}>
                                <ExpansionPanel
                                    key={result.CVE_ID}
                                    style={{ width: '100%' }}
                                >
                                    <ExpansionPanelSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography
                                            color="textPrimary"
                                            variant="body1"
                                        >
                                            <Grid container alignItems="center">
                                                {
                                                    Object.keys(result).map(key => {
                                                        return (
                                                            (!(key === 'Description' || key === 'VectorString' || key === 'urls')) ? (
                                                                <>
                                                                    <span className={classes.gridHeaderSpan}>
                                                                        {key !== 'CVE_ID' ? `${key} : ` : ''}
                                                                        {' '}
                                                                        {result[key]}
                                                                    </span>
                                                                </>
                                                            )
                                                                : ''
                                                        )
                                                    })
                                                }
                                            </Grid>
                                        </Typography>
                                    </ExpansionPanelSummary>
                                    <ExpansionPanelDetails>
                                        <List className={classes.list} dense={false}>
                                            {
                                                Object.keys(result).map(key => {
                                                    return (
                                                        (key === 'Description' || key === 'VectorString' || key === 'urls') ? (
                                                            <>
                                                                <ListItem key={key}>
                                                                    {
                                                                        key !== 'urls' ?
                                                                            (
                                                                                <ListItemText
                                                                                    primary={`${key} :  ${result[key]}`}
                                                                                />
                                                                            )
                                                                            :
                                                                            result[key].length > 0 ?
                                                                                (
                                                                                    <ExpansionPanel
                                                                                        key={key}
                                                                                    >
                                                                                        <ExpansionPanelSummary
                                                                                            expandIcon={<ExpandMoreIcon />}
                                                                                            aria-controls="panel1a-content"
                                                                                            id="panel1a-header"
                                                                                        >
                                                                                            <ListItem key={key}>
                                                                                                <ListItemText
                                                                                                    primary={key}
                                                                                                />
                                                                                            </ListItem>
                                                                                        </ExpansionPanelSummary>
                                                                                        <ExpansionPanelDetails style={{ display: 'inline-block' }}>
                                                                                            {result[key].map(url => {
                                                                                                return (
                                                                                                    <table className={classes.urlTable}>

                                                                                                        <tr>
                                                                                                            <th className={classes.urlTh} rowspan={url.url.length}>


                                                                                                                <ListItemText
                                                                                                                    primary={url.name}
                                                                                                                />


                                                                                                            </th>

                                                                                                            <td className={classes.urlTd}>
                                                                                                                <ListItemText
                                                                                                                    primary={<a target="_blank" href={url.url[0]}>{url.url[0]}</a>}
                                                                                                                />
                                                                                                            </td>
                                                                                                        </tr>
                                                                                                        {
                                                                                                            url.url.map((u, index) => {
                                                                                                                return (
                                                                                                                    index !== 0 ?
                                                                                                                        <>
                                                                                                                            <tr>
                                                                                                                                <td className={classes.urlTd}>
                                                                                                                                    <ListItemText
                                                                                                                                        primary={<a target="_blank" href={u}>{u}</a>}
                                                                                                                                    />
                                                                                                                                </td>
                                                                                                                            </tr>

                                                                                                                        </>
                                                                                                                        : ''
                                                                                                                )
                                                                                                            })
                                                                                                        }

                                                                                                    </table>

                                                                                                )
                                                                                            })}
                                                                                        </ExpansionPanelDetails>
                                                                                    </ExpansionPanel>
                                                                                )
                                                                                : ''
                                                                    }

                                                                </ListItem>
                                                                <Divider />
                                                            </>
                                                        )
                                                            : ''
                                                    )
                                                })
                                            }
                                        </List>
                                    </ExpansionPanelDetails>
                                </ExpansionPanel>

                            </Grid>
                        )
                            ;
                    })
                }
            </Grid>
        );
    }

    const getCVENVDDetails = () => {
        return (
            <div>
                <Grid container spacing={1}>
                    {getCVEHeaderGrid12()}
                </Grid>
            </div>
        );
    }

    const getByCVEData = () => {
        return (
            <>
                {getCVENVDDetails()}
            </>
        )
    }

    return (
        getByCVEData()
    );
};

export default ResultByCVEDate;