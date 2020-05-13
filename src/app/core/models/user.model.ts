import { Gender } from '../../shared/enums/gender.enum';

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
};
