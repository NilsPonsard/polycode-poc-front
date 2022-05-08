import {
  Alert,
  Checkbox,
  FormControlLabel,
  Paper,
  Snackbar,
  Stack,
  TextField,
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { SyntheticEvent, useContext, useState } from 'react';
import GenericSnackBar, { SnackSeverity } from '../components/GenericSnackBar';
import { RegisterUserFetch } from '../lib/api/register';
import { LoginContext } from '../lib/LoginContext';
import { Link as MuiLink } from '@mui/material';

function validateEmail(emailAdress: string) {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (emailAdress.match(regexEmail)) {
    return true;
  } else {
    return false;
  }
}

const Register = () => {
  const router = useRouter();

  const context = useContext(LoginContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [email, setEmail] = useState('');
  const [tos, setTos] = useState(false);
  const [thirteen, setThirteen] = useState(false);

  const [usernameError, setUsernameError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const [passwordError, setPasswordError] = useState('');
  const [mailError, setMailError] = useState('');

  const [snackMessage, setSnackMessage] = useState<string | undefined>(
    undefined,
  );
  const [snackSeverity, setSnackSeverity] = useState<SnackSeverity>('info');

  // redirect to home page if already logged in

  if (context.user) router.push('/');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setPasswordConfirm(event.target.value);

    if (password != event.target.value)
      setConfirmPasswordError('Passwords does not match');
    else setConfirmPasswordError('');
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (event.target.value.length < 8)
      setPasswordError('Password must be at least 8 characters long');
    else setPasswordError('');

    if (passwordConfirm.length > 0 && event.target.value != passwordConfirm)
      setConfirmPasswordError('Passwords does not match');
    else setConfirmPasswordError('');
  };

  const handleMailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);

    if (validateEmail(event.target.value)) setMailError('');
    else setMailError('Invalid email');
  };

  const handleTosChange = (_event: React.SyntheticEvent, checked: boolean) => {
    setTos(checked);
  };
  const handleThirteenChange = (
    _event: React.SyntheticEvent,
    checked: boolean,
  ) => {
    setThirteen(checked);
  };

  const handleRegister = (event: SyntheticEvent<any>) => {
    event.preventDefault();
    if (
      usernameError.length > 0 ||
      passwordError.length > 0 ||
      confirmPasswordError.length > 0 ||
      mailError.length > 0
    ) {
      setSnackMessage('There is at least one error in the form');
      setSnackSeverity('error');
      return;
    }

    if (!tos) {
      setSnackMessage('You must accept the terms and conditions');
      setSnackSeverity('error');
      return;
    }
    if (!thirteen) {
      setSnackMessage('You must be 13 years old or older');
      setSnackSeverity('error');
      return;
    }

    if (email.length < 4) {
      setMailError('Please enter a valid email');
      setSnackSeverity('error');
      setSnackMessage('Please enter a valid email');
      return;
    }

    if (password.length < 1 || passwordConfirm.length < 1) {
      setSnackSeverity('error');
      setSnackMessage('please fill in all fields');

      if (password.length < 1) setPasswordError('Please fill this field');
      if (passwordConfirm.length < 1)
        setConfirmPasswordError('Please fill this field');
      return;
    }

    if (username.length < 3) {
      setUsernameError('Username must be at least 3 characters long');
      setSnackMessage('Username must be at least 3 characters long');
      setSnackSeverity('error');
      return;
    }

    RegisterUserFetch(username, password, email)
      .then((res) => {
        if (res.status === 201) {
          setSnackMessage('Registration successful, an email has been sent');
          setSnackSeverity('success');
        } else {
          setSnackMessage(
            `Registration failed : ${
              (res.json as { message: string }).message
            }`,
          );
          setSnackSeverity('error');
        }
      })
      .catch((err) => {
        setSnackSeverity('error');
        if (err.message) setSnackMessage(`${err.message}`);
        else setSnackMessage('There was an error contacting the server');
      });
  };

  return (
    <>
      <GenericSnackBar
        message={snackMessage}
        setMessage={setSnackMessage}
        severity={snackSeverity}
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
        >
          <Stack spacing={2}>
            <Typography variant="h5">Create an account </Typography>
            <TextField
              required
              label="Username"
              value={username}
              onChange={handleUsernameChange}
              helperText={usernameError}
              error={usernameError.length > 0}
            />
            <TextField
              required
              label="Password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              helperText={passwordError}
              error={passwordError.length > 0}
            />
            <TextField
              required
              label="Confirm Password"
              value={passwordConfirm}
              onChange={handleConfirmPasswordChange}
              type="password"
              helperText={confirmPasswordError}
              error={confirmPasswordError.length > 0}
            />
            <TextField
              required
              label="Email"
              value={email}
              onChange={handleMailChange}
              type="email"
              helperText={mailError}
              error={mailError.length > 0}
            />
            <Box>
              <FormControlLabel
                control={<Checkbox />}
                onChange={handleThirteenChange}
                label="I’m 13 years old or older"
              />
              <FormControlLabel
                control={<Checkbox />}
                onChange={handleTosChange}
                label={
                  <span>
                    I agree to the{' '}
                    <Link href="/tos" passHref>
                      <MuiLink> Terms of Service </MuiLink>
                    </Link>
                  </span>
                }
              />
            </Box>

            <Button type="submit" variant="contained" onClick={handleRegister}>
              Register
            </Button>
            <Typography>
              Already have an account ?{' '}
              <Link href="/login" passHref>
                <Typography component="a" color="primary">
                  Log in here
                </Typography>
              </Link>
            </Typography>
          </Stack>
        </Box>
      </Paper>
    </>
  );
};

export default Register;
