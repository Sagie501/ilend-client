import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { getLoggedInUser, UserState } from '../../../features/user/reducer/user.reducer';
import { map, switchMap } from 'rxjs/operators';
import { ProductsService } from '../../services/products/products.service';

@Injectable({
  providedIn: 'root'
})
export class CheckoutGuard implements CanActivate {

  constructor(private userStore: Store<UserState>, private router: Router, private productsService: ProductsService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.productsService.getProductById(next.params.id).pipe(
      switchMap((product) => {
        if (product) {
          return this.userStore.select(getLoggedInUser).pipe(
            switchMap((loggedInUser) => {
              if (loggedInUser) {
                return this.productsService.getProductsByUserId(loggedInUser.id).pipe(
                  map((userProducts) => {
                    if (userProducts.find((product) => product.id === next.params.id)) {
                      return this.router.createUrlTree([`/home/products/${next.params.id}`]);
                    } else {
                      return true;
                    }
                  })
                );
              } else {
                return of(this.router.createUrlTree([`/home/products/${next.params.id}`]));
              }
            })
          );
        } else {
          return of(this.router.createUrlTree(['/']));
        }
      })
    );
  }
}
