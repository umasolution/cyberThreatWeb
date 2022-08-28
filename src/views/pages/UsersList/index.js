import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  LinearProgress,
  makeStyles,
  TextField,
} from '@material-ui/core';
import Button from '@mui/material/Button';
import Page from 'src/components/Page';
import { useDispatch, useSelector } from 'react-redux';
import Header from './Headers';
import Axios from 'axios';
import { openRegisterUser, openResetPassword, setMasterUsersList, updateDeletedUser } from 'src/actions/userMasterAction';
import './index.css'
import ResetPassword from './ResetPassword';
import RegisterUser from './RegisterUser';



const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3)
  }
}));

function UsersList() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [user, setUser] = useState(false)
  const [resetUser, setResetUser] = useState({})


  const usersList = useSelector(state => state.userMaster.masterUsersList)
  const userMaster = useSelector(state => state.userMaster)


  useEffect(() => {
    getListedUsers()
  }, [userMaster.updateRegisteredUser, userMaster.updateDeletedUser]);

  const getListedUsers = async () => {
    try {
      const url = 'user/register/list'
      const response = await Axios.get(url)
      dispatch(setMasterUsersList(response.data.data))
      setUser(true)
    } catch (error) {
      console.log(error)
    }
  };

  const onDeleteUser = async (user) => {
    try {
      const url = 'user/register/delete'
      const response = await Axios.post(url, {
        userid: user.uuid
      })
      dispatch(updateDeletedUser(!userMaster.updateDeletedUser))
    } catch (error) {
      console.log(error)
    }
  };

  const onResetPassword = (resetdetails) => {
    setResetUser(resetdetails)
    dispatch(openResetPassword(true))
  };


  const onAddUser = () => {
    dispatch(openRegisterUser(true))
  };

  return (
    <Page
      className={classes.root}
      title="User Master"
    >
      <Container maxWidth>
        <Header />
        <div>
          <Button
            size="large"
            type="submit"
            variant="contained"
            onClick={onAddUser}
            className='add-user'
          >
            Register User
          </Button>
        </div>
        {
          user ? (
            <Box mt={3} className='userslist'>
              {
                usersList.map((user) => (
                  <div className='users'>
                    <TextField
                      label="Username"
                      margin="normal"
                      name="Username"
                      type="text"
                      inputProps={{ readOnly: true }}
                      value={user.username}
                      variant="outlined"
                      className='flex-contents'
                      fullWidth
                    />
                    <TextField
                      label="Emailid"
                      margin="normal"
                      name="Emailid"
                      type="text"
                      inputProps={{ readOnly: true }}
                      value={user.email_id}
                      variant="outlined"
                      className='flex-contents'
                      fullWidth
                    />
                    <TextField
                      label="Firstname"
                      margin="normal"
                      name="Firstname"
                      type="text"
                      inputProps={{ readOnly: true }}
                      value={user.firstname}
                      variant="outlined"
                      className='flex-contents'
                      fullWidth
                    />
                    <TextField
                      label="Lastname"
                      margin="normal"
                      name="Lastname"
                      type="text"
                      inputProps={{ readOnly: true }}
                      value={user.lastname}
                      variant="outlined"
                      className='flex-contents'
                      fullWidth
                    />
                    <Button
                      onClick={() => onDeleteUser(user)}
                      variant="contained"
                      size="medium"
                      className='userbutton'
                      fullWidth
                    >
                      Delete
                    </Button>
                    <Button
                      variant="contained"
                      size="medium"
                      className='userbutton'
                      onClick={() => onResetPassword(user)}
                      fullWidth
                    >
                      Reset Password
                    </Button>

                  </div>
                ))
              }

            </Box>
          ) : <></>
        }
        {
          userMaster.reset ? <ResetPassword reset={userMaster.reset} user={resetUser} /> : <></>
        }

        {
          userMaster.registerUser ? <RegisterUser register={userMaster.registerUser} /> : <></>
        }
      </Container>
    </Page>
  );
}

export default UsersList;
