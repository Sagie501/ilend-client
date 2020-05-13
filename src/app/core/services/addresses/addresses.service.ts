import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getCitiesByCountriesQuery, getCountriesQuery } from '../../graphql/addresses.graphql';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private apollo: Apollo) { }

  getCountries(): Observable<Array<string>> {
    return this.apollo.query<any>({
      query: getCountriesQuery
    }).pipe<Array<string>>(
      map(({ data }) => {
        return data.getAllCountries as Array<string>;
      })
    );
  }

  getCitiesByCountries(countriesNames: Array<string>): Observable<Array<string>> {
    return this.apollo.query<any>({
      query: getCitiesByCountriesQuery,
      variables: {
        countriesNames
      }
    }).pipe<Array<string>>(
      map(({ data }) => {
        return data.getCitiesByCountries as Array<string>;
      })
    );
  }
}
