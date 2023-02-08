// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
import {
  PublicClientApplication,
  InteractionRequiredAuthError,
} from "@azure/msal-browser";
import { msalConfig } from "./config";

export const loginRequest = {
  scopes: ["User.ReadBasic.All"],
};

export const msalInstance = new PublicClientApplication(msalConfig);

const accounts = msalInstance.getAllAccounts();

async function fetchGraphUserDelegateToken() {
  const request = {
    scopes: ["User.ReadBasic.All"],
    account: accounts[0],
  };

  let response;

  try {
    response = await msalInstance.acquireTokenSilent(request);
  } catch (err) {
    if (err instanceof InteractionRequiredAuthError) {
      response = await msalInstance
        .acquireTokenPopup(request)
        .catch((error) => {
          console.log(error);
        });
    }
    // throw Error("Error fetching token");
  }

  return response.accessToken;
}

export async function callMsGraph(apiEndPoint) {
  const headers = new Headers();

  try {
    const accessToken = await fetchGraphUserDelegateToken();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);
    headers.append("ConsistencyLevel", "eventual");

    const options = {
      method: "GET",
      headers: headers,
    };

    const response = await fetch(apiEndPoint, options);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    throw Error("Error making MS Graph API call");
    console.log(error)
  }
}

export async function getUserPhoto(bearer, userId) {
  const url = `https://graph.microsoft.com/v1.0/users/${userId}/photo/$value`;
  const headers = new Headers();
  headers.append("ConsistencyLevel", "eventual");
  headers.append("Authorization", bearer);

  const response = await fetch(url, {
    method: "GET",
    headers,
  });
  if (response.ok) {
    return window.URL.createObjectURL(await response.blob());
  }
  return "";
}
