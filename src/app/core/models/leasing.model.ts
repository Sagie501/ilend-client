import { User } from './user.model';
import { Product } from './product.model';
import { LeasingStatusFromServer } from 'src/app/shared/helpers/order-status.helper';

export type Leasing = {
  id: string;
  transactionId: string;
  lessee: User;
  product: Product;
  status: LeasingStatusFromServer;
  creationDate: Date;
  startDate: Date;
  endDate: Date;
  total_price: number;
};
