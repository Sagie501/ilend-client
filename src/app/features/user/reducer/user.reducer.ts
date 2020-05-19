import { User } from '../../../core/models/user.model';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import {
  addNewProductSucceeded,
  addProductToWishlistSucceeded,
  createNewUserSucceeded, deleteProductSucceeded,
  loginSucceeded,
  logout,
  removeProductFromWishlistSucceeded, updateProductSucceeded,
  updateUserFavoriteCategoriesSucceeded,
  updateUserSucceeded
} from '../actions/user.actoins';
import { Product } from '../../../core/models/product.model';

export const userToken = 'userReducer';

export class UserState {
  loggedInUser: User;
  userWishlist: Array<Product>;
  userProducts: Array<Product>;
}

export let initialState: UserState = {
  loggedInUser: JSON.parse(localStorage.getItem('logged-in-user')),
  userWishlist: null,
  userProducts: null
};

export const userReducer = createReducer(
  initialState,
  on(loginSucceeded, createNewUserSucceeded, (state, action) => {
    localStorage.setItem('logged-in-user', JSON.stringify(action.user));
    return {
      ...state,
      loggedInUser: action.user,
      userWishlist: action.wishlist,
      userProducts: action.products
    };
  }),
  on(updateUserSucceeded, updateUserFavoriteCategoriesSucceeded, (state, action) => {
    localStorage.setItem('logged-in-user', JSON.stringify(action.user));
    return {
      ...state,
      loggedInUser: action.user
    };
  }),
  on(addProductToWishlistSucceeded, removeProductFromWishlistSucceeded, (state, action) => {
    return {
      ...state,
      userWishlist: action.wishlist
    };
  }),
  on(addNewProductSucceeded, (state, action) => {
    let newProducts = state.userProducts ? [...state.userProducts] : [];
    newProducts.push(action.product);
    return {
      ...state,
      userProducts: newProducts
    };
  }),
  on(updateProductSucceeded, (state, action) => {
    let productIndex = state.userProducts.findIndex((product) => product.id === action.product.id);
    return {
      ...state,
      userProducts: [...state.userProducts.slice(0, productIndex), action.product, ...state.userProducts.slice(productIndex + 1)]
    };
  }),
  on(deleteProductSucceeded, (state, action) => {
    return {
      ...state,
      userProducts: state.userProducts.filter(product => product.id !== action.productId)
    };
  }),
  on(logout, (state, action) => {
    localStorage.removeItem('logged-in-user');
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

export const getUserProducts = createSelector(
  getState,
  (state: UserState) => state.userProducts
);
