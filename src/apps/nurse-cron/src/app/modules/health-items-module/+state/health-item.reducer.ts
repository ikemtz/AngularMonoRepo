import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { imngEffectError, imngEffectErrorReducer } from 'imng-ngrx-utils';
import { IHealthItem } from '../../../models/health-items-odata';

import * as healthItemActionTypes from './health-item.actions';
export const HEALTH_ITEMS_FEATURE_KEY = 'healthItems';

export interface State extends KendoODataGridState<IHealthItem> {
  currentHealthItem: IHealthItem | undefined;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentHealthItem: undefined,
  loading: true,
};

export const healthItemsFeature = createFeature({
  name: HEALTH_ITEMS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(healthItemActionTypes.loadHealthItemsRequest,
      (state, { payload }): State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      })),
    on(healthItemActionTypes.loadHealthItemsSuccess,
      healthItemActionTypes.reloadHealthItemsSuccess,
      (state, { payload }): State => ({
        ...state,
        loading: false,
        gridPagerSettings: getODataPagerSettings({
          gridData: payload,
          gridODataState: state.gridODataState,
        }),
        gridData: payload,
        error: null,
      })),
    on(healthItemActionTypes.setCurrentHealthItem,
      (state, { payload }): State =>
        ({ ...state, currentHealthItem: payload })),
    on(healthItemActionTypes.clearCurrentHealthItem,
      (state): State => ({ ...state, currentHealthItem: undefined })),
    on(healthItemActionTypes.saveHealthItemRequest,
      healthItemActionTypes.updateHealthItemRequest,
      healthItemActionTypes.deleteHealthItemRequest,
      (state): State => ({
        ...state,
        loading: true,
      })),
    on(imngEffectError, imngEffectErrorReducer),
  )
});
