import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../../core/services/products/products.service';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getLoggedInUser, UserState } from '../../../user/reducer/user.reducer';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'ile-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product: Product;
  loggedInUser: User;
  subscriptions: Array<Subscription>;

  constructor(private activatedRoute: ActivatedRoute, private productsService: ProductsService, private userStore: Store<UserState>) {
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.activatedRoute.params.pipe(
        switchMap((params: Params) => {
          return this.productsService.getProductById(params.id);
        })
      ).subscribe((product: Product) => {
        this.product = product;
      }),
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
      })
    ];
  }

  addProductToWishlist() {
    // TODO
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
