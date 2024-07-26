import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
import { EffectsModule } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
rimport { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
om 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { certificationsFeature } from './certification.reducer';
import * as certificationActionTypes from './certification.actions';
import { environment } from '../../../../environments/environment';

import { CertificationApiService } from '../certifications-crud';
impoimport { EffectsModule } from '@ngrx/effects';eimport { concatLatestFrom } from '@ngrx/operators';
s,
} from '../../../models/certifications-odata';

@Injectable()
export class CertificationEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataService: ODataService,
    private readonly store: Store,
    private readonly certificationApiService: CertificationApiService,
  ) {}

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
