import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { faPlusCircle, faCheck, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

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
    UnitProperties.DEL,
    UnitProperties.ROOM_COUNT,
    UnitProperties.DELETED_BY,
    UnitProperties.DELETED_ON_UTC,
    UnitProperties.BUILDING,
  ],
  sort: [
    { field: UnitProperties.ID, dir: 'asc' },
  ],
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
  public readonly faPlusCircle = faPlusCircle;
  public readonly faCheck = faCheck;
  public readonly faEdit = faEdit;
  public readonly faTrash = faTrash;

  constructor(facade: UnitListFacade, public readonly crudFacade: UnitCrudFacade) {
    super(facade, initialGridState);
  }

  public addItem() {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: IUnit) {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: IUnit) {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent) {
    this.currentItem = evt.dataItem;
  }
}
