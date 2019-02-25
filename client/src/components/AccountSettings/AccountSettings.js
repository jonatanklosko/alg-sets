import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import LinearProgress from '@material-ui/core/LinearProgress';

import AccountSettingsForm from '../AccountSettingsForm/AccountSettingsForm';

const USER_QUERY = gql`
  query {
    me {
      id
      colorScheme
    }
  }
`;

const AccountSettings = () => (
  <Query query={USER_QUERY}>
    {({ error, loading, data }) => {
      if (error) return <div>Error</div>;
      if (loading) return <LinearProgress />;
      return <AccountSettingsForm me={data.me} />;
    }}
  </Query>
);

export default AccountSettings;
