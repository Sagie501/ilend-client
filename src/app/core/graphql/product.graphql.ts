import gql from 'graphql-tag';
import { commentFragment } from './comment.graphql';
import { userFragment } from './user.graphql';

export const productFragment = gql`
  fragment ProductFragment on Product {
    id
    name
    description
    pictureLinks
    requestedPrice
    rating
    owner {
      ...UserFragment
    }
    category {
      id
    }
    comments {
      ...CommentFragment
    }
   }
   ${userFragment}
   ${commentFragment}
`;

export const getProductsQuery = gql`
  {
    getProducts {
      ...ProductFragment
    }
  }
  ${productFragment}
`;

export const getProductByIdQuery = gql`
  query getProductById($productId: ID!) {
    getProductById(productId: $productId) {
      ...ProductFragment
    }
  }
  ${productFragment}
`;
