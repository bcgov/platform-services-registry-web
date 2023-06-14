import React from "react";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  ApolloLink,
  InMemoryCache,
  from,
  concat
} from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { useKeycloak } from "@react-keycloak/web";
import { onError } from "@apollo/client/link/error";
import config from "./keycloak/config";

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export default function ApolloAuthProvider({ children }) {
  const { initialized, keycloak } = useKeycloak();
  const httpLink = new HttpLink({
    uri: config.API_BASE_URL
  });

  const authMiddleware = new ApolloLink((operation, forward) => {
    const bearerToken = keycloak.authenticated ? keycloak.token : "";

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${bearerToken}` || null
      }
    }));

    return forward(operation);
  });

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          privateCloudProjectsPaginated: {
            keyArgs: ["filter", "search"],
            merge(existing, incoming, { args }) {
              const merged = existing ? existing.projects.slice(0) : [];
              const { page, pageSize } = args;

              const offset = (page - 1) * pageSize;

              if (incoming) {
                if (args) {
                  for (let i = 0; i < incoming.projects.length; ++i) {
                    merged[offset + i] = incoming.projects[i];
                  }
                } else {
                  throw Error("args not defined");
                }
              }

              return { ...incoming, projects: merged };
            }
          },
          userPrivateCloudProjectsPaginated: {
            keyArgs: ["filter", "search", "userId"],
            merge(existing, incoming, { args }) {
              const merged = existing ? existing.projects.slice(0) : [];
              const { page, pageSize } = args;

              const offset = (page - 1) * pageSize;

              if (incoming) {
                if (args) {
                  for (let i = 0; i < incoming.projects.length; ++i) {
                    merged[offset + i] = incoming.projects[i];
                  }
                } else {
                  throw Error("args not defined");
                }
              }

              return { ...incoming, projects: merged };
            }
          },
          publicCloudProjectsPaginated: {
            keyArgs: ["filter", "search", "userId"],
            merge(existing, incoming, { args }) {
              const merged = existing ? existing.projects.slice(0) : [];
              const { page, pageSize } = args;

              const offset = (page - 1) * pageSize;

              if (incoming) {
                if (args) {
                  for (let i = 0; i < incoming.projects.length; ++i) {
                    merged[offset + i] = incoming.projects[i];
                  }
                } else {
                  throw Error("args not defined");
                }
              }

              return { ...incoming, projects: merged };
            }
          },
          userPublicCloudProjects: {
            keyArgs: ["filter", "search", "userId"],
            merge(existing, incoming, { args }) {
              const merged = existing ? existing.projects.slice(0) : [];
              const { page, pageSize } = args;

              const offset = (page - 1) * pageSize;

              if (incoming) {
                if (args) {
                  for (let i = 0; i < incoming.projects.length; ++i) {
                    merged[offset + i] = incoming.projects[i];
                  }
                } else {
                  throw Error("args not defined");
                }
              }

              return { ...incoming, projects: merged };
            }
          }
        }
      }
    }
  });

  const client = new ApolloClient({
    cache,
    connectToDevTools: true,
    link: from([authMiddleware, errorLink, httpLink])
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
