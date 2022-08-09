import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataEntryFacade } from 'imng-kendo-data-entry';
import { competenciesFeature } from '../+state/competency.reducer';
import { competencyQueries } from '../+state/competency.selectors';
import * as competencyActionTypes from '../+state/competency.actions';

@Injectable()
export class CompetencyCrudFacade implements IDataEntryFacade<ICompetency> {
  loading$ = this.store.select(competenciesFeature.selectLoading);
  currentEntity$ = this.store.select(competencyQueries.selectCurrentCompetency);
  isEditActive$ = this.store.select(competencyQueries.selectIsEditCompetencyActive);
  isNewActive$ = this.store.select(competencyQueries.selectIsNewCompetencyActive);

  constructor(private readonly store: Store) {}

  public setCurrentEntity(item: ICompetency): void {
    this.store.dispatch(competencyActionTypes.setCurrentCompetency(item));
  }

  public clearCurrentEntity(): void {
    this.store.dispatch(competencyActionTypes.clearCurrentCompetency());
  }

  public saveNewEntity(item: ICompetency): void {
    this.store.dispatch(competencyActionTypes.saveCompetencyRequest(item));
  }

  public updateExistingEntity(item: ICompetency): void {
    this.store.dispatch(competencyActionTypes.updateCompetencyRequest(item));
  }

}
