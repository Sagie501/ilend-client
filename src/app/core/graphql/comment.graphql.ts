import gql from 'graphql-tag';
import { userFragment } from './user.graphql';

export const commentFragment = gql`
  fragment CommentFragment on Comment {
    id
    comment
    date
    user {
      ...UserFragment
    }
    product {
      id
    }
  }
  ${userFragment}
`;

export const addCommentMutation = gql`
  mutation addComment($userId: ID!, $productId: ID!, $comment: String!) {
    addComment(userId: $userId, productId: $productId, comment: $comment) {
      ...CommentFragment
    }
  }
  ${commentFragment}
`;
