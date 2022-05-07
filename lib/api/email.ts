import { SetTokens } from '../LoginContext';
import { Credentials, fetchApiWithAuth } from './api';

export async function ResendValidationEmailFetch(
  credentials: Credentials,
  setTokens: SetTokens,
) {
  return fetchApiWithAuth<{ message: string }>(
    '/mail/resend',
    credentials,
    setTokens,
    'POST',
  );
}
