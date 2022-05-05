import { Alert, Paper, Snackbar, Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  FormEventHandler,
  SyntheticEvent,
  useContext,
  useState,
} from 'react';
import GenericSnackBar from '../components/GenericSnackBar';
import { LoginFetch } from '../lib/api/login';
import { LoginContext } from '../lib/LoginContext';

const Login = () => {
  const router = useRouter();

  const context = useContext(LoginContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined,
  );

  // redirect to home page if already logged in

  if (context.user) router.push('/');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: SyntheticEvent<any>) => {
    event.preventDefault();

    try {
      const { success, message } = await LoginFetch(
        username,
        password,
        context.setTokens,
      );

      if (success) router.push('/');
      else setErrorMessage(message);
    } catch (e) {
      console.log(e);
      setErrorMessage(JSON.stringify(e));
    }
  };

  // redirect to home page if already logged in

  if (context.user) router.push('/');

  return (
    <>
      <GenericSnackBar
        message={errorMessage}
        setMessage={setErrorMessage}
        severity="error"
      />

      <Paper
        elevation={3}
        sx={{
          maxWidth: '30rem',
          p: '2rem',
          marginRight: 'auto',
          marginLeft: 'auto',
        }}
      >
        <Box
          component="form"
          sx={{
            display: 'flex',
            alignItems: 'right',
            flexFlow: 'column',
          }}
          onSubmit={handleLogin}
        >
          <Stack spacing={2}>
            <Typography variant="h5">Log in </Typography>

            <TextField
              required
              label="Username"
              value={username}
              onChange={handleUsernameChange}
            />
            <TextField
              required
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
            />
            <Button type="submit" variant="contained">
              Login
            </Button>
            <Typography>
              Don’t have an account ?{' '}
              <Link href="/register" passHref>
                <Typography component="a" color="primary">
                  Register here
                </Typography>
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};

export default Login;
