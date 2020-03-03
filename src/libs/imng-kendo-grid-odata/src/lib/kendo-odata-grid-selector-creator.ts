import { createFeatureSelector, createSelector, MemoizedSelector, DefaultProjectorFn } from '@ngrx/store';
import { KendoODataGridState } from './kendo-odata-grid-state';
import { getODataPagerSettings } from './kendo-odata-grid-rxjs-operators';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { PagerSettings } from '@progress/kendo-angular-grid';

export function createKendoODataGridSelector<TEntity, TPartialState, TState extends KendoODataGridState<TEntity>>(
  featureName: keyof TPartialState,
): {
  getLoading: MemoizedSelector<TPartialState, boolean, DefaultProjectorFn<boolean>>;
  getError: MemoizedSelector<TPartialState, any, DefaultProjectorFn<any>>;
  getGridData: MemoizedSelector<TPartialState, ODataResult<TEntity>, DefaultProjectorFn<ODataResult<TEntity>>>;
  getGridODataState: MemoizedSelector<TPartialState, ODataState, DefaultProjectorFn<ODataState>>;
  getPagerSettings: MemoizedSelector<TPartialState, false | PagerSettings, DefaultProjectorFn<false | PagerSettings>>;
} {
  const entireStateSelector = createFeatureSelector<TPartialState, TState>(featureName);
  const getGridData = createSelector(entireStateSelector, state => state.gridData);
  const getGridODataState = createSelector(entireStateSelector, state => state.gridODataState);
  return {
    getLoading: createSelector(entireStateSelector, state => state.loading),
    getError: createSelector(entireStateSelector, state => state.error),
    getGridData,
    getGridODataState,
    getPagerSettings: createSelector(getGridData, getGridODataState, (result, state) =>
      getODataPagerSettings<TEntity>({ gridData: result, gridODataState: state }),
    ),
  };
}
