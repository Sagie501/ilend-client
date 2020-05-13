import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLoggedInUser, UserState } from '../../../reducer/user.reducer';
import { User } from '../../../../../core/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ile-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.less']
})
export class MyAccountComponent implements OnInit, OnDestroy {

  loggedInUser: User;
  subscriptions: Array<Subscription>;

  constructor(private userStore: Store<UserState>) {
  }

  ngOnInit(): void {
    this.subscriptions = [
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
      })
    ];
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
