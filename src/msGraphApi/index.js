import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./config";

const myMSALObj = new PublicClientApplication(msalConfig);

async function getTokenPopup() {
  /**
   * See here for more info on account retrieval:
   * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-common/docs/Accounts.md
   */
  const accounts = myMSALObj.getAllAccounts();

  const request = {
    scopes: ["User.ReadBasic.All"],
    account: accounts[0]
  };

  let accessToken;

  try {
    const result = await myMSALObj.acquireTokenSilent(request);

    accessToken = result.accessToken;
  } catch (error) {
    console.log("silent token acquisition fails. acquiring token using popup");
    const result = await myMSALObj.acquireTokenPopup(request);
    accessToken = result.accessToken;
  }

  return accessToken;
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
    const accessToken = await getTokenPopup();

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
    const accessToken = await getTokenPopup();

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
    const accessToken = await getTokenPopup();

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
    const accessToken = await getTokenPopup();

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
