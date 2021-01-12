import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormHelperText,
  Grid,
  Switch,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core';
import { updateProfile } from 'src/actions/accountActions';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';



const stateOptions = ['Alabama', 'New York', 'San Francisco'];

const useStyles = makeStyles(() => ({
  root: {}
}));

function GeneralSettings({ user, className, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [state,setState] = useState();
  const [country,setCountry] = useState();

  useEffect(() => {    
    if(user){
      setState(user.state);
      setCountry(user.country);
    }
  }, [user])

  return (
    <Formik
      enableReinitialize
      initialValues={{
        address1: user.address1,
        address2: user.address2,
        company: user.company_name,
        country: country,
        email_id: user.email_id,
        firstname: user.firstname,
        lastname: user.lastname,
        phone: user.phone,
        team_name: user.team_name,
        state: state,
      }}
      validationSchema={Yup.object().shape({
        /*country: Yup.string().max(255).required('Country is required'),*/
        email_id: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        firstname: Yup.string().max(255).required('First name is required'),
        lastname: Yup.string().max(255).required('Last name is required')
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await dispatch(updateProfile(values));
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
        handleChange,
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
              <CardHeader title="Profile" />
              <Divider />
              <CardContent>
                <Grid
                  container
                  spacing={4}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.firstname && errors.firstname)}
                      fullWidth
                      helperText={touched.firstname && errors.firstname}
                      label="First Name"
                      name="firstname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      type="firstname"
                      value={values.firstname}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.lastname && errors.lastname)}
                      fullWidth
                      helperText={touched.lastname && errors.lastname}
                      label="Last Name"
                      name="lastname"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      type="lastname"
                      value={values.lastname}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.email_id && errors.email_id)}
                      fullWidth
                      helperText={touched.email_id && errors.email_id ? errors.email_id : 'We will use this email to contact you'}
                      label="Email Address"
                      name="email_id"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      disabled
                      type="email_id"
                      value={values.email_id}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.phone && errors.phone)}
                      fullWidth
                      helperText={touched.phone && errors.phone}
                      label="Phone Number"
                      name="phone"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.phone}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <CountryDropdown
                      value={country}
                      onChange={(country) => {setCountry(country)}} />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <RegionDropdown
                      country={values.country}
                      value={state}
                      onChange={(state) => setState(state)} />

                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.address1 && errors.address1)}
                      fullWidth
                      helperText={touched.address1 && errors.address1}
                      label="Address 1"
                      name="address1"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      type="address1"
                      value={values.address1}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.address2 && errors.address2)}
                      fullWidth
                      helperText={touched.address2 && errors.address2}
                      label="Address 2"
                      name="address2"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      type="address2"
                      value={values.address2}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.company && errors.company)}
                      fullWidth
                      helperText={touched.company && errors.company}
                      label="Company"
                      name="company"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      type="company"
                      value={values.company}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.team_name && errors.team_name)}
                      fullWidth
                      helperText={touched.team_name && errors.team_name}
                      label="Team Name"
                      name="team_name"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      type="team_name"
                      value={values.team_name}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                {errors.submit && (
                  <Box mt={3}>
                    <FormHelperText error>
                      {errors.submit}
                    </FormHelperText>
                  </Box>
                )}
              </CardContent>
              <Divider />
              <Box
                p={2}
                display="flex"
                justifyContent="flex-end"
              >
                <Button
                  color="secondary"
                  disabled={isSubmitting}
                  type="submit"
                  variant="contained"
                >
                  Save Changes
              </Button>
              </Box>
            </Card>
          </form>
        )}
    </Formik>
  );
}

GeneralSettings.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object.isRequired
};

export default GeneralSettings;
