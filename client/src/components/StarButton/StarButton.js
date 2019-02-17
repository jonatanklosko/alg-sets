import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Badge from '@material-ui/core/Badge';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';

import { STARRED_ALG_SETS_QUERY } from '../StarredAlgSetList/StarredAlgSetList';
import { ALG_SET_DATA_FRAGMENT } from '../../logic/graphql-fragments';

const STAR_ALG_SET_MUTATION = gql`
  mutation StarAlgSet($id: ID!) {
    starAlgSet(id: $id) {
      ...algSetData
    }
  }
  ${ALG_SET_DATA_FRAGMENT}
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

const StarButton = ({ algSet, currentUserId }) => {
  const starredByCurrentUser = algSet.stargazers.some(({ id }) => id === currentUserId);
  return (
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
  );
}

export default StarButton;
