/* eslint-disable @typescript-eslint/ban-types */
import { createFeatureSelector, createSelector, MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';
import { KendoODataGridState } from './kendo-odata-grid-state';
import { getODataPagerSettings } from './kendo-odata-grid-rxjs-operators';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { PagerSettings } from '@progress/kendo-angular-grid';

export function createKendoODataGridSelector<TEntity, TPartialState, TState extends KendoODataGridState<TEntity>>(
  featureName: keyof TPartialState,
): {
  getLoading: MemoizedSelector<object, boolean, DefaultProjectorFn<boolean>>;
  getError: MemoizedSelector<object, unknown, DefaultProjectorFn<unknown>>;
  getGridData: MemoizedSelector<object, ODataResult<TEntity>, DefaultProjectorFn<ODataResult<TEntity>>>;
  getGridODataState: MemoizedSelector<object, ODataState, DefaultProjectorFn<ODataState>>;
  getPagerSettings: MemoizedSelector<object, false | PagerSettings, DefaultProjectorFn<false | PagerSettings>>;
} {
  const entireStateSelector = createFeatureSelector<TState>(featureName.toString());
  const getGridData = createSelector(entireStateSelector, (state) => state.gridData);
  const getGridODataState = createSelector(entireStateSelector, (state) => state.gridODataState);
  return {
    getGridData,
    getGridODataState,
    getLoading: createSelector(entireStateSelector, (state) => state.loading),
    getError: createSelector(entireStateSelector, (state) => state.error),
    getPagerSettings: createSelector(getGridData, getGridODataState, (result, state) =>
      getODataPagerSettings<TEntity>({ gridData: result, gridODataState: state }),
    ),
  };
}
