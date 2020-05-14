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

export const addUserMutation = gql`
  mutation addUser($user: UserInput!) {
    addUser(user: $user) {
      ...UserFragment
    }
  }
  ${userFragment}
`;

export const updateUserMutation = gql`
  mutation updateUser($userId: ID!, $user: UserInput!) {
    updateUser(userId: $userId, user: $user) {
      ...UserFragment
    }
  }
  ${userFragment}
`;
