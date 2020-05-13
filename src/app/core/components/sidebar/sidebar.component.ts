import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { getLoggedInUser, UserState } from '../../../features/user/reducer/user.reducer';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { logout } from '../../../features/user/actions/user.actoins';

@Component({
  selector: 'ile-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less']
})
export class SidebarComponent implements OnInit, OnDestroy {

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

  logout() {
    this.userStore.dispatch(logout());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
