import { createAction, props } from '@ngrx/store';
import { DropdownFilter } from '../models/dropdown-filter.model';

export const filterBySearch = createAction(
  '[Filter] Filter by search',
  props<{ value: string }>()
);

export const filterByPrice = createAction(
  '[Filter] Filter by price',
  props<{ from: number; to: number }>()
);

export const filterByCategory = createAction(
  '[Filter] Filter by category',
  props<{ value: DropdownFilter }>()
);

export const filterByCity = createAction(
  '[Filter] Filter by city',
  props<{ value: DropdownFilter }>()
);
