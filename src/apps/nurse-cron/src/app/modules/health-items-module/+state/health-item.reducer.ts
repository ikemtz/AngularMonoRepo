import { createReducer, on, Action } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';

import * as healthItemActionTypes from './health-item.actions';
import { IHealthItem } from '../../../models/health-items-odata';
export const HEALTH_ITEMS_FEATURE_KEY = 'healthItems';

export interface State extends KendoODataGridState<IHealthItem> {
  currentHealthItem?: IHealthItem;
}

export interface HealthItemsPartialState {
  readonly [HEALTH_ITEMS_FEATURE_KEY]: State;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  loading: false,
};

const healthItemsReducer = createReducer(
  initialState,
  on(healthItemActionTypes.healthItemsFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
  })),

  on(healthItemActionTypes.loadHealthItemsRequest, (state, { payload }) => ({
    ...state,
    gridODataState: payload,
    loading: true,
    error: null,
  })),
  on(healthItemActionTypes.loadHealthItemsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    gridPagerSettings: getODataPagerSettings({
      gridData: payload,
      gridODataState: state.gridODataState,
    }),
    gridData: payload,
    error: null,
  })),

  on(healthItemActionTypes.setCurrentHealthItem, (state, { payload }) => ({ ...state, currentHealthItem: payload })),
  on(healthItemActionTypes.clearCurrentHealthItem, state => ({ ...state, currentHealthItem: null })),
  on(
    healthItemActionTypes.saveHealthItemRequest,
    healthItemActionTypes.updateHealthItemRequest,
    healthItemActionTypes.deleteHealthItemRequest,
    state => ({
      ...state,
      loading: true,
    }),
  ),


);

export function reducer(state: State | undefined, action: Action) {
  return healthItemsReducer(state, action);
}
