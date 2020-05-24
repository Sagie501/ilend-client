import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  getLoggedInUser,
  UserState,
} from '../../../features/user/reducer/user.reducer';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.model';
import { logout } from '../../../features/user/actions/user.actoins';
import { Router } from '@angular/router';
import { getGreetingSentence } from 'src/app/shared/helpers/greeting-sentence.helper';

@Component({
  selector: 'ile-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.less'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  loggedInUser: User;
  subscriptions: Array<Subscription>;
  getGreetingSentence = getGreetingSentence;

  constructor(private userStore: Store<UserState>, private router: Router) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
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
