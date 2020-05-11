import gql from 'graphql-tag';
import { userFragment } from './user.graphql';
import { productFragment } from './product.graphql';

export const leasingFragment = gql`
  fragment LeasingFragment on Leasing {
    id
    lessee {
      ...UserFragment
    }
    product {
      ...ProductFragment
    }
    status
    startDate
    endDate
  }
  ${userFragment}
  ${productFragment}
`;

export const getAllLeasingRequestsQuery = gql`
  query getAllLeasingRequests($lessorId: ID!) {
    getAllLeasingRequests(lessorId: $lessorId) {
      ...LeasingFragment
    }
  }
  ${leasingFragment}
`;
