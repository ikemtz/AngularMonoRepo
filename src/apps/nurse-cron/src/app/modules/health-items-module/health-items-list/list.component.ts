import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { faPlusCircle, faCheck, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import { HealthItemListFacade } from './list.facade';
import { HealthItemCrudFacade } from '../health-items-crud';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    HealthItemProperties.ID,
    HealthItemProperties.NAME,
    HealthItemProperties.IS_ENABLED,
  ],
  sort: [
    { field: HealthItemProperties.ID, dir: 'asc' },
  ],
};

@Component({
  selector: 'nrcrn-health-item-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthItemListComponent extends KendoODataComponentBase<IHealthItem, HealthItemListFacade> {
  public readonly props = HealthItemProperties;
  public currentItem: IHealthItem;
  public readonly faPlusCircle = faPlusCircle;
  public readonly faCheck = faCheck;
  public readonly faEdit = faEdit;
  public readonly faTrash = faTrash;  

  constructor(facade: HealthItemListFacade, public readonly crudFacade: HealthItemCrudFacade) {
    super(facade, initialGridState);
  }

  public addItem() {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: IHealthItem) {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: IHealthItem) {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent) {
    this.currentItem = evt.dataItem;
  }
}
