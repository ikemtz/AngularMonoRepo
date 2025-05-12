import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataBasedComponent } from 'imng-kendo-grid-odata';

import { EmployeeListFacade } from './list.facade';
import { EmployeeCrudFacade } from '../employees-crud';
import { employeeGridState } from './list.grid-state';
import { IEmployee, EmployeeProperties } from '../../../models/employees-api';

@Component({
    selector: 'nrcrn-employee-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class EmployeeListComponent extends KendoODataBasedComponent<IEmployee, EmployeeListFacade> {
  public readonly props = EmployeeProperties;
  public currentItem: IEmployee | undefined;

  constructor(facade: EmployeeListFacade,
    public readonly crudFacade: EmployeeCrudFacade,
    router: Router) {
    super(facade, employeeGridState, router);
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
