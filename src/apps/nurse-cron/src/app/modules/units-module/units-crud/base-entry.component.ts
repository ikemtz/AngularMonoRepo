import { OnInit, Component } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { UnitProperties, BuildingProperties, IBuilding, UnitFormGroupFac } from '../../../models/units-odata';

import { UnitCrudFacade } from './crud.facade';

@Component({ template: '' })
export abstract class UnitBaseEntryComponent extends BaseDataEntryComponent<UnitCrudFacade>
  implements OnInit {
  public readonly props = UnitProperties;
  public readonly buildingProps = BuildingProperties;
  public readonly buildings$: Observable<IBuilding[]>;
  public readonly buildingFilter$ = new BehaviorSubject('');

  constructor(facade: UnitCrudFacade) {
    super(facade);
    this.buildings$ = facade.buildings$.pipe(
      switchMap(buildings => this.buildingFilter$.pipe(
        map(buildingFilter => buildingFilter ? buildings
          .filter(building => (
            (building.name && building.name.toLowerCase().indexOf(buildingFilter) >= 0) ||
            (building.siteName && building.siteName.toLowerCase().indexOf(buildingFilter) >= 0) ||
            (building.addressLine1 && building.addressLine1.toLowerCase().indexOf(buildingFilter) >= 0) ||
            (building.addressLine2 && building.addressLine2.toLowerCase().indexOf(buildingFilter) >= 0) ||
            (building.cityOrMunicipality && building.cityOrMunicipality.toLowerCase().indexOf(buildingFilter) >= 0) ||
            (building.stateOrProvidence && building.stateOrProvidence.toLowerCase().indexOf(buildingFilter) >= 0) ||
            (building.postalCode && building.postalCode.toLowerCase().indexOf(buildingFilter) >= 0) ||
            (building.country && building.country.toLowerCase().indexOf(buildingFilter) >= 0) ||
            (building.gpsData && building.gpsData.toString().toLowerCase().indexOf(buildingFilter) >= 0) ||
            (building.deletedBy && building.deletedBy.toLowerCase().indexOf(buildingFilter) >= 0) ||
            (building.deletedOnUtc && building.deletedOnUtc.toString().toLowerCase().indexOf(buildingFilter) >= 0)
          )) : buildings
        ))));
  }

  public ngOnInit(): void {
    this.initForm();
    this.facade.loadBuildings({
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
        BuildingProperties.DELETED_ON_UTC,]
    });
  }

  public initForm(): void {
    this.addEditForm = UnitFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }

  public handleBuildingFilter(value: string) {
    this.buildingFilter$.next(value.toLowerCase());
  }
}
