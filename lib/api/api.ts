const defaultServer =
    process.env.NODE_ENV === "production"
        ? "https://polycode-api.juno.nponsard.net"
        : "http://localhost:8080";

// Start fetching the api url
const urlfetch = fetch("/api/url")
    .then((response) => {
        return response.json();
    })
    .catch((e) => {
        console.log(e);
        return { apiURL: undefined };
    });

// store the api url in the global state like a cache
let apiURL: string | undefined;

// get the api url from the global state or fetch it
export async function fetchBaseUrl() {
    if (apiURL) return apiURL;

    const data = await urlfetch;
    apiURL = (data.apiURL ?? defaultServer) + "/api/v1";
    return apiURL;
}


// Fetch the backend api 
export async function fetchApi<T>(
    ressource: string,
    options?: RequestInit
): Promise<T> {
    const baseUrl = await fetchBaseUrl();
    const response = await fetch(baseUrl + ressource, options);
    return response.json();
}
