import { User } from '../../../core/models/user.model';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { loginSucceeded } from '../actions/user.actoins';

export const userToken = 'userReducer';

export class UserState {
  loggedInUser: User;
}

export let initialState: UserState = {
  loggedInUser: null
};

export const userReducer = createReducer(
  initialState,
  on(loginSucceeded, (state, action) => ({
    ...state,
    loggedInUser: action.user
  }))
);

export const getState = createFeatureSelector(userToken);

export const getLoggedInUser = createSelector(
  getState,
  (state: UserState) => state.loggedInUser
);
