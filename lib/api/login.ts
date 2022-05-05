import { SetTokens } from '../LoginContext';
import { Credentials, fetchApi } from './api';

export async function LoginFetch(
  username: string,
  password: string,
  setTokens: SetTokens,
) {
  const result = fetchApi<Credentials>('/auth/login', {
    method: 'POST',
    body: JSON.stringify({
      username: 'test',
      password: 'test',
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { json, status } = await result;
  if (status === 200) {
    setTokens(json.accessToken, json.refreshToken);
    return { success: true, message: 'success' };
  }
  return { success: false, message: JSON.stringify(json) };
}
