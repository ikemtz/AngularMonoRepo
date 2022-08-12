import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { imngEffectError, imngEffectErrorReducer } from 'imng-ngrx-utils';
import { IBuilding } from '../../../models/units-odata';

import * as buildingActionTypes from './building.actions';
export const BUILDINGS_FEATURE_KEY = 'buildings';

export interface State extends KendoODataGridState<IBuilding> {
  currentBuilding: IBuilding | undefined;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentBuilding: undefined,
  loading: true,
};

export const buildingsFeature = createFeature({
  name: BUILDINGS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(buildingActionTypes.loadBuildingsRequest,
      (state, { payload }): State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      })),
    on(buildingActionTypes.loadBuildingsSuccess,
      buildingActionTypes.reloadBuildingsSuccess,
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
    on(buildingActionTypes.setCurrentBuilding,
      (state, { payload }): State =>
        ({ ...state, currentBuilding: payload })),
    on(buildingActionTypes.clearCurrentBuilding,
      (state): State => ({ ...state, currentBuilding: undefined })),
    on(buildingActionTypes.saveBuildingRequest,
      buildingActionTypes.updateBuildingRequest,
      buildingActionTypes.deleteBuildingRequest,
      (state): State => ({
        ...state,
        loading: true,
      })),
    on(imngEffectError, imngEffectErrorReducer),
  )
});
