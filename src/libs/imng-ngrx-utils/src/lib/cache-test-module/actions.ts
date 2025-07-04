import { createAction } from '@ngrx/store';
import { createPayloadAction } from '../create-payload-action';
import { DataRecord } from './data-record';

export const loadRecordsRequest = createAction(
  '[cacheTestModule] Load Records Request',
);
export const loadRecordsSuccess = createPayloadAction<DataRecord[]>(
  '[cacheTestModule] Load Records Success',
);
