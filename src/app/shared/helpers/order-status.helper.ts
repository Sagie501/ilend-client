export enum LeasingStatusFromServer {
  WAITING_FOR_APPROVE = 'WAITING_FOR_APPROVE',
  DENIED = 'DENIED',
  CANCELED = 'CANCELED',
  WAITING_FOR_DELIVERY = 'WAITING_FOR_DELIVERY',
  IN_DELIVERY = 'IN_DELIVERY',
  DELIVERED = 'DELIVERED',
  NEED_TO_RETURN = 'NEED_TO_RETURN',
  RETURNED = 'RETURNED',
}

export enum DeliveryStatusFromServer {
  WAITING_FOR_APPROVE = 'WAITING_FOR_APPROVE',
  UNKNOWN = 'UNKNOWN',
  CANCELED = 'CANCELED',
  DONE = 'DONE',
  IN_TRANSIT = 'IN_TRANSIT',
  ARRIVED_IN_LOCAL_WAREHOUSE = 'ARRIVED_IN_LOCAL_WAREHOUSE',
  DISPATCHING_FROM_LOCAL_WAREHOUSE = 'DISPATCHING_FROM_LOCAL_WAREHOUSE'
}

export enum LeasingStatusClient {
  WAITING_FOR_APPROVE = 'Waiting for Approve',
  DENIED = 'Denied',
  CANCELED = 'Cancelled',
  WAITING_FOR_DELIVERY = 'Waiting for Delivery',
  IN_DELIVERY = 'In Delivery',
  DELIVERED = 'Delivered',
  NEED_TO_RETURN = 'Need to Return',
  RETURNED = 'Returned',
}

export enum LeasingStatusColors {
  WAITING_FOR_APPROVE = '#ffc107',
  DENIED = '#dc3545',
  CANCELED = '#dc3545',
  WAITING_FOR_DELIVERY = '#ffc107',
  IN_DELIVERY = '#17a2b8',
  DELIVERED = '#28a745',
  NEED_TO_RETURN = '#ffc107',
  RETURNED = '#28a745',
}

export const getStatusForClient = (status: string): LeasingStatusClient => {
  let serverStatus: LeasingStatusFromServer = LeasingStatusFromServer[status];

  return LeasingStatusClient[serverStatus];
};

export const getStatusColor = (status: string): LeasingStatusColors => {
  let serverStatus: LeasingStatusFromServer = LeasingStatusFromServer[status];

  return LeasingStatusColors[serverStatus];
};
