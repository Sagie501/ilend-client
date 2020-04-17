import gql from 'graphql-tag';
import { categoryFragment, productFragment, userFragment } from '../fragments.graphql';

export const loginQuery = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ...UserFragment
      favoriteCategories {
          ...CategoryFragment
        }
        products {
          ...ProductFragment
        }
        wishList {
          ...ProductFragment
        }
    }
  }
  ${userFragment}
  ${categoryFragment}
  ${productFragment}
`;
