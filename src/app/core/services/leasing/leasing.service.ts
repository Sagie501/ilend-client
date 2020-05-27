import { Injectable } from '@angular/core';
import { Leasing } from '../../models/leasing.model';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import {
  getAllLeasingRequestsQuery,
  setLeaseRequestStatusMutation,
  getAllLeasesByLesseeId,
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

  getAllLeasingRequests(lessorId: string): Observable<Array<Leasing>> {
    return this.apollo
      .watchQuery<any>({
        query: getAllLeasingRequestsQuery,
        variables: {
          lessorId,
        },
      })
      .valueChanges.pipe(
        map(({ data, errors }) => {
          let leasings: Array<Leasing> = data.getAllLeasingRequests;
          leasings = leasings.map((leasing) => {
            return this.mapLeasingForClient(leasing);
          });
          return leasings;
        })
      );
  }

  getAllLeasesByLesseeId(lesseeId: string): Observable<Array<Leasing>> {
    return this.apollo
      .watchQuery<any>({
        query: getAllLeasesByLesseeId,
        variables: {
          lesseeId,
        },
      })
      .valueChanges.pipe(
        map(({ data, errors }) => {
          let leasings: Array<Leasing> = data.getAllLeasesByLesseeId;
          leasings = leasings.map((leasing) => {
            return this.mapLeasingForClient(leasing);
          });
          return leasings;
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
