import gql from 'graphql-tag';
import { categoryFragment, productFragment, userFragment } from '../fragments.graphql';

export const getProductsQuery = gql`
  {
    getProducts {
      ...ProductFragment
      owner {
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
      category {
        ...CategoryFragment
      }
    }
  }
  ${productFragment}
  ${userFragment}
  ${categoryFragment}
`;
