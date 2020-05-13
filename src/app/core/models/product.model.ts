import { Comment } from './comment.model';
import { User } from './user.model';

export type Product = {
  id: string;
  owner: User;
  name: string;
  description: string;
  pictureLinks: string[];
  requestedPrice: number;
  categoryId: string;
  rating: number;
  comments: Comment[];
};
