import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { DetailExpandEvent, KENDO_GRID } from '@progress/kendo-angular-grid';
import { KENDO_MENU } from '@progress/kendo-angular-menu';
import { KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { IMNG_KENDO_COPY, IMNG_KENDO_GRID_HEADER } from 'imng-kendo-grid';
import { IMNG_KENDO_GRID_UUID_FILTER } from 'imng-kendo-grid-filtering';
import {
  IMNG_KENDO_GRID_ODATA,
  KendoODataBasedComponent,
} from 'imng-kendo-grid-odata';
import { IMNG_KENDO_DELETE_DIALOG, ModalStates } from 'imng-kendo-data-entry';

import {
  CustomerListFacade,
  CustomerCrudFacade,
} from '../customers-ngrx-module';
import { customerGridState } from './list.grid-state';
import {
  ICustomer,
  CustomerProperties,
  SalesAgentProperties,
} from '../../models/webapi';
import { CustomerEditComponent } from '../customers-crud/edit.component';
import { CustomerAddComponent } from '../customers-crud/add.component';

@Component({
  selector: 'aw-customer-list',
  imports: [
    SlicePipe,
    AsyncPipe,
    KENDO_GRID,
    KENDO_MENU,
    KENDO_SVGICON,
    IMNG_KENDO_GRID_HEADER,
    IMNG_KENDO_GRID_ODATA,
    IMNG_KENDO_GRID_UUID_FILTER,
    IMNG_KENDO_COPY,
    IMNG_KENDO_DELETE_DIALOG,
    CustomerEditComponent,
    CustomerAddComponent,
  ],
  providers: [CustomerCrudFacade, CustomerListFacade],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerListComponent extends KendoODataBasedComponent<
  ICustomer,
  CustomerListFacade
> {
  public readonly crudFacade = inject(CustomerCrudFacade);
  public readonly props = CustomerProperties;
  public readonly salesAgentProps = SalesAgentProperties;
  public currentItem: ICustomer | undefined;
  public readonly modalStates = ModalStates;

  constructor() {
    super(inject(CustomerListFacade), customerGridState, inject(Router));
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({}, ModalStates.ADD);
  }

  public editItem(item: ICustomer): void {
    this.crudFacade.setCurrentEntity(item, ModalStates.EDIT);
  }

  public deleteItem(item: ICustomer): void {
    this.crudFacade.setCurrentEntity(item, ModalStates.DELETE);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
