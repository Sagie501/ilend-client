import gql from 'graphql-tag';

export const userFragment = gql`
  fragment UserFragment on User {
    id
    firstName
    lastName
    gender
    birthDate
    email
    phoneNumber
    country
    city
    street
    zipCode
    isAdmin
  }
`;

export const loginQuery = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserFragment
    }
  }
  ${userFragment}
`;

export const addToWishlistMutation = gql`
  mutation addToWishList($userId: ID!, $productId: ID!) {
    addToWishList(userId: $userId, productId: $productId) {
      ...UserFragment
    }
  }
  ${userFragment}
`;
