import { fetchJSONApi } from './api';

export async function RegisterUserFetch(
  username: string,
  password: string,
  email: string,
) {
  return fetchJSONApi('/users', 'POST', {
    username,
    password,
    email,
  });
}
