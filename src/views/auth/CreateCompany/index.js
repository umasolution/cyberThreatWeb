import React, { useEffect, useState } from 'react'
import {
    Box,
    TextField,
  } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import Axios from 'axios';
import { useHistory } from 'react-router';

export default function CreateCompany() {
 
    const history = useHistory()
    const [companyname, setCompanyName] = useState('')
    const [email, setEmail] = useState('')
    const [address1, setAddress1] = useState('')
    const [address2, setAddress2] = useState('')
    const [state, setState] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [phone, setPhone] = useState()

    useEffect(() => {
    //  getData()
       },[])
       
       const getData = async () => {
         try {
           const url = "org/details";      
           const response = await Axios.get(url);
           console.log(response)
            history.push('/create-team');
         } catch (error) {
           console.error(error);
         }
       };
   
     const CreateCompany =  () => {
         postData()
     }
     const postData = async () => {
       console.log('clicked')
      try {
        const response = await Axios.post('/org/register', 
        {
          companyname:  companyname,
          emailid:  email,
          address1: address1,
          address2:  address2,
          state:  state,
          country:  country,
          city:  city,
          phone:  phone
        }
        )
        console.log(response)
      } catch (error) {
        console.error(error);
      }
    };
     return(
         <div style={{display:"flex", justifyContent:"center"}}>
         <div style={{width : "60%",display:"inline-block", textAlign:"center"}}>
          <TextField
            fullWidth
            autoFocus
            label="Company Name"
            margin="normal"
            name="company name"
            type="text"
            value={companyname}
            onChange={(event) => setCompanyName(event.target.value)}
            variant="outlined"
          />
            <TextField
            fullWidth
            autoFocus
            label="Email Address"
            margin="normal"
            name="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            variant="outlined"
          />
           <TextField
            fullWidth
            autoFocus
            label="Address 1"
            margin="normal"
            name="address"
            type="text"
            value={address1}
            onChange={(event) => setAddress1(event.target.value)}
            variant="outlined"
          />
           <TextField
            fullWidth
            autoFocus
            label="Address 2"
            margin="normal"
            name="address"
            type="text"
            value={address2}
            onChange={(event) => setAddress2(event.target.value)}
            variant="outlined"
          />
            <TextField
            fullWidth
            autoFocus
            label="State"
            margin="normal"
            name="state"
            type="text"
            value={state}
            onChange={(event) => setState(event.target.value)}
            variant="outlined"
          />
            <TextField
            fullWidth
            autoFocus
            label="Country"
            margin="normal"
            name="country"
            type="text"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            variant="outlined"
          />
            <TextField
            fullWidth
            autoFocus
            label="City"
            margin="normal"
            name="city"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            variant="outlined"
          />
            <TextField
            fullWidth
            autoFocus
            label="Phone"
            margin="normal"
            name="phone"
            type="number"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            variant="outlined"
          />
          <Box mt={2}>
            <LoadingButton
              fullWidth={true}
              size="large"
              type="submit"
              variant="contained"
              onClick={() =>CreateCompany()}
            >
              Create Company
            </LoadingButton>
          </Box>
          
         </div>
         </div>
     )
}