import { EmployeesAction, EmployeesActionTypes } from './employees.actions';
import { IEmployeeCertification, IEmployee } from '../../models/emp-odata';
import { KendoODataState } from '@imko/kendo-grid-odata';

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

export function employeesReducer(state: EmployeesState = initialState, action: EmployeesAction): EmployeesState {
  switch (action.type) {
    case EmployeesActionTypes.LoadEntities: {
      state = {
        ...state,
        gridODataState: action.payload,
        loading: true
      };
      break;
    }
    case EmployeesActionTypes.EntitiesLoaded: {
      state = {
        ...state,
        dataResult: action.payload,
        loading: false
      };
      break;
    }
    case EmployeesActionTypes.AddEditEntity: {
      state = {
        ...state,
        currentEntity: action.payload,
        loading: false
      };
      break;
    }
    case EmployeesActionTypes.ClearCurrentEntity: {
      state = {
        ...state,
        currentEntity: null
      };
      break;
    }
    case EmployeesActionTypes.AddEditCertification: {
      state = {
        ...state,
        currentCertification: action.payload.certification,
        loading: false
      };
      break;
    }
    case EmployeesActionTypes.ClearCurrentCertification: {
      state = {
        ...state,
        currentCertification: null
      };
      break;
    }
  }
  return state;
}