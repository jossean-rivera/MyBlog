export const msalConfig = {
    auth: {
        clientId: process.env.REACT_APP_CLIENT_ID,
        authority: `https://login.microsoftonline.com/${process.env.REACT_APP_TENANT_ID}`,
        redirectUri: process.env.REACT_APP_REDIRECT_URL,
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    }
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: [
        `api://${process.env.REACT_APP_CLIENT_ID}/Posts.ReadWrite`, 
        `api://${process.env.REACT_APP_CLIENT_ID}/Default.Read`
    ],
};
