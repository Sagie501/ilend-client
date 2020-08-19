import { Injectable } from '@angular/core';
import { Leasing } from '../../models/leasing.model';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  setLeaseRequestStatusMutation,
  getAllLeasesByLesseeId,
  getAllOnGoingRequests,
  getAllOpenedRequests,
  getAllOnGoingDeliveriesRequests,
  getAllLeasings,
} from '../../graphql/leasing.graphql';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { ProductsService } from '../products/products.service';
import { LeasingStatusFromServer } from '../../../shared/helpers/order-status.helper';

@Injectable({
  providedIn: 'root',
})
export class LeasingService {
  constructor(
    private apollo: Apollo,
    private userService: UserService,
    private productsService: ProductsService
  ) {}

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

  getAllOnGoingDeliveriesRequests(lesseeId: string) {
    return this.apollo
      .watchQuery<any>({
        query: getAllOnGoingDeliveriesRequests,
        variables: { lesseeId },
        pollInterval: 2000,
      })
      .valueChanges.pipe(
        map(({ data, errors }) => {
          return this.mapLeasingsForClient(data.getAllOnGoingDeliveriesRequests);

        }))
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
}
