import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getFakeUser(): User {
    return {
      userID: '1',
      firstName: 'Niv',
      lastName: 'Hindi',
      birthDate: new Date(Date.UTC(1996, 1, 14)),
      email: 'nivhindi1@gmail.com',
      gender: 'male',
      country: 'Israel',
      city: 'Pardesiya',
      street: 'dont know',
      phoneNumber: '12345678932',
      zipCode: '12346',
    };
  }
}
