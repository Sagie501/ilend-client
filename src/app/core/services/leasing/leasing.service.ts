import { Injectable } from '@angular/core';
import { Leasing } from '../../models/leasing.model';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { getAllLeasingRequestsQuery } from '../../graphql/leasing.graphql';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root',
})
export class LeasingService {

  constructor(private apollo: Apollo, private userService: UserService, private productsService: ProductsService) {
  }

  getAllLeasingRequests(lessorId: string): Observable<Array<Leasing>> {
    return this.apollo.query<any>({
      query: getAllLeasingRequestsQuery,
      variables: {
        lessorId
      }
    }).pipe(
      map(({ data, errors }) => {
        let leasings: Array<Leasing> = data.getAllLeasingRequests;
        leasings = leasings.map((leasing) => {
          return this.mapLeasingForClient(leasing);
        });
        return leasings;
      })
    );
  }

  mapLeasingForClient(serverLeasing): Leasing {
    return {
      ...serverLeasing,
      lessee: this.userService.mapUserForClient(serverLeasing.lessee),
      product: this.productsService.mapProductForClient(serverLeasing.product),
      startDate: new Date(parseInt(serverLeasing.startDate, 10)),
      endDate: new Date(parseInt(serverLeasing.endDate, 10))
    };
  }
}
