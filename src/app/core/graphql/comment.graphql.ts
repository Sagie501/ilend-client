import gql from 'graphql-tag';

export const commentFragment = gql`
  fragment CommentFragment on Comment {
    id
    comment
    date
    user {
      id
    }
    product {
      id
    }
  }
`;
