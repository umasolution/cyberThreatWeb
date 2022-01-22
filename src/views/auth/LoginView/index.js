import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import githubFill from '@iconify/icons-eva/github-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import './Login.css';
import {
  Button,
  Container,
  Card,
  Divider,
  Link,
  Typography,
  Stack,
} from '@mui/material';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import LoginForm from './LoginForm';

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

  const handleSubmitSuccess = () => {
    history.push('/app');
  };

  return (
    <RootStyle title="Login">
      <p>
      <header className="logoContent">
          <RouterLink to="/">
            <Logo className='login-logo-bedge' />
          </RouterLink>
        <p className="start">
          Don’t have an account? &nbsp;
          <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
            Get started
          </Link>
        </p>
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
          <Stack direction="row" spacing={2}>
            
            <Button fullWidth size="large" color="inherit" variant="outlined">
              <Icon icon={facebookFill} color="#1877F2" height={24} />
            </Button>

            <Button fullWidth size="large" color="inherit" variant="outlined" href="https://github.com/login/oauth/authorize?client_id=Iv1.cbf6b865ac4843fb">
              <Icon icon={githubFill} color="#1C9CEA" height={24} />
            </Button>
          </Stack>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              OR
            </Typography>
          </Divider>

          <LoginForm onSubmitSuccess={handleSubmitSuccess} />

        </ContentStyle>
      </Container>
    </RootStyle>
    
  );
}

export default LoginView;
