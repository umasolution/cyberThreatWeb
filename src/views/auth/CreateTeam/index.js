import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useHistory } from 'react-router';
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Link,
  Typography,
} from '@material-ui/core';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import GenericDialog from 'src/views/Shared/GenericDialog';
import CreateTeam from './CreateTeam';
import '../LoginView/Login.css'

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    background: '#FFFFFF',
  }
}));


const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));


function RegisterView() {
  const history = useHistory();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSubmitSuccess = () => {
    setIsDialogOpen(true);
  };

  const dialogAgree = () => {
    history.push('/app/login');
  }

  return (
    <RootStyle title="Team">
      <p>
        <header className="logoContent">
          <RouterLink to="/">
            <Logo className='login-logo-bedge' />
          </RouterLink>
        </header>
      </p>

      <p className="registerImg" width="mdDown">
        <p>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }} style={{paddingTop: "40px"}}>
            <p className="welcome">DevOps to DevSecOps. Build confidently.</p>
          </Typography>
          <img alt="register" src="/static/illustration_register.png" />
        </p>
      </p>

      <Container>
        <ContentStyle>

            <CreateTeam onSubmitSuccess={handleSubmitSuccess} />

          <Typography className="registerTerms" variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
            By registering, I agree to &nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link underline="always" sx={{ color: 'text.primary' }}>
              Privacy Policy
            </Link>
            .
          </Typography>

        </ContentStyle>
      </Container>
      <GenericDialog
        isOpen={isDialogOpen}
        title="Verification Email Sent"
        description="A verification link has been send to your email, Please click on the link to activate your account."
        agreeActionText="Ok"
        agreeAction={dialogAgree}
        onCloseAction={dialogAgree}
      />
    </RootStyle>
  );
}

export default RegisterView;
