import React, { useState } from 'react'
import {
    Box,
    TextField,
  } from '@material-ui/core';
import { LoadingButton } from '@mui/lab';
import Axios from 'axios';


export default function CreateTeam() {
    
    const [companyid, setCompanyId] = useState('')
    const [teamName, setTeamName] = useState('')

    const CreateTeam = () => {
      postData()
     }
     const postData = async () => {
      console.log('clicked')
     try {
      const response = await Axios.post('/team/register', 
      {
        company_id:   companyid,
        team_name:  teamName
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
            label="Company Id"
            margin="normal"
            name="company Id"
            type="text"
            value={companyid}
            onChange={(event) => setCompanyId(event.target.value)}
            variant="outlined"
          />
            <TextField
            fullWidth
            autoFocus
            label="Team Name"
            margin="normal"
            name="team name"
            type="text"
            value={teamName}
            onChange={(event) => setTeamName(event.target.value)}
            variant="outlined"
          />
            <Box mt={2}>
            <LoadingButton
              fullWidth={true}
              size="large"
              type="submit"
              variant="contained"
            onClick={() => CreateTeam()}
            >
              Create Team
            </LoadingButton>
          </Box>
          </div>
          </div>
     )
}