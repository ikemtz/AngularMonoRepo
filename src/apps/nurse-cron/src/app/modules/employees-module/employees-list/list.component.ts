import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataBasedComponent } from 'imng-kendo-grid-odata';
import { ModalStates } from 'imng-kendo-data-entry';

import { EmployeeListFacade } from './list.facade';
import { EmployeeCrudFacade } from '../employees-crud';
import { employeeGridState } from './list.grid-state';
import { IEmployee, EmployeeProperties } from '../../../models/employees-api';

@Component({
  selector: 'nrcrn-employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class EmployeeListComponent extends KendoODataBasedComponent<
  IEmployee,
  EmployeeListFacade
> {
  public readonly crudFacade = inject(EmployeeCrudFacade);
  public readonly props = EmployeeProperties;
  public currentItem: IEmployee | undefined;

  constructor() {
    super(inject(EmployeeListFacade), employeeGridState, inject(Router));
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({}, ModalStates.ADD);
  }

  public editItem(item: IEmployee): void {
    this.crudFacade.setCurrentEntity(item, ModalStates.EDIT);
  }

  public deleteItem(item: IEmployee): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
