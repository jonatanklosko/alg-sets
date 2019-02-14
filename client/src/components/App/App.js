import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/styles";

import Navigation from '../Navigation/Navigation';
import AlgSetList from '../AlgSetList/AlgSetList';
import AlgSet from '../AlgSet/AlgSet';
import Explore from '../Explore/Explore';

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
  <BrowserRouter>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navigation>
          <Switch>
            <Route exact path="/alg-sets" component={AlgSetList} />
            <Route exact path="/alg-sets/:id" component={AlgSet} />
            <Route path="/explore" component={Explore} />
          </Switch>
        </Navigation>
      </ThemeProvider>
    </ApolloProvider>
  </BrowserRouter>
);

export default App;
