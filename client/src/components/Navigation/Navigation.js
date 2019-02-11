import React from 'react';
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const USER_QUERY = gql`
  query {
    me {
      name
      avatar {
        url
      }
    }
  }
`;

const Navigation = () => (
  <Query query={USER_QUERY}>
    {({ error, loading, data }) => {
      if (error) return <div>Error fetching data</div>;
      if (loading) return <div>Fetching data</div>;
      const { me } = data;
      return (
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit">
              <Icon>menu</Icon>
            </IconButton>
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              News
            </Typography>
            {me ? (
              <Button href="/oauth/sign-out" color="inherit">Sign out</Button>
            ) : (
              <Button href="/oauth/sign-in" color="inherit">Sign in</Button>
            )}
          </Toolbar>
        </AppBar>
      );
    }}
  </Query>
);

export default Navigation;
