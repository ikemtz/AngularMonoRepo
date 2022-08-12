import { createReducer, on, createFeature } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';
import { imngEffectError, imngEffectErrorReducer } from 'imng-ngrx-utils';
import { IUnit, IBuilding } from '../../../models/units-odata';

import * as unitActionTypes from './unit.actions';
export const UNITS_FEATURE_KEY = 'units';

export interface State extends KendoODataGridState<IUnit> {
  currentUnit: IUnit | undefined;
  buildings: IBuilding[];
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  currentUnit: undefined,
  buildings: [],
  loading: true,
};

export const unitsFeature = createFeature({
  name: UNITS_FEATURE_KEY,
  reducer: createReducer(
    initialState,
    on(unitActionTypes.loadUnitsRequest,
      (state, { payload }): State => ({
        ...state,
        gridODataState: payload,
        loading: true,
        error: null,
      })),
    on(unitActionTypes.loadUnitsSuccess,
      unitActionTypes.reloadUnitsSuccess,
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
    on(unitActionTypes.setCurrentUnit,
      (state, { payload }): State =>
        ({ ...state, currentUnit: payload })),
    on(unitActionTypes.clearCurrentUnit,
      (state): State => ({ ...state, currentUnit: undefined })),
    on(unitActionTypes.saveUnitRequest,
      unitActionTypes.updateUnitRequest,
      unitActionTypes.deleteUnitRequest,
      (state): State => ({
        ...state,
        loading: true,
      })),
    on(unitActionTypes.loadBuildingsSuccess,
      (state, { payload }): State => ({
        ...state,
        buildings: payload.data
      })),
    on(imngEffectError, imngEffectErrorReducer),
  )
});
