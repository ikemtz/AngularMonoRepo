import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataBasedComponent } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

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
  sort: [{ field: BuildingProperties.NAME, dir: 'asc' }],
};

@Component({
  selector: 'nrcrn-building-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class BuildingListComponent extends KendoODataBasedComponent<
  IBuilding,
  BuildingListFacade
> {
  readonly crudFacade = inject(BuildingCrudFacade);

  public readonly props = BuildingProperties;
  public currentItem: IBuilding | undefined;

  constructor() {
    super(inject(BuildingListFacade), initialGridState, inject(Router));
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
