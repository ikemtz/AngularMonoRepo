import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { CompetenciesPartialState } from '../+state/competency.reducer';
import { competencyQueries } from '../+state/competency.selectors';
import * as competencyActionTypes from '../+state/competency.actions';
import { ICompetency } from '../../../models/competencies-odata';

@Injectable()
export class CompetencyCrudFacade implements IDataEntryFacade<ICompetency> {
  loading$ = this.store.pipe(select(competencyQueries.getLoading));
  currentEntity$ = this.store.pipe(select(competencyQueries.getCurrentCompetency));
  isEditActive$ = this.store.pipe(select(competencyQueries.getIsEditCompetencyActive));
  isNewActive$ = this.store.pipe(select(competencyQueries.getIsNewCompetencyActive));

  constructor(private readonly store: Store<CompetenciesPartialState>) { }
  setCurrentEntity(item: ICompetency): void {
    this.store.dispatch(competencyActionTypes.setCurrentCompetency(item));
  }
  clearCurrentEntity(): void {
    this.store.dispatch(competencyActionTypes.clearCurrentCompetency());
  }
  saveNewEntity(item: ICompetency): void {
    this.store.dispatch(competencyActionTypes.saveCompetencyRequest(item));
  }
  updateExistingEntity(item: ICompetency): void {
    this.store.dispatch(competencyActionTypes.updateCompetencyRequest(item));
  }
}
