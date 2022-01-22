import React, { useState } from 'react';
import {useHistory} from 'react-router';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import {
  Box,
  TextField,
  FormHelperText,
  makeStyles,
  InputAdornment,
  IconButton
} from '@material-ui/core';
import { login } from 'src/actions/accountActions';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { LoadingButton } from '@mui/lab';

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
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  /* const gitHubLogin = () => {
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
          // eslint-disable-next-line no-console
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
          <p spacing={3}>
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
            fullWidth
            type={showPassword ? 'text' : 'password'}
            label="Password"
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password}
            variant="outlined"
            name="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
          </p>
          <Box mt={2}>
            <LoadingButton
              // color="secondary"
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Login
            </LoadingButton>
            
            {errors.submit && (
              <Box mt={3}>
                <FormHelperText error>
                  {errors.submit}
                </FormHelperText>
              </Box>
            )}
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
