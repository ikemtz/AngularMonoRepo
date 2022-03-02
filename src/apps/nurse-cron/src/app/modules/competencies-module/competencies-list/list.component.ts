import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';

import { CompetencyListFacade } from './list.facade';
import { CompetencyCrudFacade } from '../competencies-crud';
import { CompetencyProperties, ICompetency } from '../../../models/competencies-odata';
import { Router } from '@angular/router';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [CompetencyProperties.ID, CompetencyProperties.NAME, CompetencyProperties.IS_ENABLED],
  sort: [{ field: CompetencyProperties.ID, dir: 'asc' }],
};

@Component({
  selector: 'nrcrn-competency-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetencyListComponent extends KendoODataComponentBase<ICompetency, CompetencyListFacade> {
  public readonly props = CompetencyProperties;
  public currentItem: ICompetency;

  constructor(facade: CompetencyListFacade, public readonly crudFacade: CompetencyCrudFacade, router: Router) {
    super(facade, initialGridState, router);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: ICompetency): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: ICompetency): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
