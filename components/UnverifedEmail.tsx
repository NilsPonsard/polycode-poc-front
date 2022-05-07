import { Alert, Button } from '@mui/material';
import { useContext, useState } from 'react';
import { ResendValidationEmailFetch } from '../lib/api/email';
import { LoginContext } from '../lib/LoginContext';

export default function UnverifiedEmail() {
  const context = useContext(LoginContext);

  const [message, setMessage] = useState<string | undefined>(undefined);
  const [sending, setSending] = useState(false);

  if (!context.user) return null;
  if (context.user.emailVerified) return null;

  console.log(context.user);

  const handleSendVerificationEmail = async () => {
    try {
      if (context.credentials) {
        setSending(true);
        await ResendValidationEmailFetch(
          context.credentials,
          context.setTokens,
        );
        setMessage('Email sent !');
      }
    } catch (e) {
      console.log(e);
      setMessage(JSON.stringify(e));
    }
    setSending(false);
  };
  return (
    <Alert severity="warning">
      Email not verified, please click on the link we sent you by email, if it
      doesn’t work,{' '}
      <Button onClick={handleSendVerificationEmail} disabled={sending}>
        Resend an email
      </Button>
      {message && <span>{message}</span>}
    </Alert>
  );
}
