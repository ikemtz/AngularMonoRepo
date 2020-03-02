import { createAction } from '@ngrx/store';
import { createPayloadAction } from 'imng-ngrx-utils';
import { IEmployee, IEmployeeCertification } from '../../models/emp-api';
import {} from 'imng-kendo-grid-odata';
import { ODataState, ODataResult } from 'imng-kendo-odata';
export const loadNursesRequest = createPayloadAction<ODataState>('[Nurses] Load Nurses Request');
export const loadNursesSuccess = createPayloadAction<ODataResult<IEmployee>>('[Nurses] Load Nurses Success');
export const loadNursesFailure = createPayloadAction<{ error: any }>('[Nurses] Load Nurses Failure');

export const clearCurrentNurseItem = createAction('[Nurses] Clear Current Nurse');
export const setCurrentNurseItem = createPayloadAction<IEmployee>('[Nurses] Set Current Nurse');
export const saveNurseRequest = createPayloadAction<IEmployee>('[Nurses] Save Nurse Request');
export const updateNurseRequest = createPayloadAction<IEmployee>('[Nurses] Update Nurse Request');
export const deleteNurseRequest = createPayloadAction<IEmployee>('[Nurses] Delete Nurse Request');

export const clearCurrentNurseCertificationItem = createAction('[Nurses] Clear Current NurseCertification');
export const setCurrentNurseCertificationItem = createPayloadAction<{
  nurse: IEmployee;
  certification: IEmployeeCertification;
}>('[Nurses] Set Current NurseCertification');
export const saveNurseCertificationRequest = createPayloadAction<IEmployeeCertification>(
  '[Nurses] Save NurseCertification Request',
);
export const updateNurseCertificationRequest = createPayloadAction<IEmployeeCertification>(
  '[Nurses] Update NurseCertification Request',
);
export const deleteNurseCertificationRequest = createPayloadAction<IEmployeeCertification>(
  '[Nurses] Delete NurseCertification Request',
);
