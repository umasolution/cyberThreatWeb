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
        address: user.address,
        company: user.company,
        country: country,
        emailAdd: user.emailAdd,
        fName: user.fName,
        lName: user.lName,
        phone: user.phone,
        position: user.position,
        state: state,
      }}
      validationSchema={Yup.object().shape({
        country: Yup.string().max(255).required('Country is required'),
        emailAdd: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        fName: Yup.string().max(255).required('First name is required'),
        lName: Yup.string().max(255).required('Last name is required')
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
                      error={Boolean(touched.fName && errors.fName)}
                      fullWidth
                      helperText={touched.fName && errors.fName}
                      label="First Name"
                      name="fName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      type="fName"
                      value={values.fName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.lName && errors.lName)}
                      fullWidth
                      helperText={touched.lName && errors.lName}
                      label="Last Name"
                      name="lName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      type="lName"
                      value={values.lName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.emailAdd && errors.emailAdd)}
                      fullWidth
                      helperText={touched.emailAdd && errors.emailAdd ? errors.emailAdd : 'We will use this email to contact you'}
                      label="Email Address"
                      name="emailAdd"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      disabled
                      type="emailAdd"
                      value={values.emailAdd}
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
                      value={values.country}
                      onChange={(country) => {setCountry(country)}} />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <RegionDropdown
                      country={values.country}
                      value={values.state}
                      onChange={(state) => setState(state)} />

                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.address && errors.address)}
                      fullWidth
                      helperText={touched.address && errors.address}
                      label="Address"
                      name="address"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      type="address"
                      value={values.address}
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
                      error={Boolean(touched.position && errors.position)}
                      fullWidth
                      helperText={touched.position && errors.position}
                      label="Designation"
                      name="position"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      required
                      type="position"
                      value={values.position}
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
