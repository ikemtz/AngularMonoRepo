import {  employeesActions } from './employees.actions';
import { IEmployeeCertification, IEmployee } from '../../models/emp-odata';
import { KendoODataState } from '@imko/kendo-grid-odata';
import { on, createReducer, Action } from '@ngrx/store';

export const EMPLOYEES_FEATURE_KEY = 'employees';

export interface EmployeesState extends KendoODataState<IEmployee> {
  currentCertification?: IEmployeeCertification
}

export interface EmployeesPartialState {
  readonly [EMPLOYEES_FEATURE_KEY]: EmployeesState;
}

export const initialState: EmployeesState = {
  dataResult: { data: [], total: 0 },
  loading: true
};

const reducer = createReducer(initialState,
  on(employeesActions.loadEntities, (state, gridODataState) => ({
    ...state, loading: true, gridODataState
  })),
  on(employeesActions.entitiesLoaded, (state, dataResult) => ({
    ...state, loading: false, dataResult
  })),

  on(employeesActions.addEditEntity, (state, currentEntity) => ({
    ...state, loading: false, currentEntity
  })),
  on(employeesActions.clearCurrentEntity, (state) => ({
    ...state, loading: false, currentEntity: null
  })),

  on(employeesActions.addEditCertification, (state, payload) => ({
    ...state, loading: false, currentEntity: payload.employee, currentCertification: payload.certification
  })),
  on(employeesActions.clearCurrentCertification, (state) => ({
    ...state, loading: false, currentCertification: null
  })),
);

export function employeesReducer(state: EmployeesState | undefined, action: Action) {
  return reducer(state, action);
}

//    case EmployeesActionTypes.ClearCurrentCertification: {
//  state = {
//    ...state,
//    currentCertification: null
//  };
//  break;
//}
//  }
//return state;
//}