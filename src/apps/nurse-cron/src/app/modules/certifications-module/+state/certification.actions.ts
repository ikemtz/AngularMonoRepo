import { createAction } from '@ngrx/store';
import { ODataResult, ODataState } from 'imng-kendo-odata';
import { createPayloadAction } from 'imng-ngrx-utils';
import { ICertification } from '../../../models/certifications-odata';

export const certificationsFailure = createPayloadAction<{ error: unknown }>('[Certifications] Certifications Failure'); //NOSONAR

export const loadCertificationsRequest = createPayloadAction<ODataState>(
  '[Certifications] Load Certifications Request',
);
export const loadCertificationsSuccess = createPayloadAction<ODataResult<ICertification>>(
  '[Certifications] Load Certifications Success',
);
export const reloadCertificationsRequest = createAction('[Certifications] Reload Certifications Request');
export const reloadCertificationsSuccess = createPayloadAction<ODataResult<ICertification>>(
  '[Certifications] Reload Certifications Success',
);

export const clearCurrentCertification = createAction('[Certifications] Clear Current Certification');
export const setCurrentCertification = createPayloadAction<ICertification>(
  '[Certifications] Set Current Certification',
);
export const saveCertificationRequest = createPayloadAction<ICertification>(
  '[Certifications] Save Certification Request',
);
export const updateCertificationRequest = createPayloadAction<ICertification>(
  '[Certifications] Update Certification Request',
);
export const deleteCertificationRequest = createPayloadAction<ICertification>(
  '[Certifications] Delete Certification Request',
);
