import {
  filterByCategory,
  filterByCity,
  filterByPrice,
  filterBySearch,
} from '../actions/filter.actions';
import {
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import { PriceFilter } from '../models/price-filter.model';
import { DropdownFilter } from '../models/dropdown-filter.model';

export const filteringToken = 'filteringReducer';

export class FilteringState {
  searchValue: string;
  priceValue: PriceFilter;
  categoryValue: string[];
  cityValue: string[];
}

export let initialState: FilteringState = {
  searchValue: '',
  priceValue: { from: 0, to: Number.MAX_SAFE_INTEGER },
  categoryValue: undefined,
  cityValue: undefined,
};

export const filteringReducer = createReducer(
  initialState,
  on(filterBySearch, (state, action) => ({
    ...state,
    searchValue: action.value,
  })),
  on(filterByPrice, (state, action) => ({
    ...state,
    priceValue: { from: action.from, to: action.to },
  })),
  on(filterByCategory, (state, action) => ({
    ...state,
    categoryValue: getNewFilteredValues(action.value, state.categoryValue),
  })),
  on(filterByCity, (state, action) => ({
    ...state,
    cityValue: getNewFilteredValues(action.value, state.cityValue),
  }))
);

const getNewFilteredValues = (
  change: DropdownFilter,
  currentValues: string[]
): string[] => {
  currentValues = currentValues ? currentValues : [];
  let newValues = [];

  if (change.isChecked) {
    newValues = currentValues.concat(change.id);
  } else {
    newValues = currentValues.filter((val) => val !== change.id);
  }

  return newValues.length > 0 ? [...newValues] : undefined;
};

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
