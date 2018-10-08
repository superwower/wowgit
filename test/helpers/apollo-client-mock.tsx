import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { SchemaLink } from "apollo-link-schema";
import { withClientState } from "apollo-link-state";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import * as path from "path";
import * as React from "react";
import { ApolloProvider } from "react-apollo";

import defaultLocalDefaults, {
  ILocalState
} from "../../client/models/defaults";
import defaultLocalResolvers from "../../client/models/resolvers";
import defaultLocalTypeDefs from "../../client/models/typedefs";
import defaultServerResolvers from "../../server/interfaces/resolvers";

interface IMockApolloConfig {
  serverResolvers?: any;
  serverSchemaPath?: string;
  localResolvers?: any;
  localDefaults?: ILocalState;
  localTypeDefs?: string;
}

const defaultConfig: IMockApolloConfig = {
  localDefaults: defaultLocalDefaults,
  localResolvers: defaultLocalResolvers,
  localTypeDefs: defaultLocalTypeDefs,
  serverResolvers: defaultServerResolvers,
  serverSchemaPath: path.join(
    __dirname,
    "..",
    "..",
    "server",
    "interfaces",
    "schema",
    "index.graphql"
  )
};

export const makeMockApolloClient = (
  config: Partial<IMockApolloConfig> = defaultConfig
) => {
  const {
    serverResolvers,
    serverSchemaPath,
    localResolvers,
    localDefaults,
    localTypeDefs
  } = { ...defaultConfig, ...config };

  const cache = new InMemoryCache();
  const typeDefs = importSchema(serverSchemaPath);
  const executableSchema = makeExecutableSchema({
    resolvers: serverResolvers,
    typeDefs
  });

  const client = new ApolloClient<NormalizedCacheObject>({
    cache,
    link: ApolloLink.from([
      withClientState({
        cache,
        defaults: localDefaults,
        resolvers: localResolvers,
        typeDefs: localTypeDefs
      }),
      new SchemaLink({ schema: executableSchema })
    ])
  });
  return client;
};

export const withMockApolloProvider = client => Component => () => (
  <ApolloProvider client={client}>
    <Component />
  </ApolloProvider>
);
