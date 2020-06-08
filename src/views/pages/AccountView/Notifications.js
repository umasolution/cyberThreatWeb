import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  Typography,
  makeStyles
} from '@material-ui/core';
import wait from 'src/utils/wait';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { updateNotifications } from './../../../actions/accountActions';


const useStyles = makeStyles(() => ({
  root: {}
}));

function Notifications({ className, notification, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [notificationCheckboxes, setNotificationCheckboxes] = useState()
  const { enqueueSnackbar } = useSnackbar();


  useEffect(() => {
    const not = {};
    Object.keys(notification).forEach(k => { not[k] = notification[k].toLowerCase() === "true" ? true : false});
    setNotificationCheckboxes(not);

  }, [])

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(event);
  //   // await dispatch(updateProfile(event));

  // };

  const handleChange = (event) => {
    setNotificationCheckboxes({ ...notificationCheckboxes, [event.target.name]: event.target.checked });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={notificationCheckboxes}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {

          await dispatch(updateNotifications(values));
          // resetForm();
          setStatus({ success: true });
          enqueueSnackbar('Profile updated', {
            variant: 'success'
          });
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleSubmit,
        isSubmitting,
        touched,
        values
      }) => (
    <form onSubmit={handleSubmit}>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardHeader title="Notifications" />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={6}
            wrap="wrap"
          >
            {notificationCheckboxes && (
              <Grid
                item
                md={4}
                sm={6}
                xs={12}
              >
                <Typography
                  gutterBottom
                  variant="h6"
                  color="textPrimary"
                >
                  System
                </Typography>
                <Typography
                  gutterBottom
                  variant="body2"
                  color="textSecondary"
                >
                  You will recieve emails in your business email address
                </Typography>
                <div>
                  <FormControlLabel
                    control={(
                      <Checkbox checked={notificationCheckboxes.notificationEmail} onChange={handleChange} name="notificationEmail" />
                    )}
                    label="Email alerts"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={(
                      <Checkbox checked={notificationCheckboxes.notificationTextMessage} onChange={handleChange} name="notificationTextMessage" />
                    )}
                    label="Text message"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={(
                      <Checkbox checked={notificationCheckboxes.phoneCall} onChange={handleChange} name="phoneCall" />
                    )}
                    label={(
                      <>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                        >
                          Phone calls
                        </Typography>
                        <Typography variant="caption">
                          Short voice phone updating you
                        </Typography>
                      </>
                    )}
                  />
                </div>
              </Grid>
            )}
          </Grid>
        </CardContent>
        <Divider />
        <Box
          p={2}
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            color="secondary"
            type="submit"
            variant="contained"
          >
            Save Settings
          </Button>
        </Box>
      </Card>
    </form>
   )}
   </Formik>
  );
}

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
