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
    } else if (user) setUser(null);
  }, [credentials, user]);

  const setTokens = (accessToken: string, refreshToken: string) => {
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
