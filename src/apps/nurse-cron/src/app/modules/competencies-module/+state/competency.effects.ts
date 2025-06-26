import { Injectable, inject } from '@angular/core';
import { environment } from '@env*';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { ODataService } from 'imng-kendo-odata';
import { handleEffectError } from 'imng-ngrx-utils';
import { switchMap, map } from 'rxjs';
import { ICompetency } from '../../../models/competencies-odata';
import { CompetencyApiService } from '../competencies-crud';
import * as competencyActionTypes from './competency.actions';
import { competenciesFeature } from './competency.reducer';

@Injectable()
export class CompetencyEffects {
  private readonly actions$ = inject(Actions);
  private readonly odataService = inject(ODataService);
  private readonly store = inject(Store);
  private readonly competencyApiService = inject(CompetencyApiService);


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
