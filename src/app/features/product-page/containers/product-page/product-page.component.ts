import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../../core/models/product.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, Subject, interval, timer } from 'rxjs';
import { ProductsService } from '../../../../core/services/products/products.service';
import { switchMap, map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import {
  getLoggedInUser,
  getUserProducts,
  getUserWishlist,
  UserState,
} from '../../../user/reducer/user.reducer';
import { User } from '../../../../core/models/user.model';
import {
  addProductToWishlist,
  removeProductFromWishlist,
} from '../../../user/actions/user.actoins';
import { CommentsService } from '../../../../core/services/comments/comments.service';
import { Comment } from '../../../../core/models/comment.model';

@Component({
  selector: 'ile-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less'],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  userWishlist: Array<Product>;
  userProducts: Array<Product>;
  isProductInWishlist: boolean;
  isLoggedInUserProduct: boolean;
  loggedInUser: User;
  comment: string;
  isRated: boolean = false;
  suggestedPrice: number;
  subscriptions: Array<Subscription>;

  /**
   * Indicates a state where the product is not available.
   * Maybe it was deleted or the user typed bad id in the URL.
   */
  noProduct: boolean;

  productIdLoaded: Subject<string> = new Subject<string>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private userStore: Store<UserState>,
    private commentsService: CommentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.productIdLoaded
        .pipe(
          switchMap((id) =>
            timer(0, 10000).pipe(
              switchMap(() => {
                console.log('here');
                return this.productsService.getProductById(id);
              })
            )
          )
        )
        .subscribe((product: Product) => {
          if (!product) {
            this.noProduct = true;
          } else if (!this.product || this.isChanged(product)) {
            this.product = product;
            this.checkIfProductInWishlist();
            this.checkIfLoggedInUserProduct();
            this.productsService
              .getProductPriceSuggestion(product.id)
              .subscribe((suggestedPrice) => {
                this.suggestedPrice = suggestedPrice;
              });
          }
        }),
      this.activatedRoute.params
        .pipe(
          tap((params: Params) => {
            // return this.productsService.getProductById(params.id);
            this.productIdLoaded.next(params.id);
          })
        )
        .subscribe(),
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
      }),
    ];
  }

  isChanged(newProduct: Product) {
    return (
      newProduct.name !== this.product.name ||
      newProduct.description !== this.product.description ||
      newProduct.requestedPrice !== this.product.requestedPrice ||
      this.areCommentsChanged(newProduct.comments)
    );
  }

  areCommentsChanged(newComments: Comment[]) {
    return (
      newComments.length > this.product.comments.length ||
      newComments.filter((nc) =>
        this.product.comments.find((c) => c.id === nc.id)
      ).length !== newComments.length
    );
  }

  checkIfProductInWishlist() {
    if (this.product && this.userWishlist) {
      this.isProductInWishlist = !!this.userWishlist.find(
        (product) => product.id === this.product.id
      );
    } else {
      this.isProductInWishlist = false;
    }
  }

  checkIfLoggedInUserProduct() {
    if (this.product && this.userProducts) {
      this.isLoggedInUserProduct = !!this.userProducts.find(
        (product) => product.id === this.product.id
      );
    } else {
      this.isLoggedInUserProduct = false;
    }
  }

  addProductToWishlist() {
    this.userStore.dispatch(
      addProductToWishlist({
        userId: this.loggedInUser.id,
        productId: this.product.id,
      })
    );
  }

  removeProductFromWishlist() {
    this.userStore.dispatch(
      removeProductFromWishlist({
        userId: this.loggedInUser.id,
        productId: this.product.id,
      })
    );
  }

  updateProductRating(rating: number) {
    this.isRated = true;
    this.productsService
      .addNewRating(this.product.id, rating)
      .subscribe((product) => {
        this.product.rating = product.rating;
      });
  }

  postNewComment() {
    this.commentsService
      .addComment(this.loggedInUser.id, this.product.id, this.comment)
      .subscribe((comment) => {
        this.product.comments.push(comment);
        this.comment = '';
      });
  }

  navigateToCheckout() {
    this.router.navigateByUrl(`/checkout/${this.product.id}`);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
