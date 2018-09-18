import { ApolloClient, InMemoryCache } from "apollo-boost";
import Head from "next/head";
import * as React from "react";
import { ApolloConsumer, getDataFromTree } from "react-apollo";

import isBrowser from "../is-browser";
import initApollo from "./init-apollo";

export const withApolloConsumer = Component => props => (
  <ApolloConsumer>
    {client => <Component {...props} client={client} />}
  </ApolloConsumer>
);

export const withApolloClient = App => {
  return class Apollo extends React.Component {
    public static displayName = "withApollo(App)";
    public static async getInitialProps(ctx) {
      const { Component, router } = ctx;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx);
      }

      const apolloState: any = {};

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo({});
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            router={router}
            apolloState={apolloState}
            apolloClient={apollo}
          />
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        // console.error("Error while running `getDataFromTree`", error);
      }

      if (!isBrowser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      apolloState.data = apollo.cache.extract();

      return {
        ...appProps,
        apolloState
      };
    }

    public apolloClient: ApolloClient<InMemoryCache>;

    constructor(props) {
      super(props);
      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient =
        props.apolloClient || initApollo(props.apolloState.data);
    }

    public render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
};
