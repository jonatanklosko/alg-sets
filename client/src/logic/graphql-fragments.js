import gql from 'graphql-tag';

export const ALG_SET_DATA_FRAGMENT = gql`
  fragment algSetData on AlgSet {
    id
    name
    stage
    topView
    algs
    owner {
      id
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
