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
    deliveryStatus
    creationDate
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

export const getAllOnGoingDeliveriesRequests = gql`
  query getAllOnGoingDeliveriesRequests($lesseeId: ID!) {
    getAllOnGoingDeliveriesRequests(lesseeId: $lesseeId) {
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

export const getAllLeasingRequests = gql`
  query getAllLeasingRequests($lessorId: ID!) {
    getAllLeasingRequests(lessorId: $lessorId) {
      ...LeasingFragment
    }
  }
  ${leasingFragment}
`;

export const setLeaseRequestStatusMutation = gql`
  mutation setLeaseRequestStatus($leasingId: ID!, $status: LeasingStatus, $deliveryStatus: DeliveryStatus) {
    setLeaseRequestStatus(leasingId: $leasingId, status: $status, deliveryStatus: $deliveryStatus) {
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
