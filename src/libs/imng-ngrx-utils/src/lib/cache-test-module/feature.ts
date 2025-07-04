import { createFeature, createReducer, on } from '@ngrx/store';
import { DataRecord } from './data-record';
import * as actionTypes from './actions';
export interface State {
  records: DataRecord[] | undefined;
}

export const initialState: State = {
  records: undefined,
};

export const feature = createFeature({
  name: 'cacheTestModule',
  reducer: createReducer(
    initialState,
    on(
      actionTypes.loadRecordsSuccess,
      (state, { payload }): State => ({
        ...state,
        records: payload,
      }),
    ),
  ),
});
