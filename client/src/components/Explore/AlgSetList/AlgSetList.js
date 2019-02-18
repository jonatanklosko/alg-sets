import React, { Fragment, useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import AlgSetCard from '../../AlgSetCard/AlgSetCard';
import { ALG_SET_DATA_FRAGMENT } from '../../../logic/graphql-fragments';

const ALG_SETS_QUERY = gql`
  query AlgSets($filter: String, $offset: Int, $limit: Int) {
    me {
      id
    }
    algSets(filter: $filter, offset: $offset, limit: $limit) {
      edges {
        ...algSetData
      }
      totalCount
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
      <Query
        query={ALG_SETS_QUERY}
        variables={{ filter, offset: 0, limit: 6 }}
        context={filter ? { debounceKey: 'explore-alg-sets' } : {}}
      >
        {({ error, loading, data, fetchMore }) => {
          if (error) return <div>Error</div>;
          if (loading) return <Grid item xs={12}><LinearProgress /></Grid>;
          const { algSets, me } = data;

          return (
            <Fragment>
              <Grid item xs={12}>
                <Typography variant="caption">{algSets.totalCount} alg sets found</Typography>
              </Grid>
              {algSets.edges.map(algSet => (
                <Grid item key={algSet.id} xs={12} md={6} lg={4}>
                  <AlgSetCard algSet={algSet} currentUserId={me && me.id} />
                </Grid>
              ))}
              {algSets.edges.length < algSets.totalCount && (
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  <Button
                    variant="outlined"
                    onClick={() =>
                      fetchMore({
                        variables: { offset: algSets.edges.length },
                        updateQuery: (prev, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prev;
                          return {
                            ...prev,
                            algSets: {
                              ...fetchMoreResult.algSets,
                              edges: [...prev.algSets.edges, ...fetchMoreResult.algSets.edges],
                            },
                          };
                        }
                      })
                    }
                  >
                    Load more
                    <Icon style={{ marginLeft: 8 }}>expand_more</Icon>
                  </Button>
                </Grid>
              )}
            </Fragment>
          );
        }}
      </Query>
    </Grid>
  );
};

export default AlgSetList;
