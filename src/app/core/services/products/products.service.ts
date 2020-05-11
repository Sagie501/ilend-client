import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import { getProductByIdQuery, getProductsQuery } from '../../graphql/product.graphql';
import { CommentsService } from '../comments/comments.service';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  constructor(private apollo: Apollo, private commentsService: CommentsService, private userService: UserService) {
  }

  getProducts(): Observable<Array<Product>> {
    return this.apollo.watchQuery<any>({
      query: getProductsQuery
    }).valueChanges.pipe<Array<Product>>(
      map(({ data }) => {
        let products = data.getProducts;
        products = products.map((product) => {
          return this.mapProductForClient(product);
        });
        return products as Array<Product>;
      })
    );
  }

  getProductById(id: string): Observable<Product> {
    return this.apollo.watchQuery<any>({
      query: getProductByIdQuery,
      variables: {
        productId: id
      }
    }).valueChanges.pipe<Product>(
      map(({ data }) => {
        return this.mapProductForClient(data.getProductById);
      })
    );
  }

  mapProductForClient(serverProduct): Product {
    let clientProduct = {
      ...serverProduct,
      owner: this.userService.mapUserForClient(serverProduct.owner),
      categoryId: serverProduct.category.id,
      pictureLinks: JSON.parse(serverProduct.pictureLinks),
      comments: serverProduct.comments.map(this.commentsService.mapCommentForClient)
    };
    delete clientProduct.category;
    return clientProduct;
  }
}
