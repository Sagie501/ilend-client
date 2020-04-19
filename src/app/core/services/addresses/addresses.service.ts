import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { getCitiesByCountryQuery, getCountriesQuery } from '../../graphql/addresses.graphql';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  constructor(private apollo: Apollo) { }

  getCountries(): Observable<Array<string>> {
    return this.apollo.watchQuery<any>({
      query: getCountriesQuery
    }).valueChanges.pipe<Array<string>>(
      map(({ data }) => {
        return data.getAllCountries as Array<string>;
      })
    );
  }

  getCitiesByCountry(countryName: string): Observable<Array<string>> {
    return this.apollo.watchQuery<any>({
      query: getCitiesByCountryQuery,
      variables: {
        countryName
      }
    }).valueChanges.pipe<Array<string>>(
      map(({ data }) => {
        return data.getCitiesByCountry as Array<string>;
      })
    );
  }
}
