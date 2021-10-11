import { Injectable } from '@angular/core';
import { createEffect, Actions } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map } from 'rxjs/operators';
import { environment } from '@env/nurse-cron';

import * as fromCertificationsReducer from './certification.reducer';
import * as certificationActionTypes from './certification.actions';

import { CertificationApiService } from '../certifications-crud';
import { ICertification } from '../../../models/certifications-odata';

@Injectable()
export class CertificationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly certificationApiService: CertificationApiService,
    private readonly dataPersistence: DataPersistence<fromCertificationsReducer.CertificationsPartialState>,
  ) {}

  loadCertificationsEffect$ = createEffect(() =>
    this.dataPersistence.fetch(certificationActionTypes.loadCertificationsRequest, {
      run: (action: ReturnType<typeof certificationActionTypes.loadCertificationsRequest>) =>
        this.odataservice
          .fetch<ICertification>(environment.endPoints.certifications.certificationsOData, action.payload)
          .pipe(map((t) => certificationActionTypes.loadCertificationsSuccess(t))),
      onError: this.exceptionHandler,
    }),
  );

  reloadCertificationsEffect$ = createEffect(() =>
    this.dataPersistence.fetch(certificationActionTypes.reloadCertificationsRequest, {
      run: (
        action: ReturnType<typeof certificationActionTypes.reloadCertificationsRequest>,
        partialState: fromCertificationsReducer.CertificationsPartialState,
      ) =>
        this.odataservice
          .fetch<ICertification>(
            environment.endPoints.certifications.certificationsOData,
            partialState[fromCertificationsReducer.CERTIFICATIONS_FEATURE_KEY].gridODataState,
            { bustCache: true },
          )
          .pipe(map((t) => certificationActionTypes.loadCertificationsSuccess(t))),
      onError: this.exceptionHandler,
    }),
  );

  saveCertificationEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(certificationActionTypes.saveCertificationRequest, {
      run: (
        action: ReturnType<typeof certificationActionTypes.saveCertificationRequest>,
        state: fromCertificationsReducer.CertificationsPartialState,
      ) =>
        this.certificationApiService
          .post(action.payload)
          .pipe(
            map(() =>
              certificationActionTypes.loadCertificationsRequest(
                state[fromCertificationsReducer.CERTIFICATIONS_FEATURE_KEY].gridODataState,
              ),
            ),
          ),
      onError: this.exceptionHandler,
    }),
  );

  updateCertificationEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(certificationActionTypes.updateCertificationRequest, {
      run: (
        action: ReturnType<typeof certificationActionTypes.updateCertificationRequest>,
        state: fromCertificationsReducer.CertificationsPartialState,
      ) =>
        this.certificationApiService
          .put(action.payload)
          .pipe(
            map(() =>
              certificationActionTypes.loadCertificationsRequest(
                state[fromCertificationsReducer.CERTIFICATIONS_FEATURE_KEY].gridODataState,
              ),
            ),
          ),
      onError: this.exceptionHandler,
    }),
  );

  deleteCertificationEffect$ = createEffect(() =>
    this.dataPersistence.pessimisticUpdate(certificationActionTypes.deleteCertificationRequest, {
      run: (
        action: ReturnType<typeof certificationActionTypes.deleteCertificationRequest>,
        state: fromCertificationsReducer.CertificationsPartialState,
      ) =>
        this.certificationApiService
          .delete(action.payload)
          .pipe(
            map(() =>
              certificationActionTypes.loadCertificationsRequest(
                state[fromCertificationsReducer.CERTIFICATIONS_FEATURE_KEY].gridODataState,
              ),
            ),
          ),
      onError: this.exceptionHandler,
    }),
  );

  // tslint:disable-next-line: typedef
  private exceptionHandler(action, error) {
    console.error('Error', error); // NOSONAR
    return certificationActionTypes.certificationsFailure({ error });
  }
}
