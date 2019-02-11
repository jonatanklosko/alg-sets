import React, { Fragment } from 'react';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

import CssBaseline from '@material-ui/core/CssBaseline';

import Navigation from '../Navigation/Navigation';

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
  credentials: 'include', // 'same-origin' in production
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <CssBaseline />
    <Navigation />
  </ApolloProvider>
);

export default App;
