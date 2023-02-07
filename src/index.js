import React from "react";
import ReactDOM from "react-dom/client";
// import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ApolloLinkProvider from "./ApolloLinkProvider";
import { BrowserRouter } from "react-router-dom";
import { ReactKeycloakProvider } from "@react-keycloak/web";
import keycloak from "./keycloak";
import { MsalProvider } from "@azure/msal-react";
import { msalInstance } from "./msGraphApi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReactKeycloakProvider authClient={keycloak}>
    <MsalProvider instance={msalInstance}>
      <ApolloLinkProvider>
        <React.StrictMode>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </React.StrictMode>
      </ApolloLinkProvider>
    </MsalProvider>
  </ReactKeycloakProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
