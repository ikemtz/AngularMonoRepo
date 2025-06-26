import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDataDeleteFacade } from 'imng-kendo-data-entry';
import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { competenciesFeature } from '../+state/competency.reducer';
import * as competencyActionTypes from '../+state/competency.actions';
import { ICompetency } from '../../../models/competencies-odata';

@Injectable()
export class CompetencyListFacade implements IKendoODataGridFacade<ICompetency>, IDataDeleteFacade<ICompetency> {
  private readonly store = inject(Store);

  loading$ = this.store.select(competenciesFeature.selectLoading);
  gridData$ = this.store.select(competenciesFeature.selectGridData);
  gridPagerSettings$ = this.store.select(competenciesFeature.selectGridPagerSettings);
  gridODataState$ = this.store.select(competenciesFeature.selectGridODataState);

  public loadEntities(state: ODataState): void {
    this.store.dispatch(competencyActionTypes.loadCompetenciesRequest(state));
  }

  public reloadEntities(): void {
    this.store.dispatch(competencyActionTypes.reloadCompetenciesRequest());
  }

  public deleteExistingEntity(entity: ICompetency): void {
    this.store.dispatch(competencyActionTypes.deleteCompetencyRequest(entity));
  }
}
