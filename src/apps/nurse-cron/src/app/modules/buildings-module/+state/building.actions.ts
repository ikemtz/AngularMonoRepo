import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { IBuilding } from '../../../models/units-odata';

export const loadBuildingsRequest = createPayloadAction<ODataState>(
    '[Buildings] Load Buildings Request');
export const loadBuildingsSuccess = createPayloadAction<ODataResult<IBuilding>>(
    '[Buildings] Load Buildings Success');
export const reloadBuildingsRequest = createAction(
    '[Buildings] Reload Buildings Request');
export const reloadBuildingsSuccess = createPayloadAction<ODataResult<IBuilding>>(
    '[Buildings] Reload Buildings Success');

export const clearCurrentBuilding = createAction('[Buildings] Clear Current Building');
export const setCurrentBuilding = createPayloadAction<IBuilding>('[Buildings] Set Current Building');
export const saveBuildingRequest = createPayloadAction<IBuilding>('[Buildings] Save Building Request');
export const updateBuildingRequest = createPayloadAction<IBuilding>('[Buildings] Update Building Request');
export const deleteBuildingRequest = createPayloadAction<IBuilding>('[Buildings] Delete Building Request');

