import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import AlgSetCard from '../Explore/AlgSetCard/AlgSetCard';

export const STARRED_ALG_SETS_QUERY = gql`
  query {
    me {
      id
      starredAlgSets {
        id
        name
        algs
        createdBy {
          name
          avatar {
            thumbUrl
          }
        }
        stargazers {
          id
        }
      }
    }
  }
`;

const AlgSetList = () => (
  <Query query={STARRED_ALG_SETS_QUERY}>
    {({ error, loading, data }) => {
      if (error) return <div>Error</div>
      if (loading) return <LinearProgress />
      const { me: { starredAlgSets, id } } = data;

      return (
        <Grid container spacing={8}>
          {starredAlgSets.map(algSet => (
            <Grid item key={algSet.id} xs={12} md={6} lg={4}>
              <AlgSetCard algSet={algSet} currentUserId={id} />
            </Grid>
          ))}
        </Grid>
      );
    }}
  </Query>
);

export default AlgSetList;
