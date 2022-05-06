import { SetTokens } from '../LoginContext';
import { Credentials, fetchApiWithAuth } from './api';

export function LogoutFetch(credentials: Credentials, setTokens: SetTokens) {
  return fetchApiWithAuth('/auth/logout', credentials, setTokens, 'POST');
}
