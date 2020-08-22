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
  theme: localStorage.getItem('ilend-preffered-theme')
    ? (localStorage.getItem('ilend-preffered-theme') as Theme)
    : Theme.LIGHT,
};

export const layoutReducer = createReducer(
  initialState,
  on(ToggleTheme, (state) => {
    let newState = {
      ...state,
      theme: state.theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT,
    };

    localStorage.setItem('ilend-preffered-theme', newState.theme);

    return newState;
  })
);

export const getLayoutState = createFeatureSelector(layoutToken);

export const getCurrentTheme = createSelector(
  getLayoutState,
  (state: LayoutState) => state.theme
);
