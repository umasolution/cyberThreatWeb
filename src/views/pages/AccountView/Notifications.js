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
  makeStyles,
  Select,NativeSelect,TextField,FormControl,MenuItem,InputLabel
} from '@material-ui/core';

import wait from 'src/utils/wait';
import { useDispatch } from 'react-redux';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import { updateNotifications } from './../../../actions/accountActions';


const useStyles = makeStyles((theme) => ({
  root: {},
   button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function Notifications({ className, general,notification, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [notificationCheckboxes, setNotificationCheckboxes] = useState()
  const { enqueueSnackbar } = useSnackbar();
  
  const [selectData, setSelectData] = useState(notification.title.notification_id);

  useEffect(() => {
    const not = {};
    Object.keys(notification.title).forEach(k => {       
      not[k] =  notification.title[k] === "yes" ? true : notification.title[k]
      not[k] =  notification.title[k] === "no" ? false : notification.title[k]
    });
    setNotificationCheckboxes(not);

  }, [])

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log(event);
  //   // await dispatch(updateProfile(event));

  // };

   const handleSelect = (event) => {
    const value = event.target.value;    
    setSelectData(value);
    const not = {};    
    /*Object.keys(notification.lists).forEach(k => {
     if(notification.lists[k].notification_id===value) {
       setSelectedVal(notification.lists[k]); 
     }
    });
    console.log(selectedVal);
    return;*/
    var selNot = notification.lists[value];    
    Object.keys(selNot).forEach(k => {
      not[k] =  selNot[k] === "yes" ? true : selNot[k]
      not[k] =  selNot[k] === "no" ? false : selNot[k]
    });
    setNotificationCheckboxes(not);
  };

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
          values.team_id = general.team_id;
          values.company_id = general.company_id;
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
            <Grid
                item
                md={12}
                sm={12}
                xs={12}
              >
              
            <FormControl variant="outlined" className={classes.formControl}>
            
            <Select
              native
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              value={selectData} onChange={handleSelect.bind(this)} handleSelect
            >
             {Object.entries(notification.lists).map(([key, value]) => {
                  return (
                      <option  value={key} key={key} >{value.notification_name}</option >
                  );
              })}
            </Select>
          </FormControl>
            </Grid>
            {notificationCheckboxes && (
              <Grid
                item
                md={12}
                sm={12}
                xs={12}
              >
                {/*<Typography
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
                </Typography>*/}
                <Typography
                  gutterBottom
                  variant="body2"
                  color="textSecondary"
                >
                  {notificationCheckboxes.notification_name}
                </Typography>
                
                <div>
                  <FormControlLabel
                    control={(
                      <Checkbox disabled checked={notificationCheckboxes.notification_email} onChange={handleChange} name="notification_email" />
                    )}
                    label="Email alerts"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={(
                      <Checkbox disabled checked={notificationCheckboxes.notification_textmessage} onChange={handleChange} name="notification_textmessage" />
                    )}
                    label="Text message"
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={(
                      <Checkbox disabled checked={notificationCheckboxes.notification_phonecall} onChange={handleChange} name="notification_phonecall" />
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
