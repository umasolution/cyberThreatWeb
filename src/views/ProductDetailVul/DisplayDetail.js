import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
    Avatar,
    Box,
    Card,
    Typography,
    makeStyles,
    Grid,
    Divider
} from '@material-ui/core';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Label from 'src/components/Label';
import { THEMES } from 'src/constants';



const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '100%',
        width: '100%',
        margin: 'auto'
    },
    label: {
        backgroundColor: theme.palette.action.selected,
    },
    avatar: {

        backgroundColor: theme.palette.info.light,
    },
    contentH3: {
        fontWeight: theme.fontfamily.semiBold,
        fontSize: '18px',
        lineHeight: '2'
    }
}));

function DisplayDetail({ className, header, gridSize, value, index, ...rest }) {
    const classes = useStyles();


    return (
        <Grid
            item
            lg={4}
            sm={6}
            xs={12}
        >
            <Card
                className={clsx(classes.root, className)}
                {...rest}
            >
                <Grid container
                    spacing={2}>
                    <Grid
                        item
                        lg={6}
                        sm={6}
                        xs={6}
                        className={classes.avatar}

                    >

                        <Typography
                            component="h3"

                            className={classes.contentH3}
                            variant="overline"

                            align="center"
                        >
                            {header}
                        </Typography>
                    </Grid>

                    <Grid
                        item
                        lg={6}
                        sm={6}
                        xs={6}
                        className={classes.label}
                    >
                        <Typography
                            component="h3"

                            className={classes.contentH3}
                            variant="overline"
                            align="center"

                        >
                            {value}
                        </Typography>
                    </Grid>
                </Grid>
            </Card></Grid>
    );
}

DisplayDetail.propTypes = {
    className: PropTypes.string
};

export default DisplayDetail;
