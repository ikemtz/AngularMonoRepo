import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent, KENDO_GRID } from '@progress/kendo-angular-grid';
import {
  ImngKendoGridODataModule,
  KendoODataBasedComponent,
} from 'imng-kendo-grid-odata';

import { CustomerListFacade } from './list.facade';
import {
  CustomerAddComponent,
  CustomerCrudFacade,
  CustomerEditComponent,
} from '../customers-crud';
import {
  CustomerProperties,
  ICustomer,
  SalesAgentProperties,
} from '../../../models/odata';
import { customerGridState } from './list.grid-state';
import { ImngDataEntryDialogModule, ModalStates } from 'imng-kendo-data-entry';
import { AsyncPipe, SlicePipe } from '@angular/common';
import { KENDO_SVGICON } from '@progress/kendo-angular-icons';
import { KENDO_MENUS } from '@progress/kendo-angular-menu';
import { ImngKendoGridModule } from 'imng-kendo-grid';
import { ImngKendoGridFilteringModule } from 'imng-kendo-grid-filtering';

@Component({
  selector: 'aw-customer-list',
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
    CustomerAddComponent,
    CustomerEditComponent,
  ],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerListComponent extends KendoODataBasedComponent<
  ICustomer,
  CustomerListFacade
> {
  readonly crudFacade = inject(CustomerCrudFacade);

  public readonly props = CustomerProperties;
  public readonly salesAgentProps = SalesAgentProperties;
  public currentItem: ICustomer | undefined;

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
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
