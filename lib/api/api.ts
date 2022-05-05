import { SetTokens } from '../loginContext';

const apiServer =
  process.env.NODE_ENV === 'production'
    ? process.env.NEXT_PUBLIC_API_URL
    : 'http://localhost:8080/';

// Fetch the backend api
export async function fetchApi<T>(
  ressource: string,
  options?: RequestInit,
): Promise<{ json: T; status: number }> {
  const response = await fetch(apiServer + ressource, options);
  const json = await response.json();
  return {
    json,
    status: response.status,
  };
}

export interface Credentials {
  accessToken: string;
  refreshToken: string;
}

async function refreshTokens(
  credentials: Credentials,
  setTokens: SetTokens,
): Promise<void> {
  const {
    json: { accessToken, refreshToken },
  } = await fetchApi<{
    accessToken: string;
    refreshToken: string;
  }>('/auth/refresh', {
    method: 'POST',
    body: JSON.stringify({
      refreshToken: credentials.refreshToken,
    }),
  });

  setTokens(accessToken, refreshToken);
}

// Fetch the backend api with automatic refresh
export async function fetchApiWithAuth<T>(
  ressource: string,
  credentials: Credentials,
  setTokens: SetTokens,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
  body?: any,
): Promise<{ json: T; status: number }> {
  const response = await fetch(apiServer + ressource, {
    body: body ? JSON.stringify(body) : undefined,
    method,
  });

  if (response.status === 401) {
    await refreshTokens(credentials, setTokens);

    return fetchApiWithAuth(ressource, credentials, setTokens, method, body);
  }

  const json = await response.json();

  return {
    json,
    status: response.status,
  };
}
