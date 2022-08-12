import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { IUnit, IBuilding } from '../../../models/units-odata';

export const loadUnitsRequest = createPayloadAction<ODataState>(
    '[Units] Load Units Request');
export const loadUnitsSuccess = createPayloadAction<ODataResult<IUnit>>(
    '[Units] Load Units Success');
export const reloadUnitsRequest = createAction(
    '[Units] Reload Units Request');
export const reloadUnitsSuccess = createPayloadAction<ODataResult<IUnit>>(
    '[Units] Reload Units Success');

export const clearCurrentUnit = createAction('[Units] Clear Current Unit');
export const setCurrentUnit = createPayloadAction<IUnit>('[Units] Set Current Unit');
export const saveUnitRequest = createPayloadAction<IUnit>('[Units] Save Unit Request');
export const updateUnitRequest = createPayloadAction<IUnit>('[Units] Update Unit Request');
export const deleteUnitRequest = createPayloadAction<IUnit>('[Units] Delete Unit Request');

export const loadBuildingsRequest = createPayloadAction<ODataState>(
    '[Units] Load Buildings Request');
export const loadBuildingsSuccess = createPayloadAction<ODataResult<IBuilding>>(
    '[Units] Load Buildings Success');
