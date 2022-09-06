import { createAction } from '@ngrx/store';
import { createPayloadAction } from 'imng-ngrx-utils';
import { ODataResult } from 'imng-odata-client';
import { PrimeTableState } from 'imng-prime-table-odata';
import { IOrder } from '../../../models/odata';

export const loadOrdersRequest = createPayloadAction<PrimeTableState>(
  '[Orders] Load Orders Request',
);
export const loadOrdersSuccess = createPayloadAction<ODataResult<IOrder>>(
  '[Orders] Load Orders Success',
);
export const reloadOrdersRequest = createAction(
  '[Orders] Reload Orders Request',
);
export const reloadOrdersSuccess = createPayloadAction<ODataResult<IOrder>>(
  '[Orders] Reload Orders Success',
);
