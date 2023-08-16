// environment variable handling in production build images
// require runtime placement of vars to prevent rebuilding the image
// this application is destined to be run via a caddy file server.
// caddy file server has the https://caddyserver.com/docs/caddyfile/directives/templates
// templates directive to easily handle runtime variables

const config = {
  CLIENT_ID: process.env.REACT_APP_SSO_CLIENT_ID || '{{ env "CLIENT_ID" }}',
  API_BASE_URL: process.env.REACT_APP_API_URL + "/graphql" || '{{ env "API_BASE_URL" }}' + "/graphql",
  SSO_URL: process.env.REACT_APP_SSO_URL || '{{ env "SSO_URL" }}',
  SSO_REALM: process.env.REACT_APP_SSO_REALM || '{{ env "SSO_REALM" }}'
};

export default config;
