import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent, KENDO_GRID } from '@progress/kendo-angular-grid';
import {
  ImngKendoGridODataModule,
  KendoODataBasedComponent,
} from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { UnitListFacade } from './list.facade';
import {
  UnitAddComponent,
  UnitCrudFacade,
  UnitEditComponent,
} from '../units-crud';
import {
  UnitProperties,
  BuildingProperties,
  IUnit,
} from '../../../models/units-odata';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';
import { KENDO_MENUS } from '@progress/kendo-angular-menu';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    UnitProperties.ID,
    UnitProperties.BUILDING_ID,
    UnitProperties.NAME,
    UnitProperties.ROOM_COUNT,
    UnitProperties.DELETED_BY,
    UnitProperties.DELETED_ON_UTC,
  ],
  sort: [{ field: UnitProperties.BUILDING_ID, dir: 'asc' }],
  expanders: [
    {
      table: UnitProperties.BUILDING,
      selectors: [
        BuildingProperties.ID,
        BuildingProperties.NAME,
        BuildingProperties.SITE_NAME,
        BuildingProperties.ADDRESS_LINE_1,
        BuildingProperties.ADDRESS_LINE_2,
        BuildingProperties.CITY_OR_MUNICIPALITY,
        BuildingProperties.STATE_OR_PROVIDENCE,
        BuildingProperties.POSTAL_CODE,
        BuildingProperties.COUNTRY,
        BuildingProperties.GPS_DATA,
        BuildingProperties.DELETED_BY,
        BuildingProperties.DELETED_ON_UTC,
      ],
    },
  ],
};

@Component({
  selector: 'nrcrn-unit-list',
  imports: [
    AsyncPipe,
    SlicePipe,
    KENDO_GRID,
    KENDO_MENUS,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ImngKendoGridFilteringModule,
    UnitEditComponent,
    UnitAddComponent,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class UnitListComponent extends KendoODataBasedComponent<
  IUnit,
  UnitListFacade
> {
  readonly crudFacade = inject(UnitCrudFacade);

  public readonly props = UnitProperties;
  public readonly buildingProps = BuildingProperties;
  public currentItem: IUnit | undefined;

  constructor() {
    const facade = inject(UnitListFacade);
    const router = inject(Router);

    super(facade, initialGridState, router);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: IUnit): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: IUnit): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
