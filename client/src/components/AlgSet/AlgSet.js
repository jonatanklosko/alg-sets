import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import CopyToClipboard from 'react-copy-to-clipboard';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

import AlgCard from '../AlgCard/AlgCard';

const ALG_SET_QUERY = gql`
  query AlgSet($id: ID!) {
    algSet(id: $id) {
      id
      name
      algs
    }
  }
`;

const AlgSet = ({ match }) => (
  <Query query={ALG_SET_QUERY} variables={{ id: match.params.id }}>
    {({ error, loading, data }) => {
      if (error) return <div>Error</div>;
      if (loading) return <LinearProgress />;
      const { algSet } = data;

      return (
        <Fragment>
          <Grid container alignItems="center">
            <Grid item style={{ flexGrow: 1 }}>
              <Typography variant="h5">{algSet.name}</Typography>
            </Grid>
            <Grid item>
              <IconButton>
                <Icon>add</Icon>
              </IconButton>
              <CopyToClipboard text={window.location}>
                <IconButton>
                  <Icon>link</Icon>
                </IconButton>
              </CopyToClipboard>
            </Grid>
          </Grid>
          <Grid container spacing={8}>
            {algSet.algs.map(alg => (
              <Grid item key={alg} xs={12} md={6} lg={3}>
                <AlgCard alg={alg} />
              </Grid>
            ))}
          </Grid>
        </Fragment>
      );
    }}
  </Query>
);

export default AlgSet;
