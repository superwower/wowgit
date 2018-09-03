import App, { Container } from "next/app";
import React from "react";
import { ApolloProvider } from "react-apollo";

import withApolloClient from "../lib/with-apollo-client";

const MyApp = ({ Component, pageProps, apolloClient }) => {
  return (
    <Container>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
      </ApolloProvider>
    </Container>
  );
};

export default withApolloClient(MyApp);
