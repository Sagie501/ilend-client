import { User } from '../../../core/models/user.model';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import {
  addProductToWishlistSucceeded,
  createNewUserSucceeded,
  loginSucceeded,
  logout,
  removeProductFromWishlistSucceeded
} from '../actions/user.actoins';
import { Product } from '../../../core/models/product.model';

export const userToken = 'userReducer';

export class UserState {
  loggedInUser: User;
  userWishlist: Array<Product>;
}

export let initialState: UserState = {
  loggedInUser: JSON.parse(localStorage.getItem('logged-in-user')),
  userWishlist: JSON.parse(localStorage.getItem('user-wish-list'))
};

export const userReducer = createReducer(
  initialState,
  on(loginSucceeded, createNewUserSucceeded, (state, action) => {
    localStorage.setItem('logged-in-user', JSON.stringify(action.user));
    localStorage.setItem('user-wish-list', JSON.stringify(action.wishlist));
    return {
      ...state,
      loggedInUser: action.user,
      userWishlist: action.wishlist
    };
  }),
  on(addProductToWishlistSucceeded, removeProductFromWishlistSucceeded, (state, action) => {
    localStorage.setItem('user-wish-list', JSON.stringify(action.wishlist));
    return {
      ...state,
      userWishlist: action.wishlist
    };
  }),
  on(logout, (state, action) => {
    localStorage.removeItem('logged-in-user');
    localStorage.removeItem('user-wish-list');
    return {
      ...state,
      loggedInUser: null
    };
  })
);

export const getState = createFeatureSelector(userToken);

export const getLoggedInUser = createSelector(
  getState,
  (state: UserState) => state.loggedInUser
);

export const getUserWishlist = createSelector(
  getState,
  (state: UserState) => state.userWishlist
);
