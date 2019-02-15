import gql from 'graphql-tag';

export const ALG_SET_CARD_DATA_FRAGMENT = gql`
  fragment algSetCardData on AlgSet {
    id
    name
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
