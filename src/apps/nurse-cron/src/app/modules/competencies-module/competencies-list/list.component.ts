import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { faPlusCircle, faCheck, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

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
    { field: CompetencyProperties.ID, dir: 'asc' },
  ],
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
  public readonly faPlusCircle = faPlusCircle;
  public readonly faCheck = faCheck;
  public readonly faEdit = faEdit;
  public readonly faTrash = faTrash;

  constructor(facade: CompetencyListFacade, public readonly crudFacade: CompetencyCrudFacade) {
    super(facade, initialGridState);
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
