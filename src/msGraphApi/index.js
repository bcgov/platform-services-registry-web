import {
  PublicClientApplication,
  InteractionRequiredAuthError
} from "@azure/msal-browser";
import { msalConfig } from "./config";

const msalInstance = new PublicClientApplication(msalConfig);

async function getAccessToken() {
  let account;

  try {
    account = msalInstance.getAllAccounts()[0];

    if (!account) {
      const request = {
        scopes: ["User.ReadBasic.All"]
      };

      const response = await msalInstance.loginPopup(request);
      account = response.account;
    }

    const request = {
      scopes: ["User.ReadBasic.All"],
      account: account
    };

    const response = await msalInstance.acquireTokenSilent(request);
    const accessToken = response.accessToken;

    return accessToken;
  } catch (error) {
    try {
      const request = {
        scopes: ["User.ReadBasic.All"]
      };

      const response = await msalInstance.loginPopup(request);
      account = response.account;

      const request2 = {
        scopes: ["User.ReadBasic.All"],
        account: account
      };

      const response2 = await msalInstance.acquireTokenSilent(request2);
      const accessToken = response2.accessToken;

      return accessToken;
    } catch (error) {
      console.error(error);
      throw new Error("Error acquiring access token");
    }
  }
}

export async function callMsGraph(endpoint, accessToken) {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append("Authorization", bearer);
  headers.append("ConsistencyLevel", "eventual");

  const options = {
    method: "GET",
    headers: headers
  };

  return fetch(endpoint, options);
}

export async function getUsers(email) {
  const url = `https://graph.microsoft.com/v1.0/users?$filter=startswith(mail,'${email}')&$orderby=userPrincipalName&$count=true&$top=25`;

  let data;

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return [];
    }

    const response = await callMsGraph(url, accessToken);
    data = await response.json();
  } catch (error) {
    console.error(error);
  }

  return data.value;
}

export async function getUser(email) {
  const url = `https://graph.microsoft.com/v1.0/users/${email}`;

  let user;

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await callMsGraph(url, accessToken);
    user = await response.json();
  } catch (error) {
    console.error(error);
  }

  return user;
}

export async function getUserPhoto(id) {
  const url = `https://graph.microsoft.com/v1.0/users/${id}/photo/$value`;

  let imageUrl;

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await callMsGraph(url, accessToken);

    if (response.ok) {
      const data = await response.blob();

      imageUrl = URL.createObjectURL(data);
    }
  } catch (error) {
    console.error(error);
  }

  return imageUrl;
}

export async function getUserPhotoByEmail(email) {
  const url = `https://graph.microsoft.com/v1.0/users/${email}/photo/$value`;

  let imageUrl;

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      return null;
    }

    const response = await callMsGraph(url, accessToken);

    if (response.ok) {
      const data = await response.blob();

      imageUrl = URL.createObjectURL(data);
    }
  } catch (error) {
    console.error(error);
  }

  return imageUrl;
}
