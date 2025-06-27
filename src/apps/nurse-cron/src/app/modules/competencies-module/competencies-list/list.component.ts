import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataBasedComponent } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { CompetencyListFacade } from './list.facade';
import { CompetencyCrudFacade } from '../competencies-crud';
import { CompetencyProperties, ICompetency } from '../../../models/competencies-odata';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    CompetencyProperties.ID,
    CompetencyProperties.NAME,
    CompetencyProperties.IS_ENABLED,
  ],
  sort: [
    { field: CompetencyProperties.NAME, dir: 'asc' },
  ],
};

@Component({
    selector: 'nrcrn-competency-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CompetencyListComponent extends KendoODataBasedComponent<ICompetency, CompetencyListFacade> {
  readonly crudFacade = inject(CompetencyCrudFacade);

  public readonly props = CompetencyProperties;
  public currentItem: ICompetency | undefined;

  constructor() {
    const facade = inject(CompetencyListFacade);
    const router = inject(Router);

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
