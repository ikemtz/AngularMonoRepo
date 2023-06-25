import { Component, ChangeDetectionStrategy } from '@angular/core';
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

@Component({
  selector: 'aw-customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerListComponent extends KendoODataBasedComponent<
  ICustomer,
  CustomerListFacade
> {
  public readonly props = CustomerProperties;
  public readonly salesAgentProps = SalesAgentProperties;
  public currentItem: ICustomer | undefined;

  constructor(
    facade: CustomerListFacade,
    public readonly crudFacade: CustomerCrudFacade,
    router: Router,
  ) {
    super(facade, customerGridState, router);
  }

  public addItem(): void {
    this.crudFacade.setCurrentEntity({});
  }

  public editItem(item: ICustomer): void {
    this.crudFacade.setCurrentEntity(item);
  }

  public deleteItem(item: ICustomer): void {
    this.facade.deleteExistingEntity(item);
  }

  public detailExpanded(evt: DetailExpandEvent): void {
    this.currentItem = evt.dataItem;
  }
}
