import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { IUnit } from '../../../models/units-odata';

export const unitsFailure = createPayloadAction<{ error: unknown; }>('[Units] Units Failure');

export const loadUnitsRequest = createPayloadAction<ODataState>(
    '[Units] Load Units Request');
export const loadUnitsSuccess = createPayloadAction<ODataResult<IUnit>>(
    '[Units] Load Units Success',
);

export const clearCurrentUnit = createAction('[Units] Clear Current Unit');
export const setCurrentUnit = createPayloadAction<IUnit>('[Units] Set Current Unit');
export const saveUnitRequest = createPayloadAction<IUnit>('[Units] Save Unit Request');
export const updateUnitRequest = createPayloadAction<IUnit>('[Units] Update Unit Request');
export const deleteUnitRequest = createPayloadAction<IUnit>('[Units] Delete Unit Request'); 
