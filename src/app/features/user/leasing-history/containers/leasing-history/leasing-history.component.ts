import { Component, OnDestroy, OnInit } from '@angular/core';
import { LeasingService } from 'src/app/core/services/leasing/leasing.service';
import { Leasing } from 'src/app/core/models/leasing.model';
import { getGreetingSentence } from 'src/app/shared/helpers/greeting-sentence.helper';
import { User } from '../../../../../core/models/user.model';
import { getLoggedInUser, UserState } from '../../../reducer/user.reducer';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LeasingStatusFromServer } from '../../../../../shared/helpers/order-status.helper';

@Component({
  selector: 'ile-leasing-history',
  templateUrl: './leasing-history.component.html',
  styleUrls: ['./leasing-history.component.less'],
})
export class LeasingHistoryComponent implements OnInit, OnDestroy {
  pendingLeasings: Leasing[] = [];
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
              return this.leasingService.getAllLeasesByLesseeId(
                loggedInUser.id
              );
            } else {
              return of([] as Array<Leasing>);
            }
          })
        )
        .subscribe((leasings) => {
          this.leasings = leasings;
          this.pendingLeasings = leasings.filter(
            (leasing) =>
              leasing.status === LeasingStatusFromServer.WAITING_FOR_APPROVE
          );
        }),
    ];
  }

  changeLeasingRequestStatus(value: {
    leasingId: string;
    status: LeasingStatusFromServer;
  }) {
    this.leasingService
      .setLeaseRequestStatus(value.leasingId, value.status)
      .subscribe();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
