import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { getGreetingSentence } from 'src/app/shared/helpers/greeting-sentence.helper';
import {
  logout,
  wishlistUpdated,
} from '../../../features/user/actions/user.actoins';
import {
  getLoggedInUser,
  getUserProducts,
  UserState,
} from '../../../features/user/reducer/user.reducer';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { LeasingService } from '../../services/leasing/leasing.service';
import { ProductsService } from '../../services/products/products.service';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'ile-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  loggedInUser: User;
  userProducts: Product[] = [];
  ongoingLeasingsAmount: number = 0;
  openedRequestAmount: number = 0;
  onGoingDeliveriesRequestAmount: number = 0;
  subscriptions: Array<Subscription>;
  getGreetingSentence = getGreetingSentence;

  constructor(
    private userStore: Store<UserState>,
    private router: Router,
    private leasingsService: LeasingService,
    private productsService: ProductsService
  ) {}

  ngOnInit(): void {
    let subscriptionsArray = [];
    subscriptionsArray = [
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;

        if (loggedInUser) {
          subscriptionsArray.push(
            this.leasingsService
              .getAllOnGoingRequests(this.loggedInUser.id)
              .subscribe((leasings) => {
                this.ongoingLeasingsAmount = leasings.length;
              })
          );

          subscriptionsArray.push(
            this.leasingsService
              .getAllOpenedRequests(this.loggedInUser.id)
              .subscribe((leasings) => {
                this.openedRequestAmount = leasings.length;
              })
          );
          subscriptionsArray.push(
            this.leasingsService
              .getAllOnGoingDeliveriesRequests(this.loggedInUser.id)
              .subscribe((leasings) => {
                this.onGoingDeliveriesRequestAmount = leasings.length;
              })
          );
          subscriptionsArray.push(
            this.productsService
              .getUserWishlist(this.loggedInUser.id)
              .pipe(distinctUntilChanged())
              .subscribe((wishlist) => {
                this.userStore.dispatch(wishlistUpdated({ wishlist }));
              })
          );
        }
      }),
      this.userStore.select(getUserProducts).subscribe((userProducts) => {
        if (userProducts) {
          this.userProducts = userProducts;
        }
      }),
    ];

    this.subscriptions = subscriptionsArray;
  }

  fetchAmountData() {
    this.subscriptions.push(
      this.leasingsService
        .getAllOnGoingRequests(this.loggedInUser.id)
        .subscribe((leasings) => {
          this.ongoingLeasingsAmount = leasings.length;
        })
    );
  }

  logout() {
    this.userStore.dispatch(logout());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  isActiveRoute(route: string) {
    return this.router.url === route;
  }
}
