import { createContext, useState } from 'react';
import { Credentials } from './api/api';
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
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');

  const credentials = {
    accessToken,
    refreshToken,
  };

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
