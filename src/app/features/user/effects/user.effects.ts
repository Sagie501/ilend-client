import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../../core/services/user/user.service';
import { login, loginFailed, loginSucceeded } from '../actions/user.actoins';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable()
export class UserEffects {

  constructor(private actions$: Actions, private userService: UserService) {
  }

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(login),
      switchMap(action => {
        return this.userService.login(action.email, action.password).pipe(
          map(user => loginSucceeded({ user })),
          catchError(message => loginFailed),
        );
      }),
    );
  });
}
