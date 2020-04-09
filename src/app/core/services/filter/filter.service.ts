import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import {
  FilteringState,
  getSearchFilterValue,
  PriceFilter,
  getPriceFilterValue,
  getCategoryFilterValue,
  getCityFilterValue,
} from '../../reducers/filter.reducer';
import { Product } from '../../models/product.model';
import { Category } from '../../models/category.model';
import { UserService } from '../user/user.service';

export const categories: Category[] = [
  {
    categoryID: '1',
    description: 'sdfsadf',
    name: 'hello',
    pictureLink: 'sfsadfd',
  },
  {
    categoryID: '2',
    description: 'sdfsadf',
    name: 'world',
    pictureLink: 'sfsadfd',
  },
  {
    categoryID: '3',
    description: 'sdfsadf',
    name: 'what',
    pictureLink: 'sfsadfd',
  },
  {
    categoryID: '4',
    description: 'sdfsadf',
    name: 'ciao',
    pictureLink: 'sfsadfd',
  },
];

export const alwaysTrue = (product: Product) => true;

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  filteringFunction$ = combineLatest(
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
      map(this.generateFilterByCity)
    )
  ).pipe(map(this.generateFilteringFunction));

  constructor(
    private filteringStore: Store<FilteringState>,
    private userService: UserService
  ) {}

  generateFilterBySearch(value: string) {
    return (product: Product) =>
      product.name.includes(value) || product.description.includes(value);
  }

  generateFilterByPrice(value: PriceFilter) {
    return (product: Product) =>
      product.requestedPrice >= value.from &&
      product.requestedPrice <= value.to;
  }

  generateFilterByCategory(value: string) {
    return value
      ? (product: Product) =>
          categories.find(
            (category) => category.categoryID === product.categoryID
          ).name === value
      : alwaysTrue;
  }

  generateFilterByCity(value: string) {
    return value
      ? (product: Product) => this.userService.getFakeUser().city === value
      : alwaysTrue;
  }

  generateFilteringFunction(filteringMap: ((product: Product) => boolean)[]) {
    return filteringMap.reduce((acc, curr) => (product) =>
      acc(product) && curr(product)
    );
  }
}
