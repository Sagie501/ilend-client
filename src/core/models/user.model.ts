import { Product } from './product.model';
import { Category } from './category.model';
import { GenderEnum } from '../enums/gender.enum';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  gender: GenderEnum;
  birthDate: Date;
  email: string;
  phoneNumber: string;
  country: string; // Maybe enum
  city: string; // Maybe enum
  street: string; // Maybe enum
  zipCode: number;
  isAdmin: boolean;
  favoriteCategories: Array<Category>;
  products: Array<Product>;
  wishList: Array<Product>;
}
