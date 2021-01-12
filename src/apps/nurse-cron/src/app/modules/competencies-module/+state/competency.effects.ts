import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { ODataService } from 'imng-kendo-odata';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { environment } from '@env';

import * as fromCompetenciesReducer from './competency.reducer';
import * as competencyActionTypes from './competency.actions';

import { CompetencyApiService } from '../competencies-crud';
import { ICompetency } from '../../../models/competencies-odata';

@Injectable()
export class CompetencyEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly odataservice: ODataService,
    private readonly store$: Store<fromCompetenciesReducer.CompetenciesPartialState>,
    private readonly competencyApiService: CompetencyApiService,
  ) { }

  loadCompetenciesEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(competencyActionTypes.loadCompetenciesRequest),
      fetch({
        run: (action: ReturnType<typeof competencyActionTypes.loadCompetenciesRequest>) =>
          this.odataservice
            .fetch<ICompetency>(environment.endPoints.competencies.competenciesOData, action.payload)
            .pipe(map(t => competencyActionTypes.loadCompetenciesSuccess(t))),
        onError: this.exceptionHandler,
      }),
    ),
  );

  saveCompetencyEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(competencyActionTypes.saveCompetencyRequest),
      fetch({
        run: (action: ReturnType<typeof competencyActionTypes.saveCompetencyRequest>,
          state: fromCompetenciesReducer.CompetenciesPartialState) =>
          this.competencyApiService.post(action.payload).pipe(
            map(() =>
              competencyActionTypes.loadCompetenciesRequest(state[fromCompetenciesReducer.COMPETENCIES_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  updateCompetencyEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(competencyActionTypes.updateCompetencyRequest),
      fetch({
        run: (action: ReturnType<typeof competencyActionTypes.updateCompetencyRequest>,
          state: fromCompetenciesReducer.CompetenciesPartialState) =>
          this.competencyApiService.put(action.payload).pipe(
            map(() =>
              competencyActionTypes.loadCompetenciesRequest(state[fromCompetenciesReducer.COMPETENCIES_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  deleteCompetencyEffect$ = createEffect(() =>
    this.actions$.pipe(
      ofType(competencyActionTypes.deleteCompetencyRequest),
      fetch({
        run: (action: ReturnType<typeof competencyActionTypes.deleteCompetencyRequest>,
          state: fromCompetenciesReducer.CompetenciesPartialState) =>
          this.competencyApiService.delete(action.payload).pipe(
            map(() =>
              competencyActionTypes.loadCompetenciesRequest(state[fromCompetenciesReducer.COMPETENCIES_FEATURE_KEY].gridODataState),
            ),
          ),
        onError: this.exceptionHandler,
      }),
    ),
  );

  // tslint:disable-next-line: typedef
  private exceptionHandler(action, error) {
    console.error('Error', error); // NOSONAR
    return competencyActionTypes.competenciesFailure({ error });
  }
}
