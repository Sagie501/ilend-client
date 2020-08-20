import { Injectable, OnDestroy } from '@angular/core';
import { Leasing, LeasingInput } from '../../models/leasing.model';
import { Apollo } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import {
  setLeaseRequestStatusMutation,
  getAllLeasesByLesseeId,
  getAllOnGoingRequests,
  getAllOpenedRequests,
  openLeaseRequest,
  getAllLeasings,
} from '../../graphql/leasing.graphql';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { ProductsService } from '../products/products.service';
import { LeasingStatusFromServer } from '../../../shared/helpers/order-status.helper';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { Store } from '@ngrx/store';
import { getLoggedInUser } from 'src/app/features/user/reducer/user.reducer';

@Injectable({
  providedIn: 'root',
})
export class LeasingService implements OnDestroy {
  loggedInUser: User;
  subscriptions: Subscription[];

  constructor(
    private apollo: Apollo,
    private userService: UserService,
    private productsService: ProductsService,
    private store: Store
  ) {
    this.subscriptions = [
      this.store
        .select(getLoggedInUser)
        .subscribe((user) => (this.loggedInUser = user)),
    ];
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getAllLeasesByLesseeId(lesseeId: string): Observable<Array<Leasing>> {
    return this.apollo
      .watchQuery<any>({
        query: getAllLeasesByLesseeId,
        variables: {
          lesseeId,
        },
        pollInterval: 2000,
      })
      .valueChanges.pipe(
        map(({ data, errors }) => {
          return this.mapLeasingsForClient(data.getAllLeasesByLesseeId);
        })
      );
  }

  getAllOnGoingRequests(lessorId: string) {
    return this.apollo
      .watchQuery<any>({
        query: getAllOnGoingRequests,
        variables: { lessorId },
        pollInterval: 2000,
      })
      .valueChanges.pipe(
        map(({ data, errors }) => {
          return this.mapLeasingsForClient(data.getAllOnGoingRequests);
        })
      );
  }

  getAllOpenedRequests(lessorId: string) {
    return this.apollo
      .watchQuery<any>({
        query: getAllOpenedRequests,
        variables: { lessorId },
        pollInterval: 2000,
      })
      .valueChanges.pipe(
        map(({ data, errors }) => {
          return this.mapLeasingsForClient(data.getAllOpenedRequests);
        })
      );
  }

  getAllLeasings() {
    return this.apollo
      .watchQuery<any>({
        query: getAllLeasings,
        pollInterval: 10000,
      })
      .valueChanges.pipe(
        map(({ data, errors }) => {
          return this.mapLeasingsForClient(data.getAllLeasings);
        })
      );
  }

  setLeaseRequestStatus(
    leasingId: string,
    status: LeasingStatusFromServer
  ): Observable<Leasing> {
    return this.apollo
      .mutate<any>({
        mutation: setLeaseRequestStatusMutation,
        variables: {
          leasingId,
          status,
        },
      })
      .pipe(
        map(({ data, errors }) => {
          return this.mapLeasingForClient(data.setLeaseRequestStatus);
        })
      );
  }

  mapLeasingsForClient(serverLeasings): Leasing[] {
    let mappedLeasings = serverLeasings.map((leasing) => {
      return this.mapLeasingForClient(leasing);
    });
    return mappedLeasings;
  }

  mapLeasingForClient(serverLeasing): Leasing {
    return {
      ...serverLeasing,
      lessee: this.userService.mapUserForClient(serverLeasing.lessee),
      product: this.productsService.mapProductForClient(serverLeasing.product),
      startDate: new Date(parseInt(serverLeasing.startDate, 10)),
      endDate: new Date(parseInt(serverLeasing.endDate, 10)),
    };
  }

  openLeaseRequest(
    product: Product,
    totalPrice: number,
    cardNonce: string,
    endDate: number
  ) {
    let leasingInput: LeasingInput = {
      lesseeId: this.loggedInUser.id,
      productId: product.id,
      endDate: endDate,
      startDate: new Date().getTime(),
    };

    return this.apollo
      .mutate<any>({
        mutation: openLeaseRequest,
        variables: {
          leasing: leasingInput,
          cardNonce: cardNonce,
          price: totalPrice,
        },
      })
      .pipe(
        map(({ data, errors }) => {
          return this.mapLeasingForClient(data.openLeaseRequest);
        })
      );
  }
}
