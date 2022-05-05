import { SetTokens } from '../LoginContext';
import { Credentials, fetchApiWithAuth } from './api';
export async function RunCode(
  code: string,
  language: string,
  credentials: Credentials,
  setCredentials: SetTokens,
) {
  return fetchApiWithAuth<{ stdout: string; stderr: string }>(
    '/runner/execute',
    credentials,
    setCredentials,
    'POST',
    {
      code,
      language,
    },
  );
}
