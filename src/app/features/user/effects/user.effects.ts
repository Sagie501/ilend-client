import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { UserService } from '../../../core/services/user/user.service';
import {
  addNewProduct,
  addNewProductFailed,
  addNewProductSucceeded,
  addProductToWishlist,
  addProductToWishlistFailed,
  addProductToWishlistSucceeded,
  createNewUser,
  createNewUserFailed,
  createNewUserSucceeded, initUser,
  login,
  loginFailed,
  loginSucceeded,
  removeProductFromWishlist,
  removeProductFromWishlistFailed,
  removeProductFromWishlistSucceeded
} from '../actions/user.actoins';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ProductsService } from '../../../core/services/products/products.service';
import { EMPTY, forkJoin, of } from 'rxjs';
import { getLoggedInUser, UserState } from '../reducer/user.reducer';
import { Action, Store } from '@ngrx/store';

@Injectable()
export class UserEffects implements OnInitEffects {

  constructor(private actions$: Actions, private userService: UserService, private productsService: ProductsService,
              private userStore: Store<UserState>) {
  }

  init$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(initUser),
      withLatestFrom(this.userStore.select(getLoggedInUser)),
      switchMap(([action, loggedInUser]) => {
        if (loggedInUser) {
          return forkJoin([this.productsService.getUserWishlist(loggedInUser.id),
            this.productsService.getProductsByUserId(loggedInUser.id)]).pipe(
            map(([wishlist, products]) => {
              return loginSucceeded({ user: loggedInUser, wishlist, products });
            }));
        } else {
          return EMPTY;
        }
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      switchMap(action => {
        return this.userService.login(action.email, action.password).pipe(
          switchMap((user) => {
            return forkJoin([this.productsService.getUserWishlist(user.id), this.productsService.getProductsByUserId(user.id)]).pipe(
              map(([wishlist, products]) => {
                return loginSucceeded({ user, wishlist, products });
              }),
              catchError(message => of(loginFailed({ message }))),
            );
          }),
          catchError(message => of(loginFailed({ message })))
        );
      }),
    );
  });

  createNewUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createNewUser),
      switchMap(action => {
        return this.userService.createNewUser(action.user).pipe(
          map(user => createNewUserSucceeded({ user, wishlist: [], products: [] })),
          catchError(message => of(createNewUserFailed({ message }))),
        );
      }),
    );
  });

  addNewProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addNewProduct),
      withLatestFrom(this.userStore.select(getLoggedInUser)),
      switchMap(([action, loggedInUser]) => {
        return this.productsService.addProduct(loggedInUser.id, action.categoryId, action.product).pipe(
          map(product => addNewProductSucceeded({ product })),
          catchError(message => of(addNewProductFailed())),
        );
      }),
    );
  });

  addProductToWishlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addProductToWishlist),
      switchMap(action => {
        return this.productsService.addProductToWishlist(action.userId, action.productId).pipe(
          map(wishlist => addProductToWishlistSucceeded({ wishlist })),
          catchError(message => of(addProductToWishlistFailed())),
        );
      }),
    );
  });

  removeProductFromWishlist$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(removeProductFromWishlist),
      switchMap(action => {
        return this.productsService.removeProductFromWishlist(action.userId, action.productId).pipe(
          map(wishlist => removeProductFromWishlistSucceeded({ wishlist })),
          catchError(message => of(removeProductFromWishlistFailed())),
        );
      }),
    );
  });

  ngrxOnInitEffects(): Action {
    return initUser();
  }
}
