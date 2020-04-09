import { Action } from '@ngrx/store';

export enum FilterActionTypes {
  FILTER_BY_SEARCH = '[Filter] Filter by search',
  FILTER_BY_PRICE = '[Filter] Filter by price',
  FILTER_BY_CATEGORY = '[Filter] Filter by category',
  FILTER_BY_CITY = '[Filter] Filter by city',
}

export class FilterBySearch implements Action {
  readonly type = FilterActionTypes.FILTER_BY_SEARCH;

  constructor(public payload: { value: string }) {}
}

export class FilterByPrice implements Action {
  readonly type = FilterActionTypes.FILTER_BY_PRICE;

  constructor(public payload: { from: number; to: number }) {}
}

export class FilterByCategory implements Action {
  readonly type = FilterActionTypes.FILTER_BY_CATEGORY;

  constructor(public payload: { value: string }) {}
}

export class FilterByCity implements Action {
  readonly type = FilterActionTypes.FILTER_BY_CITY;

  constructor(public payload: { value: string }) {}
}

export type FilterActions =
  | FilterBySearch
  | FilterByPrice
  | FilterByCategory
  | FilterByCity;
