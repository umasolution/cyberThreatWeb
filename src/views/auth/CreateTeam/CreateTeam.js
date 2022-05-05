import React, { useEffect, useState } from 'react'
import {
    Box,
    TextField,
    Typography
} from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import Axios from 'axios';
import { Formik } from 'formik';
import * as Yup from 'yup';


export default function CreateTeam() {

    const [company, setCompany] = useState('')
    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const url = "org/details";
            const response = await Axios.get(url);
            if (response.data.teams.company_id) {
                setCompany(response.data.teams.company_id[0])
            }
        } catch (error) {
            console.error(error);
        }
    };


    const signUpSchema = Yup.object().shape({
        companyId: Yup.string().max(255).required('Company Id is required'),
        teamName: Yup.string().max(255).required('Team name is required'),
    })
    const postData = async (values) => {
        console.log(values)
        try {
            const response = await Axios.post('/team/register',
                {
                    company_id: company != '' ? company : values.companyId,
                    team_name: values.teamName
                }
            )
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Formik
            initialValues={{
                companyId: '',
                teamName: '',
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
                    <div className='main-div' style={{ width: "100%" }}>
                        <div className='content-div'>
                            <Typography variant="h2" gutterBottom className='title'>
                                Create Team
                            </Typography>
                            <TextField
                                error={Boolean(touched.companyId && errors.companyId)}
                                fullWidth
                                helperText={touched.companyId && errors.companyId}
                                label="Company Id"
                                margin="normal"
                                name="companyId"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="companyId"
                                value={company != '' ? company : values.companyId}
                                variant="outlined"
                            />
                            <TextField
                                error={Boolean(touched.teamName && errors.teamName)}
                                fullWidth
                                helperText={touched.teamName && errors.teamName}
                                label="Team Name"
                                margin="normal"
                                name="teamName"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                type="teamName"
                                value={values.teamName}
                                variant="outlined"
                            />

                            <Box mt={2}>
                                <LoadingButton
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                >
                                    Create Team
                                </LoadingButton>
                            </Box>
                        </div>
                    </div>
                </form>
            )}
        </Formik>
    )
}