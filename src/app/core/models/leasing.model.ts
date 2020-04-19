import { User } from './user.model';
import { Product } from './product.model';
import { LeasingStatusFromServer } from 'src/app/shared/helpers/order-status.helper';

export type Leasing = {
  id: string;
  transactionId: string;
  lessor: User; // TODO: Maybe should be taken from the product owner
  lessee: User;
  product: Product;
  status: LeasingStatusFromServer;
  startDate: Date;
  endDate: Date;
};
