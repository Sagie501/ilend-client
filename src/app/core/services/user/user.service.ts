import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Gender } from '../../../shared/enums/gender.enum';
import { Apollo } from 'apollo-angular';
import { addUserMutation, loginQuery } from '../../graphql/user.graphql';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private apollo: Apollo) {
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
    } as User;
  }

  login(email: string, password: string): Observable<User> {
    return this.apollo.query<any>({
      query: loginQuery,
      variables: {
        email,
        password
      },
      errorPolicy: 'all'
    }).pipe(
      map(({ data, errors }) => {
        // TODO: Handle the case that user put wrong details
        if (errors) {
          console.log(errors);
        } else {
          return this.mapUserForClient(data.login);
        }
      })
    );
  }

  createNewUser(user: any): Observable<User> {
    return this.apollo.mutate<any>({
      mutation: addUserMutation,
      variables: {
        user: {
          ...user,
          birthDate: user.birthDate.getTime()
        }
      }
    }).pipe(
      map(({ data, errors }) => {
        return this.mapUserForClient(data.addUser);
      })
    );
  }

  mapUserForClient(user): User {
    return {
      ...user,
      birthDate: new Date(user.birthDate)
    };
  }
}
