import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/services/user/user.service';
import {
  addProductToWishlist, addProductToWishlistFailed, addProductToWishlistSucceeded,
  createNewUser,
  createNewUserFailed,
  createNewUserSucceeded,
  login,
  loginFailed,
  loginSucceeded,
  removeProductFromWishlist, removeProductFromWishlistFailed, removeProductFromWishlistSucceeded
} from '../actions/user.actoins';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductsService } from '../../../core/services/products/products.service';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userService: UserService, private productsService: ProductsService) {
  }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      switchMap(action => {
        return this.userService.login(action.email, action.password).pipe(
          switchMap((user) => {
            return this.productsService.getUserWishlist(user.id).pipe(
              map((wishlist) => {
                return loginSucceeded({ user, wishlist });
              }),
              catchError(message => loginFailed),
            );
          }),
          catchError(message => loginFailed),
        );
      }),
    );
  });

  createNewUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createNewUser),
      switchMap(action => {
        return this.userService.createNewUser(action.user).pipe(
          map(user => createNewUserSucceeded({ user, wishlist: [] })),
          catchError(message => createNewUserFailed),
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
          catchError(message => addProductToWishlistFailed),
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
          catchError(message => removeProductFromWishlistFailed),
        );
      }),
    );
  });
}
