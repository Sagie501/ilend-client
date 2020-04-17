import { Comment } from './comment.model';

export type Product = {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  pictureLinks: string[];
  requestedPrice: number;
  categoryId: string;
  rating: number;
  comments: Comment[];
};
