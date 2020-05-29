import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getLoggedInUser,
  UserState,
  getUserProducts,
} from '../../../features/user/reducer/user.reducer';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { logout } from '../../../features/user/actions/user.actoins';
import { Router } from '@angular/router';
import { getGreetingSentence } from 'src/app/shared/helpers/greeting-sentence.helper';
import { Product } from '../../models/product.model';
import { LeasingService } from '../../services/leasing/leasing.service';

@Component({
  selector: 'ile-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  loggedInUser: User;
  userProducts: Product[] = [];
  ongoingLeasingsAmount: number = 0;
  subscriptions: Array<Subscription>;
  getGreetingSentence = getGreetingSentence;

  constructor(
    private userStore: Store<UserState>,
    private router: Router,
    private leasingsService: LeasingService
  ) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }),
      this.userStore.select(getUserProducts).subscribe((userProducts) => {
        if (userProducts) {
          this.userProducts = userProducts;

          this.subscriptions.push(
            this.leasingsService
              .getAllOnGoingRequests(this.loggedInUser.id)
              .subscribe((leasings) => {
                this.ongoingLeasingsAmount = leasings.length;
              })
          );
        }
      }),
    ];
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
