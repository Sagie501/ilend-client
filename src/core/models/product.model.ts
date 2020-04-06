import { Category } from './category.model';
import { User } from './user.model';

export interface Product {
  id: string;
  owner: User;
  name: string;
  description: string;
  imageURI: string;
  requestedPrice: string;
  category: Category;
  rating: number;
  comments: Array<Comment>;
}
