import { User } from '../../../core/models/user.model';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { loginSucceeded, logout } from '../actions/user.actoins';

export const userToken = 'userReducer';

export class UserState {
  loggedInUser: User;
}

export let initialState: UserState = {
  loggedInUser: JSON.parse(localStorage.getItem('logged-in-user'))
};

export const userReducer = createReducer(
  initialState,
  on(loginSucceeded, (state, action) => {
    localStorage.setItem('logged-in-user', JSON.stringify(action.user));
    return {
      ...state,
      loggedInUser: action.user
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
