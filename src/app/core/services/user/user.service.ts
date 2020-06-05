import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Gender } from '../../../shared/enums/gender.enum';
import { Apollo } from 'apollo-angular';
import {
  addFavoriteCategoriesMutation,
  addUserMutation,
  loginQuery,
  removeFavoriteCategoriesMutation,
  updateUserMutation,
} from '../../graphql/user.graphql';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

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
    return this.apollo
      .query<any>({
        query: loginQuery,
        variables: {
          email,
          password,
        },
        errorPolicy: 'all',
      })
      .pipe(
        map(({ data, errors }) => {
          if (errors) {
            throw errors[0].message;
          } else {
            return this.mapUserForClient(data.login);
          }
        })
      );
  }

  createNewUser(user: any): Observable<User> {
    return this.apollo
      .mutate<any>({
        mutation: addUserMutation,
        variables: {
          user: {
            ...user,
            birthDate: user.birthDate.getTime(),
          },
        },
        errorPolicy: 'all',
      })
      .pipe(
        map(({ data, errors }) => {
          if (errors) {
            throw errors[0].message;
          } else {
            return this.mapUserForClient(data.addUser);
          }
        })
      );
  }

  updateUser(userId: string, partialUser: any): Observable<User> {
    return this.apollo
      .mutate<any>({
        mutation: updateUserMutation,
        variables: {
          userId,
          user: partialUser,
        },
        errorPolicy: 'all',
      })
      .pipe(
        map(({ data, errors }) => {
          if (errors) {
            throw errors[0].message;
          } else {
            return this.mapUserForClient(data.updateUser);
          }
        })
      );
  }

  mapUserForClient(user): User {
    let profilePicture = user.profilePicture
      ? JSON.parse(user.profilePicture)[0]
      : undefined;
    return {
      ...user,
      birthDate: new Date(user.birthDate),
      profilePicture: profilePicture,
    };
  }

  addFavoriteCategories(
    userId: string,
    categoriesIds: Array<string>
  ): Observable<User> {
    return this.apollo
      .mutate<any>({
        mutation: addFavoriteCategoriesMutation,
        variables: {
          userId,
          categoriesIds,
        },
        errorPolicy: 'all',
      })
      .pipe(
        map(({ data, errors }) => {
          if (errors) {
            throw errors[0].message;
          } else {
            return this.mapUserForClient(data.addFavoriteCategories);
          }
        })
      );
  }

  removeFavoriteCategories(
    userId: string,
    categoriesIds: Array<string>
  ): Observable<User> {
    return this.apollo
      .mutate<any>({
        mutation: removeFavoriteCategoriesMutation,
        variables: {
          userId,
          categoriesIds,
        },
        errorPolicy: 'all',
      })
      .pipe(
        map(({ data, errors }) => {
          if (errors) {
            throw errors[0].message;
          } else {
            return this.mapUserForClient(data.removeFavoriteCategories);
          }
        })
      );
  }
}
