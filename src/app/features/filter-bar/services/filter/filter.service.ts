import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import {
  FilteringState,
  getCategoryFilterValue,
  getCityFilterValue,
  getPriceFilterValue,
  getSearchFilterValue,
} from '../../reducers/filter.reducer';
import { Product } from '../../../../core/models/product.model';
import { UserService } from '../../../../core/services/user/user.service';
import { PriceFilter } from '../../models/price-filter.model';

export const alwaysTrue = (product: Product) => true;

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filteringFunction$ = combineLatest([
      this.filteringStore.pipe(
        select(getSearchFilterValue),
        map(this.generateFilterBySearch)
      ),
      this.filteringStore.pipe(
        select(getPriceFilterValue),
        map(this.generateFilterByPrice)
      ),
      this.filteringStore.pipe(
        select(getCategoryFilterValue),
        map(this.generateFilterByCategory)
      ),
      this.filteringStore.pipe(
        select(getCityFilterValue),
        map((selectedCities: string[]) =>
          this.generateFilterByCity(selectedCities)
        )
      )
    ]
  ).pipe(map(this.generateFilteringFunction));

  constructor(
    private filteringStore: Store<FilteringState>,
    private userService: UserService
  ) {
  }

  generateFilterBySearch(value: string) {
    return (product: Product) =>
      product.name.includes(value) || product.description.includes(value);
  }

  generateFilterByPrice(value: PriceFilter) {
    return (product: Product) =>
      product.requestedPrice >= value.from &&
      product.requestedPrice <= value.to;
  }

  // TODO: Use the real categories from the DB
  generateFilterByCategory(filteredCategories: string[]) {
    return filteredCategories
      ? (product: Product) => filteredCategories.includes(product.category.name)
      : alwaysTrue;
  }

  // TODO: Use the real user id
  generateFilterByCity(filteredCities: string[]) {
    return filteredCities
      ? (product: Product) =>
        filteredCities.includes(this.userService.getFakeUser().city)
      : alwaysTrue;
  }

  generateFilteringFunction(filteringMap: ((product: Product) => boolean)[]) {
    return filteringMap.reduce((acc, curr) => (product) =>
      acc(product) && curr(product)
    );
  }
}
