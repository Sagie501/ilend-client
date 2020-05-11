import { createAction, props } from '@ngrx/store';
import { User } from '../../../core/models/user.model';

export const login = createAction(
  '[User] Login',
  props<{ email: string, password: string }>()
);

export const loginSucceeded = createAction(
  '[User] Login Succeeded',
  props<{ user: User }>()
);

export const loginFailed = createAction(
  '[User] Login Failed'
);

export const logout = createAction(
  '[User] Logout'
);
