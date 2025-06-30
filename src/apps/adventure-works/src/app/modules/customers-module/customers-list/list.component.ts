import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataBasedComponent } from 'imng-kendo-grid-odata';

import { CustomerListFacade } from './list.facade';
import { CustomerCrudFacade } from '../customers-crud';
import {
  CustomerProperties,
  ICustomer,
  SalesAgentProperties,
} from '../../../models/odata';
import { customerGridState } from './list.grid-state';
import { ModalStates } from 'imng-kendo-data-entry';

@Component({
  selector: 'aw-customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
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
