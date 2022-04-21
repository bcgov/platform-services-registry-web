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
  console.log("CALLED");
  const { initialized, keycloak } = useKeycloak();
  console.log(initialized);
  const httpLink = new HttpLink({
    uri: "http://localhost:4000/graphql",
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const bearerToken = keycloak.authenticated ? keycloak.token : "";

    // add the authorization to the headers
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
