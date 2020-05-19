import { Gender } from '../../shared/enums/gender.enum';
import { Category } from './category.model';

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  gender: Gender;
  birthDate: Date;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  street: string;
  zipCode: string;
  isAdmin: boolean;
  password: string;
  favoriteCategories: Array<Category>;
};
