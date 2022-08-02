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
import './createAdminUser.css'
import { setIsLicenseCalled, setLicenseMessage, setProductType, setSubscriptionMessage, setSubscriptionStatus } from 'src/actions/licensingAction';
import { useDispatch, useSelector } from 'react-redux';
import { licenseURL } from 'src';

export default function CreateAdminUser() {

    const history = useHistory()
    const dispatch = useDispatch()

    const license = useSelector(state => state.license)

    const [companyName, setCompanyName] = useState('')
    const [companyId, setCompanyId] = useState('')
    const [teamName, setTeamName] = useState('')
    const [teamId, setTeamId] = useState('')

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const url = "org/details";
            const response = await Axios.get(url);
            if (response.data[0].teams.length > 0) {
                setCompanyName(response.data[0].companyname)
                setCompanyId(response.data[0].company_id)
                setTeamName(response.data[0].teams[0].teamname)
                setTeamId(response.data[0].teams[0].team_id)
            }

        } catch (error) {
            console.error(error);
        }
    };

    const signUpSchema = Yup.object().shape({
        email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
        password: Yup.string().required('Password is Required'),
        firstName: Yup.string().required('First Name is Required'),
        lastName: Yup.string().required('Last Name is Required'),
        address1: Yup.string().required('Address1 is required'),
        address2: Yup.string().required('Address2 is required'),
        state: Yup.string().required(' State is required'),
        country: Yup.string().required('Country is required'),
        city: Yup.string().required('City is required'),
        phone: Yup.string().required('Phone is Required'),
        pincode: Yup.string().required('Pincode is Required'),
    })

    const postAdminData = async (values) => {
        try {
            const response = await Axios.post('/admin/signup',
                {
                    company_id: companyId,
                    team_id: teamId,
                    emailAdd: values.email,
                    passWord: values.password,
                    firstname: values.firstName,
                    lastname: values.lastName,
                    address1: values.address1,
                    address2: values.address2,
                    state: values.state,
                    country: values.country,
                    phone: values.phone,
                    unique_id: "",
                    subscription_id: "",
                    city: values.city,
                    pincode: values.pincode,
                    companyname: companyName,
                }
            )

            /* if(response.data.message == "Admin User created"){
                 history.push('/login');
                 } */
        } catch (error) {
            console.error(error);
        }
        const  subscriptionResponse = await Axios.post(
            `${licenseURL}subscription/register`,
        {
            emailid: values.email,
            firstname: values.firstName,
            lastname: values.lastName,
            address: values.address1,
            state: values.state,
            country: values.country,
            phone: values.phone,
            city: values.city,
            pincode: values.pincode,
            companyname: companyName,
            subscription: "Free"
        }
    ) 
        dispatch(setSubscriptionMessage(subscriptionResponse.data))
        if (subscriptionResponse.data.status == 1) {
            dispatch(setSubscriptionStatus(true))
            const subscription_url = "/get/product"
            const response = await Axios.get(subscription_url);
            dispatch(setProductType(response.data.producttype))
            if (response.data.producttype == "standalone") {
                const post = await Axios.post('/update/license ', {
                    code: subscriptionResponse.data.code,
                    subscription: subscriptionResponse.data.subscription,
                })
                dispatch(setLicenseMessage(post))
                history.push('/login');
            }
        } else {
            history.push('/login');
        }

    };


    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                address1: '',
                address2: '',
                state: '',
                country: '',
                city: '',
                phone: '',
                pincode: '',
            }}
            validationSchema={signUpSchema}

           // onSubmit={(values) => postAdminData(values)}
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
                                Create Admin User
                            </Typography>
                            <TextField
                                fullWidth
                                label="Company Name"
                                margin="normal"
                                name="companyName"
                                type="text"
                                value={companyName}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                variant="outlined"
                            />
                            <TextField
                                fullWidth
                                label="Team Name"
                                margin="normal"
                                name="teamName"
                                type="text"
                                value={teamName}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                variant="outlined"
                            />
                            <div className='sub-div'>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    margin="normal"
                                    name="firstName"
                                    type="text"
                                    className='flex-contents'
                                    value={values.firstName}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    variant="outlined"
                                    error={Boolean(errors.firstName && touched.firstName)}
                                    helperText={touched.firstName && errors.first}
                                />
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    margin="normal"
                                    name="lastName"
                                    type="text"
                                    value={values.lastName}
                                    className='flex-contents'
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    variant="outlined"
                                    error={Boolean(errors.lastName && touched.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                />
                            </div>
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
                                label="Password"
                                margin="normal"
                                name="password"
                                type="password"
                                value={values.password}
                                onBlur={handleBlur}
                                onChange={handleChange}
                                variant="outlined"
                                error={Boolean(errors.password && touched.password)}
                                helperText={touched.password && errors.password}
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
                            </div>
                            <div className='sub-div'>
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
                                <TextField
                                    fullWidth
                                    label="Pincode"
                                    margin="normal"
                                    name="pincode"
                                    type="text"
                                    value={values.pincode}
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    className='flex-contents'
                                    variant="outlined"
                                    error={Boolean(errors.pincode && touched.pincode)}
                                    helperText={touched.pincode && errors.pincode}
                                />
                            </div>
                            <Box mt={2}>
                                <LoadingButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    onClick={() => postAdminData(values)}
                                >
                                    Create Admin User
                                </LoadingButton>
                            </Box>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );

}