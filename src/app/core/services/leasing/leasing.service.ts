import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Apollo } from 'apollo-angular';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { getLoggedInUser } from 'src/app/features/user/reducer/user.reducer';
import { LeasingStatusFromServer } from '../../../shared/helpers/order-status.helper';
import {
  getAllLeasesByLesseeId,
  getAllOnGoingRequests,
  getAllOpenedRequests,
  openLeaseRequest,
  setLeaseRequestStatusMutation,
} from '../../graphql/leasing.graphql';
import { Leasing, LeasingInput } from '../../models/leasing.model';
import { Product } from '../../models/product.model';
import { User } from '../../models/user.model';
import { ProductsService } from '../products/products.service';
import { UserService } from '../user/user.service';

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
    endDate: number,
    creationDate: number
  ) {
    let leasingInput: LeasingInput = {
      lesseeId: this.loggedInUser.id,
      productId: product.id,
      endDate: endDate,
      creationDate: creationDate,
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
