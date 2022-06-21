import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  concat,
} from "@apollo/client";
import { useKeycloak } from "@react-keycloak/web";

export default function ApolloAuthProvider({ children }) {
  const { initialized, keycloak } = useKeycloak();
  const httpLink = new HttpLink({
    uri: process.env.REACT_APP_API_URL,
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const bearerToken = keycloak.authenticated ? keycloak.token : "";

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${bearerToken}` || null,
      },
    }));

    return forward(operation);
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: concat(authMiddleware, httpLink),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
