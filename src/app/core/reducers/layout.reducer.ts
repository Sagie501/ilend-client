import {
  createReducer,
  on,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { ToggleTheme } from '../actions/layout.actions';

export const layoutToken = 'layout';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export type LayoutState = {
  theme: Theme;
};

export const initialState: LayoutState = {
  theme: Theme.LIGHT,
};

export const layoutReducer = createReducer(
  initialState,
  on(ToggleTheme, (state) => ({
    ...state,
    theme: state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
  }))
);

export const getLayoutState = createFeatureSelector(layoutToken);

export const getCurrentTheme = createSelector(
  getLayoutState,
  (state: LayoutState) => state.theme
);
