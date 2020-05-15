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

export const getProductsByUserIdQuery = gql`
  query getProductsByUserId($userId: ID!) {
    getProductsByUserId(userId: $userId) {
      ...ProductFragment
    }
  }
  ${productFragment}
`;

export const getUserWishlistQuery = gql`
  query getUserWishList($userId: ID!) {
    getUserWishList(userId: $userId) {
      ...ProductFragment
    }
  }
  ${productFragment}
`;

export const addToWishlistMutation = gql`
  mutation addToWishList($userId: ID!, $productId: ID!) {
    addToWishList(userId: $userId, productId: $productId) {
      wishList {
        ...ProductFragment
      }
    }
  }
  ${productFragment}
`;

export const removeFromWishlistMutation = gql`
  mutation removeFromWishList($userId: ID!, $productId: ID!) {
    removeFromWishList(userId: $userId, productId: $productId) {
      wishList {
        ...ProductFragment
      }
    }
  }
  ${productFragment}
`;
