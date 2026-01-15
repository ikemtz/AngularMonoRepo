import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent, KENDO_GRID } from '@progress/kendo-angular-grid';
import {
  ImngKendoGridODataModule,
  KendoODataBasedComponent,
} from 'imng-kendo-grid-odata';
import { ImngDataEntryDialogModule, ModalStates } from 'imng-kendo-data-entry';

import { EmployeeListFacade } from './list.facade';
import {
  EmployeeAddComponent,
  EmployeeCrudFacade,
  EmployeeEditComponent,
} from '../employees-crud';
import { employeeGridState } from './list.grid-state';
import { IEmployee, EmployeeProperties } from '../../../models/employees-api';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { KENDO_MENUS } from '@progress/kendo-angular-menu';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';
import { KENDO_SVGICON } from '@progress/kendo-angular-icons';

@Component({
  selector: 'nrcrn-employee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    SlicePipe,
    KENDO_GRID,
    KENDO_MENUS,
    KENDO_SVGICON,
    ImngKendoGridModule,
    ImngKendoGridODataModule,
    ImngKendoGridFilteringModule,
    ImngDataEntryDialogModule,
    EmployeeAddComponent,
    EmployeeEditComponent,
  ],
})
export class EmployeeListComponent extends KendoODataBasedComponent<
  IEmployee,
  EmployeeListFacade
> {
  public readonly crudFacade = inject(EmployeeCrudFacade);
  public readonly props = EmployeeProperties;
  public currentItem: IEmployee | undefined;
  public readonly modalStates = ModalStates;

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
    this.crudFacade.setCurrentEntity(item, ModalStates.DELETE);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
