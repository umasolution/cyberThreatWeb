import React, { useEffect, useState } from 'react'
import {
    Box,
    TextField,
    Typography
  } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import Axios from 'axios';
import { useHistory } from 'react-router';
import data from '@iconify/icons-eva/github-fill';
import { Formik } from 'formik';
import './createCompany.css'

export default function CreateCompany() {

  const history = useHistory()
   
  const signUpSchema = Yup.object().shape({
    companyName: Yup.string().required('Company name is required'),
    email:Yup.string().email('Must be a valid email').max(255).required('Email is required'),
    address1: Yup.string().required('Address1 is required'),
    address2: Yup.string().required('Address2 is required'),
    state: Yup.string().required(' State is required'),
    country: Yup.string().required('Country is required'),
    city: Yup.string().required('City is required'),
    phone: Yup.string().required('Phone is Required'),
  })

const postData = async (values) => {
 try {
   const response = await Axios.post('/org/register', 
   {
    companyname:  values.companyName,
     emailid:  values.email,
     address1: values.address1,
     address2:  values.address2,
     state:  values.state,
     country:  values.country,
     city:  values.city,
     phone:  values.phone
   }
   )
   console.log(response)
 } catch (error) {
   console.error(error);
 }
 getData()
};

const getData = async () => {
  try {
    const url = "org/details";      
    const response = await Axios.get(url);
    console.log(response)
    if(!response.data.teams.length > 0){
     history.push('/create-team');
    }else{
        history.push('/login');
    }
    
  } catch (error) {
    console.error(error);
  }
};

return (
  <Formik
    initialValues={{
      companyName: '',
      email: '',
     address1: '',
     address2: '',
     state: '',
     country: '',
     city: '',
      phone: ''
    }}
    validationSchema={signUpSchema}

    onSubmit={(values) => postData(values)}
  >
    {({
      errors,
      handleBlur,
      handleChange,
      handleSubmit,
      touched,
      values
    }) => (
      <form
        onSubmit={handleSubmit}
      >
         <div className='main-div'>
         <div className='content-div'>
       <Typography variant="h2" gutterBottom className='title' >
              Create Company
            </Typography>
       <TextField
          fullWidth
          label="Company Name"
          margin="normal"
          name="companyName"
          type="text"
          value={values.companyName}
          onBlur={handleBlur}
          onChange={handleChange}
          variant="outlined"
          error={Boolean(errors.companyName && touched.companyName)}
          helperText={touched.companyName && errors.companyName}
        />
          <TextField
          fullWidth
          label="Email Address"
          margin="normal"
          name="email"
          type="email"
          value={values.email}
          onBlur={handleBlur}
          onChange={handleChange}
          variant="outlined"
          error={Boolean(errors.email && touched.email)}
          helperText={touched.email && errors.email}
        />
         <TextField
          fullWidth
          label="Address 1"
          margin="normal"
          name="address1"
          type="text"
          value={values.address1}
          onBlur={handleBlur}
          onChange={handleChange}
          variant="outlined"
          error={Boolean(errors.address1 && touched.address1)}
          helperText={touched.address1 && errors.address1}
        />
         <TextField
          fullWidth
          label="Address 2"
          margin="normal"
          name="address2"
          type="text"
          value={values.address2}
          onBlur={handleBlur}
          onChange={handleChange}
          variant="outlined"
          error={Boolean(errors.address2 && touched.address2)}
          helperText={touched.address2 && errors.address2}
        />
        <div className='sub-div'>
          <TextField
          fullWidth
          label="State"
          margin="normal"
          name="state"
          type="text"
          className='flex-contents'
          value={values.state}
          onBlur={handleBlur}
          onChange={handleChange}
          variant="outlined"
          error={Boolean(errors.state && touched.state)}
          helperText={touched.state && errors.state}
        />
          <TextField
          fullWidth
          label="Country"
          margin="normal"
          name="country"
          type="text"
          className='flex-contents'
          value={values.country}
          onBlur={handleBlur}
          onChange={handleChange}
          variant="outlined"
          error={Boolean(errors.country && touched.country)}
          helperText={touched.country && errors.country}
        />
        </div>
        <div className='sub-div'>
          <TextField
          fullWidth
          label="City"
          margin="normal"
          name="city"
          type="text"
          value={values.city}
          className='flex-contents'
          onBlur={handleBlur}
          onChange={handleChange}
          variant="outlined"
          error={Boolean(errors.city && touched.city)}
          helperText={touched.city && errors.city}
        />
          <TextField
          fullWidth
          label="Phone"
          margin="normal"
          name="phone"
          type="number"
          value={values.phone}
          onBlur={handleBlur}
          onChange={handleChange}
          className='flex-contents'
          variant="outlined"
          error={Boolean(errors.phone && touched.phone)}
          helperText={touched.phone && errors.phone}
        />
        </div>
        <Box mt={2}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
          >
            Create Company
          </LoadingButton>
        </Box>
        </div>
        </div>
      </form>
    )}
  </Formik>
);

}