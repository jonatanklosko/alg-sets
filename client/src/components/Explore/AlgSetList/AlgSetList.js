import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import AlgSetCard, { ALG_SET_CARD_DATA_FRAGMENT } from '../AlgSetCard/AlgSetCard';

const ALG_SETS_QUERY = gql`
  query {
    me {
      id
    }
    algSets {
      ...algSetCardData
    }
  }
  ${ALG_SET_CARD_DATA_FRAGMENT}
`;

const AlgSetList = () => (
  <Query query={ALG_SETS_QUERY}>
    {({ error, loading, data }) => {
      if (error) return <div>Error</div>
      if (loading) return <LinearProgress />
      const { algSets, me } = data;

      return (
        <Grid container spacing={8}>
          {algSets.map(algSet => (
            <Grid item key={algSet.id} xs={12} md={6} lg={4}>
              <AlgSetCard algSet={algSet} currentUserId={me && me.id} />
            </Grid>
          ))}
        </Grid>
      );
    }}
  </Query>
);

export default AlgSetList;
