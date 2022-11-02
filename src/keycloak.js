import Keycloak from 'keycloak-js';
import config from './config'

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = new Keycloak({
  url: config.SSO_URL,
  realm: config.SSO_REALM,
  clientId: config.CLIENT_ID,
});

export default keycloak;
