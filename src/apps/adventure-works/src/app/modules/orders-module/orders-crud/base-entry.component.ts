/* eslint-disable @angular-eslint/prefer-inject */
import { OnInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import {
  CustomerProperties,
  ICustomer,
  IOrderAddress,
  IOrderForm,
  OrderAddressProperties,
  OrderFormGroupFac,
  OrderProperties,
  orderStatusTypeValues,
  shippingTypeValues,
} from '../../../models/odata';

import { OrderCrudFacade } from './crud.facade';

@Component({
  template: '',
})
export abstract class OrderBaseEntryComponent
  extends BaseDataEntryComponent<OrderCrudFacade>
  implements OnInit
{
  public readonly props = OrderProperties;
  public readonly customerProps = CustomerProperties;
  public readonly customers$: Observable<ICustomer[]>;
  public readonly customerFilter$ = new BehaviorSubject('');
  public readonly shipToAddressProps = OrderAddressProperties;
  public readonly shipToAddresses$: Observable<IOrderAddress[]>;
  public readonly shipToAddressFilter$ = new BehaviorSubject('');
  public readonly billToAddressProps = OrderAddressProperties;
  public readonly billToAddresses$: Observable<IOrderAddress[]>;
  public readonly billToAddressFilter$ = new BehaviorSubject('');
  public readonly statusTypes$ = new BehaviorSubject(orderStatusTypeValues);
  public readonly shippingTypes$ = new BehaviorSubject(shippingTypeValues);
  public addEditForm: FormGroup<IOrderForm>;

  constructor(facade: OrderCrudFacade) {
    super(facade);
    this.customers$ = facade.customers$.pipe(
      switchMap((customers) =>
        this.customerFilter$.pipe(
          map((customerFilter) =>
            customerFilter
              ? customers.filter(
                  (customer) =>
                    customer.num?.toLowerCase().includes(customerFilter) ||
                    customer.name?.toLowerCase().includes(customerFilter) ||
                    customer.companyName
                      ?.toLowerCase()
                      .includes(customerFilter) ||
                    customer.salesAgentId
                      ?.toString()
                      .toLowerCase()
                      .includes(customerFilter) ||
                    customer.emailAddress
                      ?.toLowerCase()
                      .includes(customerFilter) ||
                    customer.phone?.toLowerCase().includes(customerFilter),
                )
              : customers,
          ),
        ),
      ),
    );
    this.shipToAddresses$ = facade.shipToAddresses$.pipe(
      switchMap((shipToAddresses) =>
        this.shipToAddressFilter$.pipe(
          map((shipToAddressFilter) =>
            shipToAddressFilter
              ? shipToAddresses.filter(
                  (shipToAddress) =>
                    shipToAddress.line1
                      ?.toLowerCase()
                      .includes(shipToAddressFilter) ||
                    shipToAddress.line2
                      ?.toLowerCase()
                      .includes(shipToAddressFilter) ||
                    shipToAddress.city
                      ?.toLowerCase()
                      .includes(shipToAddressFilter) ||
                    shipToAddress.stateProvince
                      ?.toLowerCase()
                      .includes(shipToAddressFilter) ||
                    shipToAddress.countryRegion
                      ?.toLowerCase()
                      .includes(shipToAddressFilter) ||
                    shipToAddress.postalCode
                      ?.toLowerCase()
                      .includes(shipToAddressFilter),
                )
              : shipToAddresses,
          ),
        ),
      ),
    );
    this.billToAddresses$ = facade.billToAddresses$.pipe(
      switchMap((billToAddresses) =>
        this.billToAddressFilter$.pipe(
          map((billToAddressFilter) =>
            billToAddressFilter
              ? billToAddresses.filter(
                  (billToAddress) =>
                    billToAddress.line1
                      ?.toLowerCase()
                      .includes(billToAddressFilter) ||
                    billToAddress.line2
                      ?.toLowerCase()
                      .includes(billToAddressFilter) ||
                    billToAddress.city
                      ?.toLowerCase()
                      .includes(billToAddressFilter) ||
                    billToAddress.stateProvince
                      ?.toLowerCase()
                      .includes(billToAddressFilter) ||
                    billToAddress.countryRegion
                      ?.toLowerCase()
                      .includes(billToAddressFilter) ||
                    billToAddress.postalCode
                      ?.toLowerCase()
                      .includes(billToAddressFilter),
                )
              : billToAddresses,
          ),
        ),
      ),
    );
  }

  public override ngOnInit(): void {
    super.ngOnInit();
    this.facade.loadCustomers({
      selectors: [
        CustomerProperties.ID,
        CustomerProperties.NUM,
        CustomerProperties.NAME,
        CustomerProperties.COMPANY_NAME,
        CustomerProperties.SALES_AGENT_ID,
        CustomerProperties.EMAIL_ADDRESS,
        CustomerProperties.PHONE,
        CustomerProperties.SALES_AGENT,
      ],
    });
    this.facade.loadShipToAddresses({
      selectors: [
        OrderAddressProperties.ID,
        OrderAddressProperties.LINE_1,
        OrderAddressProperties.LINE_2,
        OrderAddressProperties.CITY,
        OrderAddressProperties.STATE_PROVINCE,
        OrderAddressProperties.COUNTRY_REGION,
        OrderAddressProperties.POSTAL_CODE,
      ],
    });
    this.facade.loadBillToAddresses({
      selectors: [
        OrderAddressProperties.ID,
        OrderAddressProperties.LINE_1,
        OrderAddressProperties.LINE_2,
        OrderAddressProperties.CITY,
        OrderAddressProperties.STATE_PROVINCE,
        OrderAddressProperties.COUNTRY_REGION,
        OrderAddressProperties.POSTAL_CODE,
      ],
    });
  }

  public initForm(): void {
    this.addEditForm = OrderFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }

  public handleCustomerFilter(value: string) {
    this.customerFilter$.next(value.toLowerCase());
  }
  public handleShipToAddressFilter(value: string) {
    this.shipToAddressFilter$.next(value.toLowerCase());
  }
  public handleBillToAddressFilter(value: string) {
    this.billToAddressFilter$.next(value.toLowerCase());
  }
  public handleStatusTypeFilter(value: string) {
    this.statusTypes$.next(
      orderStatusTypeValues.filter((t) =>
        t.name?.toLowerCase().includes(value),
      ),
    );
  }
  public handleShippingTypeFilter(value: string) {
    this.shippingTypes$.next(
      shippingTypeValues.filter((t) => t.name?.toLowerCase().includes(value)),
    );
  }
}
