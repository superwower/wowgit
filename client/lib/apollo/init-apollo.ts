import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import fetch from "isomorphic-unfetch";

import { defaults, resolvers, typedefs as typeDefs } from "../../models";
import isBrowser from "../is-browser";

let apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!isBrowser) {
  (global as any).fetch = fetch;
}

const create = initialState =>
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  new ApolloClient({
    cache: new InMemoryCache().restore(initialState || {}),
    clientState: {
      defaults,
      resolvers,
      typeDefs
    },
    connectToDevTools: isBrowser,
    link: new HttpLink({
      credentials: "same-origin", // Additional fetch() options like `credentials` or `headers
      uri: "http://localhost:3000/graphql" // Server URL (must be absolute)
    }),
    ssrMode: !isBrowser // Disables forceFetch on the server (so queries are only run once)
  });

const initApollo = initialState => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isBrowser) {
    return create(initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState);
  }

  return apolloClient;
};

export default initApollo;
