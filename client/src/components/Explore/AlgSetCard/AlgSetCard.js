import React from 'react';
import { Mutation } from 'react-apollo';
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

import { STARRED_ALG_SETS_QUERY } from '../../StarredAlgSetList/StarredAlgSetList';

export const ALG_SET_CARD_DATA_FRAGMENT = gql`
  fragment algSetCardData on AlgSet {
    id
    name
    algs
    creator {
      name
      avatar {
        thumbUrl
      }
    }
    stargazers {
      id
    }
  }
`;

const STAR_ALG_SET_MUTATION = gql`
  mutation StarAlgSet($id: ID!) {
    starAlgSet(id: $id) {
      ...algSetCardData
    }
  }
  ${ALG_SET_CARD_DATA_FRAGMENT}
`;

const UNSTAR_ALG_SET_MUTATION = gql`
  mutation UnstarAlgSet($id: ID!) {
    unstarAlgSet(id: $id) {
      id
      stargazers {
        id
      }
    }
  }
`;

const AlgSetCard = ({ algSet, currentUserId }) => {
  const starredByCurrentUser = algSet.stargazers.some(({ id }) => id === currentUserId);
  return (
    <Card>
      <CardActionArea component={Link} to={`/alg-sets/${algSet.id}`}>
        <CardHeader
          avatar={
            <Avatar src={algSet.creator.avatar.thumbUrl} />
          }
          title={algSet.name}
          subheader={
            <Grid container direction="column">
              <Grid item>Created by {algSet.creator.name}</Grid>
              <Grid item>Algs: {algSet.algs.length}</Grid>
            </Grid>
          }
        />
      </CardActionArea>
      <CardActions>
        <Mutation
          mutation={starredByCurrentUser ? UNSTAR_ALG_SET_MUTATION : STAR_ALG_SET_MUTATION}
          variables={{ id: algSet.id }}
          update={(store, { data: { starAlgSet, unstarAlgSet } }) => {
            try {
              const queryData = store.readQuery({ query: STARRED_ALG_SETS_QUERY });
              queryData.me.starredAlgSets = starredByCurrentUser
                ? queryData.me.starredAlgSets.filter(({ id }) => id !== unstarAlgSet.id)
                : queryData.me.starredAlgSets.concat(starAlgSet);
              store.writeQuery({ query: STARRED_ALG_SETS_QUERY, data: queryData })
            } catch(error) {}
          }}
        >
          {(toggleStar, { error, loading }) => (
            <IconButton disabled={!currentUserId || loading} onClick={toggleStar}>
              <Badge badgeContent={algSet.stargazers.length} color="primary" showZero>
                <Icon color={starredByCurrentUser ? 'secondary' : 'primary'}>star</Icon>
              </Badge>
            </IconButton>
          )}
        </Mutation>
      </CardActions>
    </Card>
  );
}

export default AlgSetCard;
