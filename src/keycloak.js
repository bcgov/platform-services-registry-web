import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  url: process.env.REACT_APP_SSO_URL,
  realm: process.env.REACT_APP_SSO_REALM,
  clientId: process.env.REACT_APP_SSO_CLIENT_ID,
});

console.log(process.env.REACT_APP_SSO_URL)

export default keycloak;
