import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getLoggedInUser,
  getUserWishlist,
  UserState,
} from '../../../reducer/user.reducer';
import { Subscription } from 'rxjs';
import { Product } from '../../../../../core/models/product.model';
import { User } from '../../../../../core/models/user.model';
import { getGreetingSentence } from 'src/app/shared/helpers/greeting-sentence.helper';

@Component({
  selector: 'ile-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.less'],
})
export class WishlistComponent implements OnInit, OnDestroy {
  wishlist: Array<Product> = [];
  loggedInUser: User;
  subscriptions: Array<Subscription>;
  getGreetingSentence = getGreetingSentence;

  constructor(private userStore: Store<UserState>) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.userStore.select(getUserWishlist).subscribe((wishlist) => {
        this.wishlist = wishlist;
      }),
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }),
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
