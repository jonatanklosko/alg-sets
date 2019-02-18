import React, { useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';

import AlgSetCard from '../../AlgSetCard/AlgSetCard';
import { ALG_SET_DATA_FRAGMENT } from '../../../logic/graphql-fragments';

const ALG_SETS_QUERY = gql`
  query AlgSets($filter: String) {
    me {
      id
    }
    algSets(filter: $filter) {
      ...algSetData
    }
  }
  ${ALG_SET_DATA_FRAGMENT}
`;

const AlgSetList = () => {
  const [filter, setFilter] = useState('');

  return (
    <Grid container spacing={8}>
      <Grid item xs={12} style={{ textAlign: 'center' }}>
        <Paper style={{ padding: '2px 2px 2px 16px', display: 'inline-block' }}>
          <InputBase
            autoFocus
            value={filter}
            placeholder="Search"
            onChange={event => setFilter(event.target.value)}
          />
          <IconButton>
            <Icon>search</Icon>
          </IconButton>
        </Paper>
      </Grid>
      <Query query={ALG_SETS_QUERY} variables={{ filter }} context={filter ? { debounceKey: 'explore-alg-sets' } : {}}>
        {({ error, loading, data }) => {
          if (error) return <div>Error</div>;
          if (loading) return <Grid item xs={12}><LinearProgress /></Grid>;
          const { algSets, me } = data;

          return algSets.map(algSet => (
            <Grid item key={algSet.id} xs={12} md={6} lg={4}>
              <AlgSetCard algSet={algSet} currentUserId={me && me.id} />
            </Grid>
          ));
        }}
      </Query>
    </Grid>
  );
};

export default AlgSetList;
