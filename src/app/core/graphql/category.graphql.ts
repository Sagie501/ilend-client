import gql from 'graphql-tag';

export const categoryFragment = gql`
  fragment CategoryFragment on Category {
    id
    name
    description
    pictureLink
  }
`;

export const getCategoriesQuery = gql`
  {
    getCategories {
      ...CategoryFragment
    }
  }
  ${categoryFragment}
`;
