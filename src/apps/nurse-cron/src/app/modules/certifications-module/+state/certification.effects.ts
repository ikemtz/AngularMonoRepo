import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { environment } from '@env';

import * as fromCertificationsReducer from './certification.reducer';
import * as certificationActionTypes from './certification.actions';

import { CertificationApiService } from '../certifications-crud';
import { ICertification } from '../../../models/certifications-odata';


@Injectable()
export class CertificationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly store$: Store<fromCertificationsReducer.CertificationsPartialState>,
    private readonly certificationApiService: CertificationApiService,
  ) { }

  loadCertificationsEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(certificationActionTypes.loadCertificationsRequest),
      fetch({
        run: (action: ReturnType<typeof certificationActionTypes.loadCertificationsRequest>, state: fromCertificationsReducer.CertificationsPartialState) =>
          this.odataservice
            .fetch<ICertification>(environment.endPoints.certifications.certificationsOData, action.payload)
            .pipe(map(t => certificationActionTypes.loadCertificationsSuccess(t))),
        onError: this.exceptionHandler,
      }),
    ),
  );

  saveCertificationEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(certificationActionTypes.saveCertificationRequest),
      fetch({
        run: (action: ReturnType<typeof certificationActionTypes.saveCertificationRequest>) =>
          this.certificationApiService.post(action.payload).pipe(
            withLatestFrom(this.store$),
            map(([_, store]) =>
              certificationActionTypes.loadCertificationsRequest(store[fromCertificationsReducer.CERTIFICATIONS_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  updateCertificationEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(certificationActionTypes.updateCertificationRequest),
      fetch({
        run: (action: ReturnType<typeof certificationActionTypes.updateCertificationRequest>, state: fromCertificationsReducer.CertificationsPartialState) =>
          this.certificationApiService.put(action.payload).pipe(
            withLatestFrom(this.store$),
            map(([_, store]) =>
              certificationActionTypes.loadCertificationsRequest(store[fromCertificationsReducer.CERTIFICATIONS_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  deleteCertificationEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(certificationActionTypes.deleteCertificationRequest),
      fetch({
        run: (action: ReturnType<typeof certificationActionTypes.deleteCertificationRequest>) =>
          this.certificationApiService.delete(action.payload).pipe(
            withLatestFrom(this.store$),
            map(([_, store]) =>
              certificationActionTypes.loadCertificationsRequest(store[fromCertificationsReducer.CERTIFICATIONS_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  // tslint:disable-next-line: typedef
  private exceptionHandler(action, error) {
    console.error('Error', error); // NOSONAR
    return certificationActionTypes.certificationsFailure({ error });
  }
}
