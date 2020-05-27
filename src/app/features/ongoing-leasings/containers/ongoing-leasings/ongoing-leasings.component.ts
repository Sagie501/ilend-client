import { Component, OnInit } from '@angular/core';
import { LeasingService } from 'src/app/core/services/leasing/leasing.service';
import { Store } from '@ngrx/store';
import {
  UserState,
  getLoggedInUser,
} from 'src/app/features/user/reducer/user.reducer';
import { Leasing } from 'src/app/core/models/leasing.model';
import { User } from 'src/app/core/models/user.model';
import { Subscription, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getGreetingSentence } from 'src/app/shared/helpers/greeting-sentence.helper';

@Component({
  selector: 'ile-ongoing-leasings',
  templateUrl: './ongoing-leasings.component.html',
  styleUrls: ['./ongoing-leasings.component.less'],
})
export class OngoingLeasingsComponent implements OnInit {
  leasings: Array<Leasing> = [];
  loggedInUser: User;
  subscriptions: Array<Subscription>;
  getGreetingSentence = getGreetingSentence;

  constructor(
    private leasingService: LeasingService,
    private userStore: Store<UserState>
  ) {}

  ngOnInit(): void {
    this.subscriptions = [
      this.userStore.select(getLoggedInUser).subscribe((loggedInUser) => {
        this.loggedInUser = loggedInUser;
      }),
      this.userStore
        .select(getLoggedInUser)
        .pipe(
          switchMap((loggedInUser) => {
            if (loggedInUser) {
              return this.leasingService.getAllOnGoingRequests(loggedInUser.id);
            } else {
              return of([] as Array<Leasing>);
            }
          })
        )
        .subscribe((leasings) => {
          this.leasings = leasings;
        }),
    ];
  }
}
