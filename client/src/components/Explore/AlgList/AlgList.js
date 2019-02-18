import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import LinearProgress from '@material-ui/core/LinearProgress';

import AlgCard from '../../AlgCard/AlgCard';

const RANDOM_ALGS_QUERY = gql`
  query {
    randomAlgs(count: 8)
  }
`;

const AlgList = () => (
  <Query query={RANDOM_ALGS_QUERY} fetchPolicy="no-cache">
    {({ error, loading, data, refetch }) => {
      if (error) return <div>Error</div>
      if (loading) return <LinearProgress />
      const { randomAlgs: algs } = data;

      return (
        <Fragment>
          <Grid container spacing={8}>
            {algs.map((alg, index) => (
              <Grid item key={index} xs={12} md={6} lg={3}>
                <AlgCard alg={alg} isOwner={false} />
              </Grid>
            ))}
          </Grid>
          <div style={{ marginTop: 8, textAlign: 'right' }}>
            <Button onClick={() => refetch()} variant="outlined">
              Reload
              <Icon style={{ marginLeft: 8 }}>refresh</Icon>
            </Button>
          </div>
        </Fragment>
      );
    }}
  </Query>
);

export default AlgList;
