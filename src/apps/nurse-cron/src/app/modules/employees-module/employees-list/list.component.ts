import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { faPlusCircle, faCheck, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

import { EmployeeListFacade } from './list.facade';
import { EmployeeCrudFacade } from '../employees-crud';
import { EmployeeProperties, IEmployee } from '../../../models/employees-odata';
import { Router } from '@angular/router';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    EmployeeProperties.ID,
    EmployeeProperties.LAST_NAME,
    EmployeeProperties.FIRST_NAME,
    EmployeeProperties.BIRTH_DATE,
    EmployeeProperties.MOBILE_PHONE,
    EmployeeProperties.HOME_PHONE,
    EmployeeProperties.PHOTO,
    EmployeeProperties.EMAIL,
    EmployeeProperties.ADDRESS_LINE_1,
    EmployeeProperties.ADDRESS_LINE_2,
    EmployeeProperties.CITY,
    EmployeeProperties.STATE,
    EmployeeProperties.ZIP,
    EmployeeProperties.IS_ENABLED,
    EmployeeProperties.HIRE_DATE,
    EmployeeProperties.FIRE_DATE,
    EmployeeProperties.TOTAL_HOURS_OF_SERVICE,
    EmployeeProperties.CERTIFICATION_COUNT,
    EmployeeProperties.COMPETENCY_COUNT,
    EmployeeProperties.HEALTH_ITEM_COUNT,
  ],
  sort: [
    { field: EmployeeProperties.ID, dir: 'asc' },
  ],
};

@Component({
  selector: 'nrcrn-employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeListComponent extends KendoODataComponentBase<IEmployee, EmployeeListFacade> {
  public readonly props = EmployeeProperties;
  public currentItem: IEmployee;
  public readonly faPlusCircle = faPlusCircle;
  public readonly faCheck = faCheck;
  public readonly faEdit = faEdit;
  public readonly faTrash = faTrash;

  constructor(facade: EmployeeListFacade, public readonly crudFacade: EmployeeCrudFacade, router: Router) {
    super(facade, initialGridState, router);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: IEmployee): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: IEmployee): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
