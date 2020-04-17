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

export const productFragment = gql`
  fragment ProductFragment on Product {
    id
    name
    description
    imageURI
    requestedPrice
    rating
   }
`;

export const categoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    name
    description
    imageURI
  }
`;
