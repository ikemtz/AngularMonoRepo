import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { CompetenciesPartialState } from '../+state/competency.reducer';
import { competencyQueries } from '../+state/competency.selectors';
import * as competencyActionTypes from '../+state/competency.actions';
import { ICompetency } from '../../../models/competencies-odata';

@Injectable()
export class CompetencyListFacade implements IKendoODataGridFacade<ICompetency>, IDataDeleteFacade<ICompetency> {
  loading$ = this.store.pipe(select(competencyQueries.getLoading));
  gridODataState$ = this.store.pipe(select(competencyQueries.getGridODataState));
  gridData$ = this.store.pipe(select(competencyQueries.getCompetencies));
  gridPagerSettings$ = this.store.pipe(select(competencyQueries.getPagerSettings));

  constructor(private readonly store: Store<CompetenciesPartialState>) { }

  loadEntities(state: ODataState): void {
    this.store.dispatch(competencyActionTypes.loadCompetenciesRequest(state));
  }

  deleteExistingEntity(entity: ICompetency): void {
    this.store.dispatch(competencyActionTypes.deleteCompetencyRequest(entity));
  }
}
