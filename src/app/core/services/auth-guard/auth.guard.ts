import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getLoggedInUser, UserState } from '../../../features/user/reducer/user.reducer';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userStore: Store<UserState>, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userStore.select(getLoggedInUser).pipe(
      map((loggedInUser) => {
        if (loggedInUser) {
          return true;
        } else {
          return this.router.createUrlTree(['/home']);
        }
      })
    );
  }
}
