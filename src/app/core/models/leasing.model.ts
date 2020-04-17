import { User } from './user.model';
import { Product } from './product.model';
import { LeasingStatusFromServer } from 'src/app/shared/components/order-status/order-status.component';

export type Leasing = {
  leasingID: string;
  transactionID: string;
  lessor: User;
  lessee: User;
  product: Product;
  status: LeasingStatusFromServer;
  startDate: Date;
  endDate: Date;
};
