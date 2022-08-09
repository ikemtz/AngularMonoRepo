import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { ICompetency } from '../../../models/competencies-odata';

export const loadCompetenciesRequest = createPayloadAction<ODataState>(
    '[Competencies] Load Competencies Request');
export const loadCompetenciesSuccess = createPayloadAction<ODataResult<ICompetency>>(
    '[Competencies] Load Competencies Success');
export const reloadCompetenciesRequest = createAction(
    '[Competencies] Reload Competencies Request');
export const reloadCompetenciesSuccess = createPayloadAction<ODataResult<ICompetency>>(
    '[Competencies] Reload Competencies Success');

export const clearCurrentCompetency = createAction('[Competencies] Clear Current Competency');
export const setCurrentCompetency = createPayloadAction<ICompetency>('[Competencies] Set Current Competency');
export const saveCompetencyRequest = createPayloadAction<ICompetency>('[Competencies] Save Competency Request');
export const updateCompetencyRequest = createPayloadAction<ICompetency>('[Competencies] Update Competency Request');
export const deleteCompetencyRequest = createPayloadAction<ICompetency>('[Competencies] Delete Competency Request');

