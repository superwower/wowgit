import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { SchemaLink } from "apollo-link-schema";
import { importSchema } from "graphql-import";
import { makeExecutableSchema } from "graphql-tools";
import * as path from "path";
import * as React from "react";
import { ApolloProvider } from "react-apollo";

const defaultResolvers = {
  Query: {
    isGitRepository: (obj, { path }) => {}
  }
};

export const makeMockApolloClient = (
  resolvers: any = defaultResolvers,
  schemaPath: string = path.join(
    __dirname,
    "..",
    "..",
    "server",
    "interfaces",
    "schema",
    "index.graphql"
  )
) => {
  const cache = new InMemoryCache();
  const typeDefs = importSchema(schemaPath);
  const executableSchema = makeExecutableSchema({
    typeDefs,
    resolvers
  });

  const link = new SchemaLink({ schema: executableSchema });

  const client = new ApolloClient<NormalizedCacheObject>({
    link,
    cache
  });
  return client;
};

export const withMockApolloProvider = client => Component => () => (
  <ApolloProvider client={client}>
    <Component />
  </ApolloProvider>
);
