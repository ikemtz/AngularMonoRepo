import { createAction, props } from '@ngrx/store';
import { ODataState, ODataResult } from 'imng-kendo-odata';
import { Payload } from 'imng-ngrx-utils';
import { IEmployee, IEmployeeCertification } from '../../models/emp-api';

export const loadNursesRequest = createAction('[Nurses] Load Nurses Request', props<Payload<ODataState>>());
export const loadNursesSuccess = createAction('[Nurses] Load Nurses Success', props<Payload<ODataResult<IEmployee>>>());
export const loadNursesFailure = createAction('[Nurses] Load Nurses Failure', props<Payload<{ error: any }>>());

export const clearCurrentNurseItem = createAction('[Nurses] Clear Current Nurse');
export const setCurrentNurseItem = createAction('[Nurses] Set Current Nurse', props<Payload<IEmployee>>());
export const saveNurseRequest = createAction('[Nurses] Save Nurse Request', props<Payload<IEmployee>>());
export const updateNurseRequest = createAction('[Nurses] Update Nurse Request', props<Payload<IEmployee>>());
export const deleteNurseRequest = createAction('[Nurses] Delete Nurse Request', props<Payload<IEmployee>>());

export const clearCurrentNurseCertificationItem = createAction('[Nurses] Clear Current NurseCertification');
export const setCurrentNurseCertificationItem = createAction(
  '[Nurses] Set Current NurseCertification',
  props<Payload<{ nurse: IEmployee; certification: IEmployeeCertification }>>(),
);
export const saveNurseCertificationRequest = createAction(
  '[Nurses] Save NurseCertification Request',
  props<Payload<IEmployeeCertification>>(),
);
export const updateNurseCertificationRequest = createAction(
  '[Nurses] Update NurseCertification Request',
  props<Payload<IEmployeeCertification>>(),
);
export const deleteNurseCertificationRequest = createAction(
  '[Nurses] Delete NurseCertification Request',
  props<Payload<IEmployeeCertification>>(),
);
