import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataBasedComponent } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { HealthItemListFacade } from './list.facade';
import { HealthItemCrudFacade } from '../health-items-crud';
import { HealthItemProperties, IHealthItem } from '../../../models/health-items-odata';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    HealthItemProperties.ID,
    HealthItemProperties.NAME,
    HealthItemProperties.IS_ENABLED,
  ],
  sort: [
    { field: HealthItemProperties.NAME, dir: 'asc' },
  ],
};

@Component({
  selector: 'nrcrn-health-item-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HealthItemListComponent extends KendoODataBasedComponent<IHealthItem, HealthItemListFacade> {
  public readonly props = HealthItemProperties;
  public currentItem: IHealthItem | undefined;

  constructor(facade: HealthItemListFacade,
    public readonly crudFacade: HealthItemCrudFacade,
    router: Router) {
    super(facade, initialGridState, router);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: IHealthItem): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: IHealthItem): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
