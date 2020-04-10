import { FilterActions, FilterActionTypes } from '../actions/filter.actions';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const filteringToken = 'filteringReducer';

export type PriceFilter = {
  from: number;
  to: number;
};

export class FilteringState {
  searchValue: string;
  priceValue: PriceFilter;
  categoryValue: string;
  cityValue: string;
}

export let initialState: FilteringState = {
  searchValue: '',
  priceValue: { from: 0, to: Number.MAX_SAFE_INTEGER },
  categoryValue: undefined,
  cityValue: undefined,
};

export function filteringReducer(
  state: FilteringState = initialState,
  action: FilterActions
): FilteringState {
  switch (action.type) {
    case FilterActionTypes.FILTER_BY_SEARCH: {
      return {
        ...state,
        searchValue: action.payload.value,
      };
    }

    case FilterActionTypes.FILTER_BY_PRICE: {
      return {
        ...state,
        priceValue: { from: action.payload.from, to: action.payload.to },
      };
    }

    case FilterActionTypes.FILTER_BY_CATEGORY: {
      return {
        ...state,
        categoryValue: action.payload.value,
      };
    }

    case FilterActionTypes.FILTER_BY_CITY: {
      return {
        ...state,
        cityValue: action.payload.value,
      };
    }

    default:
      return state;
  }
}

export const getState = createFeatureSelector(filteringToken);

export const getSearchFilterValue = createSelector(
  getState,
  (state: FilteringState) => state.searchValue
);

export const getPriceFilterValue = createSelector(
  getState,
  (state: FilteringState) => state.priceValue
);

export const getCategoryFilterValue = createSelector(
  getState,
  (state: FilteringState) => state.categoryValue
);

export const getCityFilterValue = createSelector(
  getState,
  (state: FilteringState) => state.cityValue
);
