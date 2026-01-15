import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent, KENDO_GRID } from '@progress/kendo-angular-grid';
import {
  ImngKendoGridODataModule,
  KendoODataBasedComponent,
} from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { HealthItemListFacade } from './list.facade';
import {
  HealthItemAddComponent,
  HealthItemCrudFacade,
  HealthItemEditComponent,
} from '../health-items-crud';
import {
  HealthItemProperties,
  IHealthItem,
} from '../../../models/health-items-odata';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { KENDO_MENUS } from '@progress/kendo-angular-menu';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    HealthItemProperties.ID,
    HealthItemProperties.NAME,
    HealthItemProperties.IS_ENABLED,
  ],
  sort: [{ field: HealthItemProperties.NAME, dir: 'asc' }],
};

@Component({
  selector: 'nrcrn-health-item-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    SlicePipe,
    KENDO_GRID,
    KENDO_MENUS,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ImngKendoGridFilteringModule,
    HealthItemAddComponent,
    HealthItemEditComponent,
  ],
})
export class HealthItemListComponent extends KendoODataBasedComponent<
  IHealthItem,
  HealthItemListFacade
> {
  readonly crudFacade = inject(HealthItemCrudFacade);

  public readonly props = HealthItemProperties;
  public currentItem: IHealthItem | undefined;

  constructor() {
    const facade = inject(HealthItemListFacade);
    const router = inject(Router);

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
