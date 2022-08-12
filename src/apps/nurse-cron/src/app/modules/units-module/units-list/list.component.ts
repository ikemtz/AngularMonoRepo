import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataBasedComponent } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { UnitListFacade } from './list.facade';
import { UnitCrudFacade } from '../units-crud';
import { UnitProperties, BuildingProperties, IUnit } from '../../../models/units-odata';

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
  sort: [
    { field: UnitProperties.BUILDING_ID, dir: 'asc' },
  ],
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
      ]
    },
  ]
};

@Component({
  selector: 'nrcrn-unit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent extends KendoODataBasedComponent<IUnit, UnitListFacade> {
  public readonly props = UnitProperties;
  public readonly buildingProps = BuildingProperties;
  public currentItem: IUnit | undefined;

  constructor(facade: UnitListFacade,
    public readonly crudFacade: UnitCrudFacade,
    router: Router) {
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
