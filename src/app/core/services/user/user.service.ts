import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Gender } from '../../../shared/enums/gender.enum';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {
  }

  cities = ['Rehovot', 'Netanya', 'Pardesiya'];

  getFakeUser(): User {
    return {
      id: '1',
      firstName: 'Niv',
      lastName: 'Hindi',
      birthDate: new Date(Date.UTC(1997, 1, 14)),
      email: 'nivhindi1@gmail.com',
      gender: Gender.MALE,
      country: 'Israel',
      city: this.cities[Math.floor(Math.random() * 3)],
      street: 'dont know',
      phoneNumber: '12345678932',
      zipCode: '12346',
    };
  }

  mapUserForClient(user): User {
    return {
      ...user,
      birthDate: new Date(user.birthDate)
    };
  }
}
