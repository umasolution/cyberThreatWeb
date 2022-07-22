import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { styled } from '@mui/material/styles';
import './Login.css';
import {
  Container,
  Card,
  Link,
  Typography,
  Stack,
} from '@mui/material';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import AuthSocial from '../AuthSocial';
import LoginForm from './LoginForm';
import Axios from 'axios';
import data from '@iconify/icons-eva/github-fill';
import { useDispatch } from 'react-redux';

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    background: '#FFFFFF',
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  height: '100%'
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));


function LoginView() {
  const history = useHistory();
  const dispatch = useDispatch()

  const [disableSignup, setDisableSignup] = useState(false)

  const handleSubmitSuccess = () => {
    history.push('/app');
  };

  useEffect(() => {
   getData()
    },[])
    
    const getData = async () => {
      try {
        const url = "org/details";      
        const response = await Axios.get(url);
        if(!response.data.length > 0){
         history.push('/create-company');
        } 
        if(!response.data[0].teams.length > 0){
          history.push('/create-team');
         } 

         const signinUrl = "niah/profile/public"
         const getResponse = await Axios.get(signinUrl);
        if(getResponse.data.auto_signup == "no"){
          setDisableSignup(true)
        }
      } catch (error) {
        console.error(error);
      }
    };

  return (
    <RootStyle title="Login">
      <p>
        <header className="logoContent">
          <RouterLink to="/">
            <Logo className='login-logo-bedge' />
          </RouterLink>
          {
            !disableSignup ? (
              <p className="start">
              Don’t have an account? &nbsp;
              <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
                Get started
              </Link>
            </p>
            ) : <></>
          }
        
        </header> 
      </p>

      <p width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            <p className="welcome">Hi, Welcome Back</p>
          </Typography>
          <img src="/static/illustration_login.png" alt="login" />
        </SectionStyle>
      </p>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack sx={{ mb: 5 }}>
            <Typography variant="h4" gutterBottom>
              Sign in
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>Enter your details below.</Typography>
          </Stack>
          <AuthSocial />

          <LoginForm onSubmitSuccess={handleSubmitSuccess} />

        </ContentStyle>
      </Container>
    </RootStyle>
    
  );
}

export default LoginView;
