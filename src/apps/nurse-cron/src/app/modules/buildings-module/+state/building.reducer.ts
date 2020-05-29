import { createReducer, on, Action } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';

import * as buildingActionTypes from './building.actions';
import { IBuilding } from '../../../models/units-odata';
export const BUILDINGS_FEATURE_KEY = 'buildings';

export interface State extends KendoODataGridState<IBuilding> {
  currentBuilding?: IBuilding;
}

export interface BuildingsPartialState {
  readonly [BUILDINGS_FEATURE_KEY]: State;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  loading: false,
};

const buildingsReducer = createReducer(
  initialState,
  on(buildingActionTypes.buildingsFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
  })),

  on(buildingActionTypes.loadBuildingsRequest, (state, { payload }) => ({
    ...state,
    gridODataState: payload,
    loading: true,
    error: null,
  })),
  on(buildingActionTypes.loadBuildingsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    gridPagerSettings: getODataPagerSettings({
      gridData: payload,
      gridODataState: state.gridODataState,
    }),
    gridData: payload,
    error: null,
  })),

  on(buildingActionTypes.setCurrentBuilding, (state, { payload }) => ({ ...state, currentBuilding: payload })),
  on(buildingActionTypes.clearCurrentBuilding, state => ({ ...state, currentBuilding: null })),
  on(
    buildingActionTypes.saveBuildingRequest,
    buildingActionTypes.updateBuildingRequest,
    buildingActionTypes.deleteBuildingRequest,
    state => ({
      ...state,
      loading: true,
    }),
  ),


);

export function reducer(state: State | undefined, action: Action) {
  return buildingsReducer(state, action);
}
