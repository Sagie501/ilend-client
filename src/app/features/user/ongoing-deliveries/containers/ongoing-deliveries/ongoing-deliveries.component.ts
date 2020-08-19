import { Component, OnInit } from '@angular/core';
import { Leasing } from 'src/app/core/models/leasing.model';
import { User } from 'src/app/core/models/user.model';
import { Subscription, of } from 'rxjs';
import { getGreetingSentence } from 'src/app/shared/helpers/greeting-sentence.helper';
import { LeasingService } from 'src/app/core/services/leasing/leasing.service';
import { UserState, getLoggedInUser } from '../../../reducer/user.reducer';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';


@Component({
  selector: 'ile-ongoing-deliveries',
  templateUrl: './ongoing-deliveries.component.html',
  styleUrls: ['./ongoing-deliveries.component.less', '../../../../../../../node_modules/font-awesome/css/font-awesome.css']
})
export class OngoingDeliveriesComponent implements OnInit {

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
              return this.leasingService.getAllOnGoingDeliveriesRequests(loggedInUser.id);
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

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

}
