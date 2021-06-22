import { Component, ChangeDetectionStrategy } from '@angular/core';
import { KendoODataComponentBase } from 'imng-kendo-grid-odata';
import { ODataState } from 'imng-kendo-odata';
import { DetailExpandEvent } from '@progress/kendo-angular-grid';

import { CustomerListFacade } from './list.facade';
import { CustomerCrudFacade } from '../customers-crud';
import { CustomerProperties, ICustomer } from '../../../models';
import { Router } from '@angular/router';

const initialGridState: ODataState = {
  take: 20,
  skip: 0,
  selectors: [
    CustomerProperties.ID,
    CustomerProperties.NAME_STYLE,
    CustomerProperties.TITLE,
    CustomerProperties.FIRST_NAME,
    CustomerProperties.MIDDLE_NAME,
    CustomerProperties.LAST_NAME,
    CustomerProperties.SUFFIX,
    CustomerProperties.COMPANY_NAME,
    CustomerProperties.SALES_PERSON,
    CustomerProperties.EMAIL_ADDRESS,
    CustomerProperties.PHONE,
  ],
  sort: [{ field: CustomerProperties.ID, dir: 'asc' }],
};

@Component({
  selector: 'aw-customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerListComponent extends KendoODataComponentBase<ICustomer, CustomerListFacade> {
  public readonly props = CustomerProperties;
  public currentItem: ICustomer | undefined;

  constructor(facade: CustomerListFacade, public readonly crudFacade: CustomerCrudFacade, router: Router) {
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
