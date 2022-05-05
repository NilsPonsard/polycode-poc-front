import { createContext, useEffect, useMemo, useState } from 'react';
import { Credentials, fetchApiWithAuth } from './api/api';
import { User } from './api/user';

interface LoginContextInterface {
  user: User | undefined | null;
  credentials: Credentials | undefined;
  setTokens: SetTokens;
  setUser: SetUser;
}

export type SetTokens = (accessToken: string, refreshToken: string) => void;
export type SetUser = (user: User | undefined | null) => void;

export function useLoginContext(): LoginContextInterface {
  const [user, setUser] = useState<User | undefined | null>(null);
  const [accessToken, setAccessToken] = useState<string | undefined>(undefined);
  const [refreshToken, setRefreshToken] = useState<string | undefined>(
    undefined,
  );

  const credentials = useMemo(() => {
    return accessToken && refreshToken
      ? {
          accessToken,
          refreshToken,
        }
      : undefined;
  }, [accessToken, refreshToken]);

  useEffect(() => {
    if (credentials) {
      fetchApiWithAuth<User>('/users/me', credentials, setTokens)
        .then(({ json }) => {
          setUser(json);
        })
        .catch((err) => {
          console.log(err);
          setUser(null);
        });
    } else setUser(null);
  }, [credentials]);

  // Read the local storage at start

  useEffect(() => {
    const creds = readLocalStorage();

    if (creds) {
      setAccessToken(creds.accessToken);
      setRefreshToken(creds.refreshToken);
    }
  }, []);

  const setTokens = (accessToken: string, refreshToken: string) => {
    writeLocalStorage({ accessToken, refreshToken });
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  };

  return { user, credentials, setTokens, setUser };
}

export const LoginContext = createContext<LoginContextInterface>({
  user: undefined,
  credentials: undefined,
  setTokens: () => {},
  setUser: () => {},
});

function readLocalStorage(): Credentials | undefined {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');

  return accessToken && refreshToken
    ? { accessToken, refreshToken }
    : undefined;
}

function writeLocalStorage(credentials: Credentials) {
  localStorage.setItem('accessToken', credentials.accessToken);
  localStorage.setItem('refreshToken', credentials.refreshToken);
}
