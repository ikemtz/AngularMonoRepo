import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';

export const healthItemsFailure = createPayloadAction<{ error: any }>('[HealthItems] HealthItems Failure'); //NOSONAR

export const loadHealthItemsRequest = createPayloadAction<ODataState>(
    '[HealthItems] Load HealthItems Request');
export const loadHealthItemsSuccess = createPayloadAction<ODataResult<IHealthItem>>(
    '[HealthItems] Load HealthItems Success',
);

export const clearCurrentHealthItem = createAction('[HealthItems] Clear Current HealthItem');
export const setCurrentHealthItem = createPayloadAction<IHealthItem>('[HealthItems] Set Current HealthItem');
export const saveHealthItemRequest = createPayloadAction<IHealthItem>('[HealthItems] Save HealthItem Request');
export const updateHealthItemRequest = createPayloadAction<IHealthItem>('[HealthItems] Update HealthItem Request');
export const deleteHealthItemRequest = createPayloadAction<IHealthItem>('[HealthItems] Delete HealthItem Request'); 
