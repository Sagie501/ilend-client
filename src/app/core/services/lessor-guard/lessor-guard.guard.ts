import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  UserState,
  getLoggedInUser,
  getUserProducts,
} from 'src/app/features/user/reducer/user.reducer';
import { map, switchMap, skip } from 'rxjs/operators';
import { Product } from '../../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class LessorGuard implements CanActivate {
  constructor(private userStore: Store<UserState>, private router: Router) {}

  static isFirstTime = true;

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.userStore.select(getLoggedInUser).pipe(
      switchMap((loggedInUser) => {
        if (loggedInUser && loggedInUser.isAdmin) {
          if (LessorGuard.isFirstTime && this.router.url === '/') {
            LessorGuard.isFirstTime = false;
            return this.userStore.select(getUserProducts).pipe(skip(1));
          } else {
            return this.userStore.select(getUserProducts);
          }
        } else {
          return [];
        }
      }),
      map((userProducts: Product[]) => {
        if (userProducts && userProducts.length > 0) {
          return true;
        } else {
          return this.router.createUrlTree(['/']);
        }
      })
    );
  }
}
