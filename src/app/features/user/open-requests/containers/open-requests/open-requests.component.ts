import { Component, OnInit } from '@angular/core';
import { LeasingService } from 'src/app/core/services/leasing/leasing.service';
import { Store } from '@ngrx/store';
import { getLoggedInUser, UserState, } from 'src/app/features/user/reducer/user.reducer';
import { Leasing } from 'src/app/core/models/leasing.model';
import { User } from 'src/app/core/models/user.model';
import { DeliveryStatusFromServer, LeasingStatusFromServer } from '../../../../../shared/helpers/order-status.helper';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { getGreetingSentence } from '../../../../../shared/helpers/greeting-sentence.helper';

@Component({
  selector: 'ile-open-requests',
  templateUrl: './open-requests.component.html',
  styleUrls: ['./open-requests.component.less'],
})
export class OpenRequestsComponent implements OnInit {
  leasings: Array<Leasing> = [];
  loggedInUser: User;
  subscriptions: Array<Subscription>;
  getGreetingSentence = getGreetingSentence;

  constructor(
    private leasingService: LeasingService,
    private userStore: Store<UserState>
  ) {
  }

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
              return this.leasingService.getAllOpenedRequests(loggedInUser.id);
            } else {
              return of([] as Array<Leasing>);
            }
          })
        )
        .subscribe((leasings) => {
          this.leasings = [
            ...leasings,
            ...leasings,
            ...leasings,
            ...leasings,
            ...leasings,

            ...leasings,

            ...leasings,

            ...leasings,

            ...leasings,

            ...leasings,

            ...leasings,

            ...leasings,
          ];
        }),
    ];
  }

  changeLeasingRequestStatus(value: {
    leasingId: string;
    status: LeasingStatusFromServer;
    deliveryStatus: DeliveryStatusFromServer;
  }) {
    let deliveryStatus = value.status === LeasingStatusFromServer.IN_DELIVERY ? this.getRandomDeliveryStatus() : DeliveryStatusFromServer.CANCELED;
    this.leasingService
      .setLeaseRequestStatus(value.leasingId, value.status, deliveryStatus)
      .subscribe();
  }

  getRandomDeliveryStatus() {
    let deliveriesStatus = [DeliveryStatusFromServer.IN_TRANSIT, DeliveryStatusFromServer.ARRIVED_IN_LOCAL_WAREHOUSE, DeliveryStatusFromServer.DISPATCHING_FROM_LOCAL_WAREHOUSE];
    return deliveriesStatus[Math.floor(Math.random() * 3)];
  }
}
