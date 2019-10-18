import { createAction, props } from '@ngrx/store';
import { ODataState, ODataResult } from 'imng-kendo-odata';
import { Payload } from 'imng-ngrx-utils';
import { IEmployee } from '../../models/emp-api';

export const loadNursesRequest = createAction('[Nurses] Load Nurses Request', props<Payload<ODataState>>());
export const loadNursesSuccess = createAction('[Nurses] Load Nurses Success', props<Payload<ODataResult<IEmployee>>>());
export const loadNursesFailure = createAction('[Nurses] Load Nurses Failure', props<Payload<{ error: any }>>());

export const clearCurrentNurseItem = createAction('[Nurses] Clear Current Nurse');
export const setCurrentNurseItem = createAction('[Nurses] Set Current Nurse', props<Payload<IEmployee>>());
export const saveNurseRequest = createAction('[Nurses] Save Nurse Request', props<Payload<IEmployee>>());
export const updateNurseRequest = createAction('[Nurses] Update Nurse Request', props<Payload<IEmployee>>());
