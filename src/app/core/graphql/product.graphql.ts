import gql from 'graphql-tag';
import { commentFragment } from './comment.graphql';
import { userFragment } from './user.graphql';
import { categoryFragment } from './category.graphql';

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
      ...CategoryFragment
    }
    comments {
      ...CommentFragment
    }
   }
   ${userFragment}
   ${categoryFragment}
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

export const addProductMutation = gql`
  mutation addProduct($product: ProductInput!) {
    addProduct(product: $product) {
      ...ProductFragment
    }
  }
  ${productFragment}
`;

export const updateProductMutation = gql`
  mutation updateProduct($productId: ID!, $product: ProductInput!) {
    updateProduct(productId: $productId, product: $product) {
      ...ProductFragment
    }
  }
  ${productFragment}
`;

export const deleteProductMutation = gql`
  mutation removeProduct($productId: ID!) {
    removeProduct(productId: $productId)
  }
`;

export const addNewRatingMutation = gql`
  mutation addNewRating($productId: ID!, $rating: Float!) {
    addNewRating(productId: $productId, rating: $rating) {
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

export const getProductPriceSuggestionQuery = gql`
  query getProductPriceSuggestion($productId: ID!) {
    getProductPriceSuggestion(productId: $productId)
  }
`;
