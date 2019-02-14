import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';

export const ALG_SETS_QUERY = gql`
  query {
    algSets {
      id
      name
      algs
      createdBy {
        name
        avatar {
          thumbUrl
        }
      }
    }
  }
`;

const AlgSetList = () => (
  <Query query={ALG_SETS_QUERY}>
    {({ error, loading, data }) => {
      if (error) return <div>Error</div>
      if (loading) return <LinearProgress />
      const { algSets } = data;

      return (
        <Grid container spacing={8}>
          {algSets.map(algSet => (
            <Grid item key={algSet.id} xs={12} md={6} lg={4}>
              <Card>
                <CardActionArea component={Link} to={`/alg-sets/${algSet.id}`}>
                  <CardHeader
                    avatar={
                      <Avatar src={algSet.createdBy.avatar.thumbUrl} />
                    }
                    title={algSet.name}
                    subheader={
                      <Grid container direction="column">
                        <Grid item>Created by {algSet.createdBy.name}</Grid>
                        <Grid item>Algs: {algSet.algs.length}</Grid>
                      </Grid>
                    }
                  />
                </CardActionArea>
                <CardActions>
                  <IconButton>
                    <Badge badgeContent={3} color="primary">
                      <Icon>star</Icon>
                    </Badge>
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      );
    }}
  </Query>
);

export default AlgSetList;
