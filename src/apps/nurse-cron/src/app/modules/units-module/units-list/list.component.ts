import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';

import { UnitListFacade } from './list.facade';
import { UnitCrudFacade } from '../units-crud';
import { UnitProperties, IUnit } from '../../../models/units-odata';

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
    UnitProperties.BUILDING,
  ],
  sort: [{ field: UnitProperties.ID, dir: 'asc' }],
};

@Component({
  selector: 'nrcrn-unit-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UnitListComponent extends KendoODataComponentBase<IUnit, UnitListFacade> {
  public readonly props = UnitProperties;
  public currentItem: IUnit;

  constructor(facade: UnitListFacade, public readonly crudFacade: UnitCrudFacade) {
    super(facade, initialGridState);
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
