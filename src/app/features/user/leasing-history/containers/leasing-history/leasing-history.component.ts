import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeasingService } from 'src/app/core/services/leasing/leasing.service';
import { Leasing } from 'src/app/core/models/leasing.model';
import { getGreetingSentence } from 'src/app/shared/helpers/greeting-sentence.helper';
import { User } from '../../../../../core/models/user.model';
import { getLoggedInUser, UserState } from '../../../reducer/user.reducer';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ile-leasing-history',
  templateUrl: './leasing-history.component.html',
  styleUrls: ['./leasing-history.component.less'],
})
export class LeasingHistoryComponent implements OnInit, OnDestroy {

  pendingLeasings: Leasing[];
  loggedInUser: User;
  subscriptions: Array<Subscription>;
  getGreetingSentence = getGreetingSentence;

  constructor(private leasingService: LeasingService, private userStore: Store<UserState>) {
    this.pendingLeasings = this.leasingService.getPendingLeasings();
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
