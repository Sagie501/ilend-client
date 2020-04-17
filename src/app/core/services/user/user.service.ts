import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { Gender } from '../../../shared/enums/gender.enum';
import { ProductsService } from '../products/products.service';
import { Apollo } from 'apollo-angular';
import { loginQuery } from '../../graphql/user.graphql';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private apollo: Apollo, private productsService: ProductsService) {
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
    return this.apollo.watchQuery<any>({
      query: loginQuery,
      variables: {
        email,
        password
      },
      errorPolicy: 'all'
    }).valueChanges.pipe(
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

  mapUserForClient(user): User {
    return {
      ...user,
      birthDate: new Date(user.birthDate),
      products: user.products.map((product) => {
        return this.productsService.mapProductForClient(product);
      }),
      wishList: user.wishList.map((product) => {
        return this.productsService.mapProductForClient(product);
      })
    };
  }
}
