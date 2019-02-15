import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';

import AlgCard from '../../AlgCard/AlgCard';

const RANDOM_ALGS_QUERY = gql`
  query {
    randomAlgs(count: 8)
  }
`;

const AlgList = () => (
  <Query query={RANDOM_ALGS_QUERY} fetchPolicy="no-cache">
    {({ error, loading, data }) => {
      if (error) return <div>Error</div>
      if (loading) return <LinearProgress />
      const { randomAlgs: algs } = data;

      return (
        <Grid container spacing={8}>
          {algs.map((alg, index) => (
            <Grid item key={index} xs={12} md={6} lg={3}>
              <AlgCard alg={alg} isOwner={false} />
            </Grid>
          ))}
        </Grid>
      );
    }}
  </Query>
);

export default AlgList;
