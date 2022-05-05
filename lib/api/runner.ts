import { SetTokens } from '../LoginContext';
import { Credentials, fetchApiWithAuth } from './api';
export async function RunCode(
  code: string,
  language: string,
  credentials: Credentials,
  setCredentials: SetTokens,
) {
  const result = fetchApiWithAuth<any>(
    '/runner/execute',
    credentials,
    setCredentials,
    'POST',
    {
      code,
      language,
    },
  );

  console.log(result);
}
