import React from 'react';
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Navigation from '../Navigation/Navigation';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#484848',
      main: '#212121',
      dark : '#000000',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark : '#ba000d',
      contrastText: '#fff',
    },
  },
  typography: {
    useNextVariants: true,
  },
});

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
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <Navigation />
    </MuiThemeProvider>
  </ApolloProvider>
);

export default App;
