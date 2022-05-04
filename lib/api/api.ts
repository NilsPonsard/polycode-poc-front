const apiServer =
    process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_API_URL
        : "http://localhost:8080/";

// Fetch the backend api
export async function fetchApi<T>(
    ressource: string,
    options?: RequestInit
): Promise<T> {
    const response = await fetch(apiServer + ressource, options);
    return response.json();
}

export interface Credentials {
    accessToken: string;
    refreshToken: string;
    updateTokens: (accessToken: string, refreshToken: string) => void;
}

async function refreshTokens(credentials: Credentials): Promise<void> {
    const { accessToken, refreshToken } = await fetchApi<{
        accessToken: string;
        refreshToken: string;
    }>("/auth/refresh", {
        method: "POST",
        body: JSON.stringify({
            refreshToken: credentials.refreshToken,
        }),
    });

    credentials.updateTokens(accessToken, refreshToken);
}

// Fetch the backend api with automatic refresh
export async function fetchApiWithAuth<T>(
    ressource: string,
    credentials: Credentials,
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any
): Promise<T> {
    const response = await fetch(apiServer + ressource, {
        body: body ? JSON.stringify(body) : undefined,
        method,
    });

    if (response.status === 401) {
        await refreshTokens(credentials);

        return fetchApiWithAuth(ressource, credentials, method, body);
    }

    return response.json();
}
