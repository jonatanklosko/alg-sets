import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import LinearProgress from '@material-ui/core/LinearProgress';

const ALG_SETS_QUERY = gql`
  query {
    me {
      algSets {
        id
        name
        algs
      }
    }
  }
`;

const AlgSetList = () => (
  <Query query={ALG_SETS_QUERY}>
    {({ error, loading, data }) => {
      if (error) return <div>Error</div>
      if (loading) return <LinearProgress />
      const { me: { algSets } } = data;

      return (
        <Grid container spacing={8}>
          {algSets.map(({ id, name, algs }) => (
            <Grid item key={id} xs={12} md={6} lg={3}>
              <Card>
                <CardActionArea>
                  <CardHeader
                    title={name}
                    subheader={`Algs: ${algs.length}`}
                  />
                </CardActionArea>
                <CardActions>
                  <Button size="small" color="primary">
                    Edit
                  </Button>
                  <Button size="small" color="secondary">
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
          <Grid item xs={12} md={6} lg={3}>
            <Card style={{ height: '100%', opacity: 0.6 }}>
              <CardActionArea style={{ height: '100%' }}>
                <CardContent style={{ textAlign: 'center' }}>
                  <Icon>add</Icon>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      );
    }}
  </Query>
);

export default AlgSetList;
