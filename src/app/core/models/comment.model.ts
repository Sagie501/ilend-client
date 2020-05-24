import { User } from './user.model';

export interface Comment {
  id: string;
  user: User;
  productId: string;
  comment: string;
  date: Date;
}
