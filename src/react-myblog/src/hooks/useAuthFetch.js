import { useMsal } from "@azure/msal-react"
import { loginRequest } from "../authConfig"

/** Custom hook that returns fetch action that will include MSAL access token to the request */
export const useAuthFetch = (url, method) => {
    const { instance, accounts } = useMsal()

    //  Function to sends request with access token
    const sendRequestWithToken = (accessToken) => {
        const headers = new Headers();
        const bearerToken = `Bearer ${accessToken}`;

        headers.append("Authorization", bearerToken);

        const options = {
            method: method || "GET",
            headers: headers
        };

        return fetch(url || '/api/posts', options)
    }

    //  Function to get access token first and include it to the request
    const wrapRequestWithToken = async () => {
        const request = {
            ...loginRequest,
            account: accounts[0]
        };

        try {
            // Silently acquires an access token which is then attached to the request
            const response = await instance.acquireTokenSilent(request)
            return sendRequestWithToken(response.accessToken)
        }
        catch {

            //  Use popup to ask user access token
            const response = await instance.acquireTokenPopup(request)
            return sendRequestWithToken(response.accessToken)
        }
    }

    //  Top level action to send request
    const fetchAction = async () => {

        const response = await wrapRequestWithToken()
        const data = await response?.json() || []
        return data
    };

    return fetchAction;
};
