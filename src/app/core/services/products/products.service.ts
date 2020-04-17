import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { getProductsQuery } from '../../graphql/product/product.graphql';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  products: Product[];

  constructor(private apollo: Apollo, private userService: UserService) {
  }

  getProducts(): Observable<Array<Product>> {
    return this.apollo.watchQuery<any>({
      query: getProductsQuery
    }).valueChanges.pipe<Array<Product>>(
      map(({ data }) => {
        let products = data.getProducts;
        products = products.map((product) => {
          return {
            ...product,
            owner: this.userService.mapUserForClient(product.owner)
          };
        });
        return products as Array<Product>;
      })
    );
  }
}
