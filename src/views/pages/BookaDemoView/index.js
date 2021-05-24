import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik } from 'formik';
import Page from 'src/components/Page';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  Link,
  TextField,
  Typography,
  Container,
  makeStyles
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import wait from 'src/utils/wait';

const useStyles = makeStyles((theme) => ({
  root: {
    fontFamily: theme.typography.fontFamily
  },
  pagetitle :{
    padding: "115px 0px 115px",
    position: "relative",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right bottom",
    backgroundColor: "#1700a0",
    backgroundSize: "cover"
  },
  autocontainer : {

  },
  pagetitleH1 : {
    position: 'relative',
    fontWeight: '700',
    lineHeight: '1.2em',
    marginBottom: 15,
    fontSize: 60
  },
  pagetitleContent : {
    color: '#FFFFFF'
  }
}));

function BookaDemoView() {
  const [isAlertVisible, setAlertVisible] = useState(false);
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Contact Us - Niah Security "
    >
    <Container maxWidth="xl" className={classes.pagetitle}>
      <Container maxWidth="lg" display="flex"
            justifycontent="center"
            alignitems="center"
            maxWidth="lg" 
            className={classes.pagetitleContent}
            >
           <Typography
              variant="h1"
              align="center"
              className={classes.pagetitleH1}
            >
           Book a demo
           </Typography>
       </Container> 
      </Container>
      <Container maxWidth="xl">
      <Box mt={3}  >
          <Grid container>      
      <Grid
          item
          xs={12}
          md={6}
          style={{ margin: 'auto' }}
          display="flex"
          justifyContent="center"
        >

    <Formik
      initialValues={{
        email: '',
        firstName: '',
        lastName: '',
        message: '',
        policy: false
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().required('Required'),
        firstName: Yup.string().required('Required'),
        lastName: Yup.string().required('Required'),
        message: Yup.string().required('Required'),
        policy: Yup.boolean().oneOf([true], 'This field must be checked')
      })}
      onSubmit={async (values, {
        resetForm,
        setErrors,
        setStatus,
        setSubmitting
      }) => {
        try {
          // Make API request
          await wait(1000);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);
        } catch (error) {
          setStatus({ success: false });
          setErrors({ submit: error.message });
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
        <Card>
          <CardHeader title="Book a demo" />
          <Divider />
          <CardContent>
            {isAlertVisible && (
              <Box mb={3}>
                <Alert
                  onClose={() => setAlertVisible(false)}
                  severity="info"
                >
                  This is an info alert - check it out!
                </Alert>
              </Box>
            )}
            {isSubmitting ? (
              <Box
                display="flex"
                justifyContent="center"
                my={5}
              >
                <CircularProgress />
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Grid
                  container
                  spacing={2}
                >
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.firstName && errors.firstName)}
                      fullWidth
                      helperText={touched.firstName && errors.firstName}
                      label="First Name"
                      name="firstName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.firstName}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid
                    item
                    md={6}
                    xs={12}
                  >
                    <TextField
                      error={Boolean(touched.lastName && errors.lastName)}
                      fullWidth
                      helperText={touched.lastName && errors.lastName}
                      label="Last Name"
                      name="lastName"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.lastName}
                      variant="outlined"
                    />
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <TextField
                    error={Boolean(touched.email && errors.email)}
                    fullWidth
                    helperText={touched.email && errors.email}
                    label="Email Address"
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="email"
                    value={values.email}
                    variant="outlined"
                  />
                </Box>
                <Box mt={2}>
                  <TextField
                    error={Boolean(touched.message && errors.message)}
                    fullWidth
                    helperText={touched.message && errors.message}
                    label="Message"
                    name="message"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="message"
                    rows={4}
                    multiline
                    value={values.message}
                    variant="outlined"
                  />
                </Box>
                <Box
                  alignItems="center"
                  display="flex"
                  mt={2}
                  ml={-1}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                  >
                    I have read the
                    {' '}
                    <Link
                      component="a"
                      href="#"
                      color="secondary"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                <FormHelperText error>
                  {errors.policy}
                </FormHelperText>
                )}
                <Box mt={2}>
                  <Button
                    color="secondary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Box>
              </form>
            )}
          </CardContent>
        </Card>
      )}

    </Formik>

    </Grid>
     </Grid>
     </Box>
    </Container>
    </Page>
  );
}

export default BookaDemoView;
