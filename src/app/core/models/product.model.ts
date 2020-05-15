import { Comment } from './comment.model';
import { User } from './user.model';
import { Category } from './category.model';

export type Product = {
  id: string;
  owner: User;
  name: string;
  description: string;
  pictureLinks: string[];
  requestedPrice: number;
  category: Category;
  rating: number;
  comments: Comment[];
};
