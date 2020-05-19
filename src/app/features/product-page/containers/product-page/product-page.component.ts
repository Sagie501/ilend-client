import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../../core/services/products/products.service';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { getLoggedInUser, getUserProducts, getUserWishlist, UserState } from '../../../user/reducer/user.reducer';
import { User } from '../../../../core/models/user.model';
import { addProductToWishlist, removeProductFromWishlist } from '../../../user/actions/user.actoins';

@Component({
  selector: 'ile-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less']
})
export class ProductPageComponent implements OnInit, OnDestroy {

  product: Product;
  userWishlist: Array<Product>;
  userProducts: Array<Product>;
  isProductInWishlist: boolean;
  isLoggedInUserProduct: boolean;
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
        this.checkIfProductInWishlist();
        this.checkIfLoggedInUserProduct();
      }),
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }),
      this.userStore.select(getUserWishlist).subscribe((userWishlist) => {
        this.userWishlist = userWishlist;
        this.checkIfProductInWishlist();
      }),
      this.userStore.select(getUserProducts).subscribe((userProducts) => {
        this.userProducts = userProducts;
        this.checkIfLoggedInUserProduct();
      })
    ];
  }

  checkIfProductInWishlist() {
    if (this.product && this.userWishlist) {
      this.isProductInWishlist = !!this.userWishlist.find((product) => product.id === this.product.id);
    } else {
      this.isProductInWishlist = false;
    }
  }

  checkIfLoggedInUserProduct() {
    if (this.product && this.userProducts) {
      this.isLoggedInUserProduct = !!this.userProducts.find((product) => product.id === this.product.id);
    } else {
      this.isLoggedInUserProduct = false;
    }
  }

  addProductToWishlist() {
    this.userStore.dispatch(addProductToWishlist({ userId: this.loggedInUser.id, productId: this.product.id }));
  }

  removeProductFromWishlist() {
    this.userStore.dispatch(removeProductFromWishlist({ userId: this.loggedInUser.id, productId: this.product.id }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
