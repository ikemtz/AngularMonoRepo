import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';

import { CustomerListFacade } from './list.facade';
import { CustomerCrudFacade } from '../customers-crud';
import {
  CustomerProperties,
  ICustomer,
  SalesAgentProperties,
} from '../../../models/odata';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    CustomerProperties.ID,
    CustomerProperties.NUM,
    CustomerProperties.NAME,
    CustomerProperties.COMPANY_NAME,
    CustomerProperties.SALES_AGENT_ID,
    CustomerProperties.EMAIL_ADDRESS,
    CustomerProperties.PHONE,
  ],
  sort: [{ field: CustomerProperties.NUM, dir: 'asc' }],
  expanders: [
    {
      table: CustomerProperties.SALES_AGENT,
      selectors: [
        SalesAgentProperties.ID,
        SalesAgentProperties.NAME,
        SalesAgentProperties.LOGIN_ID,
      ],
    },
  ],
};

@Component({
  selector: 'aw-customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerListComponent extends KendoODataComponentBase<
ICustomer,
CustomerListFacade
> {
  public readonly props = CustomerProperties;
  public currentItem: ICustomer | undefined;

  constructor(
    facade: CustomerListFacade,
    public readonly crudFacade: CustomerCrudFacade,
    router: Router,
  ) {
    super(facade, initialGridState, router);
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
