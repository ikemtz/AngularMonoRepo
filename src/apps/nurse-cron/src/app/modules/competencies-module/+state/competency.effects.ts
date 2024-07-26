import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { createEffect, Actions, ofType } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
import { EffectsModule } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
rimport { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
om 'imng-ngrx-utils';
import { map, switchMap } from 'rxjs/operators';

import { competenciesFeature } from './competency.reducer';
import * as competencyActionTypes from './competency.actions';
import { environment } from '../../../../environments/environment';

import { CompetencyApiService } from '../competencies-crud';
import { ICompetencyimport { EffectsModule } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
@Injectable()
export class CompetencyEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataService: ODataService,
    private readonly store: Store,
    private readonly competencyApiService: CompetencyApiService,
  ) {}

  loadCompetenciesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(competencyActionTypes.loadCompetenciesRequest),
      switchMap(
        (
          action: ReturnType<
            typeof competencyActionTypes.loadCompetenciesRequest
          >,
        ) =>
          this.odataService
            .fetch<ICompetency>(
              environment.endPoints.competencies.competenciesOData,
              action.payload,
            )
            .pipe(
              map((t) => competencyActionTypes.loadCompetenciesSuccess(t)),
              handleEffectError(action),
            ),
      ),
    );
  });

  reloadCompetenciesEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(competencyActionTypes.reloadCompetenciesRequest),
      concatLatestFrom(() =>
        this.store.select(competenciesFeature.selectGridODataState),
      ),
      switchMap(([action, odataState]) =>
        this.odataService
          .fetch<ICompetency>(
            environment.endPoints.competencies.competenciesOData,
            odataState,
            {
              bustCache: true,
            },
          )
          .pipe(
            map((t) => competencyActionTypes.reloadCompetenciesSuccess(t)),
            handleEffectError(action),
          ),
      ),
    );
  });

  saveCompetencyEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(competencyActionTypes.saveCompetencyRequest),
      switchMap(
        (
          action: ReturnType<
            typeof competencyActionTypes.saveCompetencyRequest
          >,
        ) =>
          this.competencyApiService.post(action.payload).pipe(
            map(() => competencyActionTypes.reloadCompetenciesRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  updateCompetencyEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(competencyActionTypes.updateCompetencyRequest),
      switchMap(
        (
          action: ReturnType<
            typeof competencyActionTypes.updateCompetencyRequest
          >,
        ) =>
          this.competencyApiService.put(action.payload).pipe(
            map(() => competencyActionTypes.reloadCompetenciesRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });

  deleteCompetencyEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(competencyActionTypes.deleteCompetencyRequest),
      switchMap(
        (
          action: ReturnType<
            typeof competencyActionTypes.deleteCompetencyRequest
          >,
        ) =>
          this.competencyApiService.delete(action.payload).pipe(
            map(() => competencyActionTypes.reloadCompetenciesRequest()),
            handleEffectError(action),
          ),
      ),
    );
  });
}
