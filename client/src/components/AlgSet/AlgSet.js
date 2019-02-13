import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';

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
          <Typography variant="h5" gutterBottom>{algSet.name}</Typography>
          <Grid container spacing={8}>
            {algSet.algs.map(alg => (
              <Grid item key={alg} xs={12} md={6} lg={3}>
                <Card>
                  <CardMedia
                    component="img"
                    image={`http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&bg=t&pzl=3&alg=${alg}&sch=wrgyob&r=y34x-34`}
                    height={150}
                  />
                  <CardContent>
                    <Typography variant="body1" style={{ textAlign: 'center' }}>
                      {alg}
                    </Typography>
                  </CardContent>
                  <CardActions disableActionSpacing={true}>
                    <IconButton>
                      <Icon>edit</Icon>
                    </IconButton>
                    <IconButton>
                      <Icon>delete</Icon>
                    </IconButton>
                    <IconButton>
                      <Icon>content_copy</Icon>
                    </IconButton>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Fragment>
      );
    }}
  </Query>
);

export default AlgSet;
