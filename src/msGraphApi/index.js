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
    account: accounts[0],
  };

  let accessToken;

  try {
    const result = await myMSALObj.acquireTokenSilent(request);

    accessToken = result.accessToken;
  } catch (error) {
    console.log("silent token acquisition fails. acquiring token using popup");
    // if (error instanceof InteractionRequiredAuthError) {
    // fallback to interaction when silent call fails
    const result = myMSALObj.acquireTokenPopup(request);
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
    headers: headers,
  };

  return fetch(endpoint, options)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

export async function getUsers(email) {
  const url = `https://graph.microsoft.com/v1.0/users?$filter=startswith(mail,'${email}')&$orderby=userPrincipalName&$count=true&$top=25`;

  let response;

  try {
    const accessToken = await getTokenPopup();

    if (!accessToken) {
      return [];
    }

    response = await callMsGraph(url, accessToken);
  } catch (error) {
    console.error(error);
  }

  return response.value;
}
