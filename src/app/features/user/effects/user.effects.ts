import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/services/user/user.service';
import {
  addProductToWishlist,
  addProductToWishlistFailed,
  addProductToWishlistSucceeded,
  createNewUser,
  createNewUserFailed,
  createNewUserSucceeded,
  login,
  loginFailed,
  loginSucceeded,
  removeProductFromWishlist,
  removeProductFromWishlistFailed,
  removeProductFromWishlistSucceeded,
  updateUser,
  updateUserFailed, updateUserFavoriteCategories,
  updateUserSucceeded,
  updateUserFavoriteCategoriesSucceeded, updateUserFavoriteCategoriesFailed
} from '../actions/user.actoins';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ProductsService } from '../../../core/services/products/products.service';
import { merge, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { getLoggedInUser, UserState } from '../reducer/user.reducer';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userService: UserService, private productsService: ProductsService,
              private userStore: Store<UserState>) {
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
          map(user => createNewUserSucceeded({ user, wishlist: [] })),
          catchError(message => of(createNewUserFailed({ message }))),
        );
      }),
    );
  });

  updateUser$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUser),
      switchMap(action => {
        return this.userService.updateUser(action.userId, action.partialUser).pipe(
          map(user => updateUserSucceeded({ user })),
          catchError(message => of(updateUserFailed({ message }))),
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

  updateUserFavoriteCategories$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserFavoriteCategories),
      withLatestFrom(this.userStore.select(getLoggedInUser)),
      switchMap(([action, loggedInUser]) => {
        let idsToAdd = action.favoriteCategoriesIds.filter((categoryId) =>
          !loggedInUser.favoriteCategories.map((category) => category.id).includes(categoryId));
        let idsToRemove = loggedInUser.favoriteCategories.map((category) =>
          category.id).filter((categoryId) => !action.favoriteCategoriesIds.includes(categoryId));
        return merge(this.userService.addFavoriteCategories(action.userId, idsToAdd),
          this.userService.removeFavoriteCategories(action.userId, idsToRemove)).pipe(
          map(user => {
            return updateUserFavoriteCategoriesSucceeded({ user });
          }),
          catchError(message => of(updateUserFavoriteCategoriesFailed({ message }))),
        );
      }),
    );
  });
}
