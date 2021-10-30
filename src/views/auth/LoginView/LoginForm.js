import React from 'react';
import {useHistory} from 'react-router';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  Button,
  TextField,
  FormHelperText,
  makeStyles,
  Grid,
  Link
} from '@material-ui/core';
import { login } from 'src/actions/accountActions';
import FacebookIcon from '@material-ui/icons/Facebook';
import GitHubIcon from '@material-ui/icons/GitHub';

const useStyles = makeStyles(() => ({
  root: {}
}));


function LoginForm({ className, onSubmitSuccess, ...rest }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history=useHistory();

  const clientId= "Iv1.7e5a6deb9eb3dea8";
  const clientSecret=" client secret:cc7b5b40332640779a46a1b7afa017b340470260";
  const redirectUri="http://localhost:3001/app/reports/dashboard";


  /*const gitHubLogin = () => {
    history.push('http://www.googl.com');
    //https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}
  }
  */

  return (
    <Formik
      initialValues={{
        email: '',
        password: ''
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().max(255).required('Password is required')
      })}
      onSubmit={async (values, {
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          await dispatch(login(values.email, values.password));
          onSubmitSuccess();
        } catch (error) {
          console.error(error);
          const message = error || 'Something went wrong';
          // const message = (error.response && error.response.data.message) || 'Something went wrong';
          setStatus({ success: false });
          setErrors({ submit: message });
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
        <form
          noValidate
          className={clsx(classes.root, className)}
          onSubmit={handleSubmit}
          {...rest}
        >
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
            helperText={touched.email && errors.email}
            label="Email Address"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box mt={2}>
            <Button
              color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
            >
              Log In
            </Button>
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>
                  {errors.submit}
                </FormHelperText>
              </Box>
            )}
          </Box>
          <Box mt={2}>
            
            <Grid container spacing={1}>
              <Grid container item xs={6} >
                 <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  style={{width:'100%'}}
                  className={classes.button}
                  startIcon={<FacebookIcon />}
                >
                  Facebook
                </Button>

              </Grid>
              <Grid container item xs={6}>
                <a href="https://github.com/login/oauth/authorize?client_id=Iv1.cbf6b865ac4843fb">
                <Button
                  variant="contained"
                  color="black"
                  size="large"
                  style={{width:'100%'}}
                  className={classes.button}
                  startIcon={<GitHubIcon />}
              
                >
                  GitHub
                </Button>
                </a>
              </Grid>
              
            </Grid>
          </Box>
        </form>
      )}
    </Formik>
  );
}

LoginForm.propTypes = {
  className: PropTypes.string,
  onSubmitSuccess: PropTypes.func
};

LoginForm.defaultProps = {
  onSubmitSuccess: () => {}
};

export default LoginForm;
