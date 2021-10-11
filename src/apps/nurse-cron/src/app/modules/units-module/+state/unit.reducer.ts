import { createReducer, on, Action } from '@ngrx/store';
import { createKendoODataGridInitialState, getODataPagerSettings, KendoODataGridState } from 'imng-kendo-grid-odata';

import * as unitActionTypes from './unit.actions';
import { IUnit } from '../../../models/units-odata';
export const UNITS_FEATURE_KEY = 'units';

export interface State extends KendoODataGridState<IUnit> {
  currentUnit?: IUnit;
}

export interface UnitsPartialState {
  readonly [UNITS_FEATURE_KEY]: State;
}

export const initialState: State = {
  ...createKendoODataGridInitialState(),
  loading: false,
};

const unitsReducer = createReducer(
  initialState,
  on(unitActionTypes.unitsFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
  })),

  on(unitActionTypes.loadUnitsRequest, (state, { payload }) => ({
    ...state,
    gridODataState: payload,
    loading: true,
    error: null,
  })),
  on(unitActionTypes.reloadUnitsSuccess, unitActionTypes.loadUnitsSuccess, (state, { payload }) => ({
    ...state,
    loading: false,
    gridPagerSettings: getODataPagerSettings({
      gridData: payload,
      gridODataState: state.gridODataState,
    }),
    gridData: payload,
    error: null,
  })),

  on(unitActionTypes.setCurrentUnit, (state, { payload }) => ({ ...state, currentUnit: payload })),
  on(unitActionTypes.clearCurrentUnit, (state) => ({ ...state, currentUnit: null })),
  on(
    unitActionTypes.saveUnitRequest,
    unitActionTypes.updateUnitRequest,
    unitActionTypes.deleteUnitRequest,
    (state) => ({
      ...state,
      loading: true,
    }),
  ),
);

export function reducer(state: State | undefined, action: Action): State {
  return unitsReducer(state, action);
}
