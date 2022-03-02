import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';

import { BuildingListFacade } from './list.facade';
import { BuildingCrudFacade } from '../buildings-crud';
import { BuildingProperties, IBuilding } from '../../../models/units-odata';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
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
  sort: [{ field: BuildingProperties.ID, dir: 'asc' }],
};

@Component({
  selector: 'nrcrn-building-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BuildingListComponent extends KendoODataComponentBase<IBuilding, BuildingListFacade> {
  public readonly props = BuildingProperties;
  public currentItem: IBuilding;

  constructor(facade: BuildingListFacade, public readonly crudFacade: BuildingCrudFacade) {
    super(facade, initialGridState);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: IBuilding): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: IBuilding): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
