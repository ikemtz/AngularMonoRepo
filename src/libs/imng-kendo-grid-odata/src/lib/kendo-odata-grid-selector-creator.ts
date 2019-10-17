import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KendoODataGridState } from './kendo-odata-grid-state';
import { getODataPagerSettings } from './kendo-odata-grid-rxjs-operators';

export function createKendoODataGridSelector<TEntity, TPartialState, TState extends KendoODataGridState<TEntity>>(
  featureName: keyof TPartialState,
) {
  const entireStateSelector = createFeatureSelector<TPartialState, TState>(featureName);
  const getGridData = createSelector(
    entireStateSelector,
    state => state.gridData,
  );
  const getGridODataState = createSelector(
    entireStateSelector,
    state => state.gridODataState,
  );
  return {
    getLoading: createSelector(
      entireStateSelector,
      state => state.loading,
    ),
    getError: createSelector(
      entireStateSelector,
      state => state.error,
    ),
    getGridData,
    getGridODataState,
    getPagerSettings: createSelector(
      getGridData,
      getGridODataState,
      (result, state) => getODataPagerSettings<TEntity>({ gridData: result, gridODataState: state }),
    ),
  };
}
