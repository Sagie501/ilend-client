import gql from 'graphql-tag';
import { categoryFragment } from './category.graphql';

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
    password
    profilePicture
    favoriteCategories {
      ...CategoryFragment
    }
  }
  ${categoryFragment}
`;

export const getAllUsers = gql`
  {
    getAllUsers {
      ...UserFragment
    }
  }
  ${userFragment}
`;

export const loginQuery = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserFragment
    }
  }
  ${userFragment}
`;

export const addUserMutation = gql`
  mutation addUser($user: UserInput!) {
    addUser(user: $user) {
      ...UserFragment
    }
  }
  ${userFragment}
`;

export const removeUserMutation = gql`
  mutation removeUser($userId: ID!) {
    removeUser(userId: $userId)
  }
`;

export const updateUserMutation = gql`
  mutation updateUser($userId: ID!, $user: UserInput!) {
    updateUser(userId: $userId, user: $user) {
      ...UserFragment
    }
  }
  ${userFragment}
`;

export const addFavoriteCategoriesMutation = gql`
  mutation addFavoriteCategories($userId: ID!, $categoriesIds: [ID]!) {
    addFavoriteCategories(userId: $userId, categoriesIds: $categoriesIds) {
      ...UserFragment
    }
  }
  ${userFragment}
`;

export const removeFavoriteCategoriesMutation = gql`
  mutation removeFavoriteCategories($userId: ID!, $categoriesIds: [ID]!) {
    removeFavoriteCategories(userId: $userId, categoriesIds: $categoriesIds) {
      ...UserFragment
    }
  }
  ${userFragment}
`;
