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
    transactionId
    total_price
  }
  ${userFragment}
  ${productFragment}
`;

export const getAllLeasesByLesseeId = gql`
  query getAllLeasesByLesseeId($lesseeId: ID!) {
    getAllLeasesByLesseeId(lesseeId: $lesseeId) {
      ...LeasingFragment
    }
  }
  ${leasingFragment}
`;

export const getAllOnGoingRequests = gql`
  query getAllOnGoingRequests($lessorId: ID!) {
    getAllOnGoingRequests(lessorId: $lessorId) {
      ...LeasingFragment
    }
  }
  ${leasingFragment}
`;

export const getAllOpenedRequests = gql`
  query getAllOpenedRequests($lessorId: ID!) {
    getAllOpenedRequests(lessorId: $lessorId) {
      ...LeasingFragment
    }
  }
  ${leasingFragment}
`;

export const getAllLeasings = gql`
  {
    getAllLeasings {
      ...LeasingFragment
    }
  }
  ${leasingFragment}
`;

export const setLeaseRequestStatusMutation = gql`
  mutation setLeaseRequestStatus($leasingId: ID!, $status: LeasingStatus) {
    setLeaseRequestStatus(leasingId: $leasingId, status: $status) {
      ...LeasingFragment
    }
  }
  ${leasingFragment}
`;

export const openLeaseRequest = gql`
  mutation openLeaseRequest(
    $leasing: LeasingInput!
    $cardNonce: String!
    $price: Float!
  ) {
    openLeaseRequest(leasing: $leasing, cardNonce: $cardNonce, price: $price) {
      ...LeasingFragment
    }
  }
  ${leasingFragment}
`;
