import gql from 'graphql-tag';
import { commentFragment } from './comment.graphql';

export const productFragment = gql`
  fragment ProductFragment on Product {
    id
    name
    description
    pictureLinks
    requestedPrice
    rating
    owner {
      id
    }
    category {
      id
    }
    comments {
      ...CommentFragment
    }
   }
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
