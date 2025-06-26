import { Injectable, inject } from '@angular/core';
import { environment } from '@env*';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { switchMap, map } from 'rxjs';
import {
  ICertification,
  CertificationProperties,
} from '../../../models/certifications-odata';
import { CertificationApiService } from '../certifications-crud';
import * as certificationActionTypes from './certification.actions';
import { certificationsFeature } from './certification.reducer';

@Injectable()
export class CertificationEffects {
  private readonly actions$ = inject(Actions);
  private readonly odataService = inject(ODataService);
  private readonly store = inject(Store);
  private readonly certificationApiService = inject(CertificationApiService);


  loadCertificationsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(certificationActionTypes.loadCertificationsRequest),
      switchMap(
        (
          action: ReturnType<
            typeof certificationActionTypes.loadCertificationsRequest
          >,
        ) =>
          this.odataService
            .fetch<ICertification>(
              environment.endPoints.certifications.certificationsOData,
              action.payload,
              {
                dateNullableProps: [CertificationProperties.EXPIRES_ON_UTC],
              },
            )
            .pipe(
              map((t) => certificationActionTypes.loadCertificationsSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });

  reloadCertificationsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(certificationActionTypes.reloadCertificationsRequest),
      concatLatestFrom(() =>
        this.store.select(certificationsFeature.selectGridODataState),
      ),
      switchMap(([action, odataState]) =>
        this.odataService
          .fetch<ICertification>(
            environment.endPoints.certifications.certificationsOData,
            odataState,
            {
              bustCache: true,
              dateNullableProps: [CertificationProperties.EXPIRES_ON_UTC],
            },
          )
          .pipe(
            map((t) => certificationActionTypes.reloadCertificationsSuccess(t)),
            handleEffectError(action),
          ),
      ),
    );
  });

  saveCertificationEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(certificationActionTypes.saveCertificationRequest),
      switchMap(
        (
          action: ReturnType<
            typeof certificationActionTypes.saveCertificationRequest
          >,
        ) =>
          this.certificationApiService.post(action.payload).pipe(
            map(() => certificationActionTypes.reloadCertificationsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  updateCertificationEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(certificationActionTypes.updateCertificationRequest),
      switchMap(
        (
          action: ReturnType<
            typeof certificationActionTypes.updateCertificationRequest
          >,
        ) =>
          this.certificationApiService.put(action.payload).pipe(
            map(() => certificationActionTypes.reloadCertificationsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  deleteCertificationEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(certificationActionTypes.deleteCertificationRequest),
      switchMap(
        (
          action: ReturnType<
            typeof certificationActionTypes.deleteCertificationRequest
          >,
        ) =>
          this.certificationApiService.delete(action.payload).pipe(
            map(() => certificationActionTypes.reloadCertificationsRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });
}
