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
    standalone: false
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
                    (customer.num &&
                      customer.num.toLowerCase().indexOf(customerFilter) >=
                        0) ||
                    (customer.name &&
                      customer.name.toLowerCase().indexOf(customerFilter) >=
                        0) ||
                    (customer.companyName &&
                      customer.companyName
                        .toLowerCase()
                        .indexOf(customerFilter) >= 0) ||
                    (customer.salesAgentId &&
                      customer.salesAgentId
                        .toString()
                        .toLowerCase()
                        .indexOf(customerFilter) >= 0) ||
                    (customer.emailAddress &&
                      customer.emailAddress
                        .toLowerCase()
                        .indexOf(customerFilter) >= 0) ||
                    (customer.phone &&
                      customer.phone.toLowerCase().indexOf(customerFilter) >=
                        0),
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
                    (shipToAddress.line1 &&
                      shipToAddress.line1
                        .toLowerCase()
                        .indexOf(shipToAddressFilter) >= 0) ||
                    (shipToAddress.line2 &&
                      shipToAddress.line2
                        .toLowerCase()
                        .indexOf(shipToAddressFilter) >= 0) ||
                    (shipToAddress.city &&
                      shipToAddress.city
                        .toLowerCase()
                        .indexOf(shipToAddressFilter) >= 0) ||
                    (shipToAddress.stateProvince &&
                      shipToAddress.stateProvince
                        .toLowerCase()
                        .indexOf(shipToAddressFilter) >= 0) ||
                    (shipToAddress.countryRegion &&
                      shipToAddress.countryRegion
                        .toLowerCase()
                        .indexOf(shipToAddressFilter) >= 0) ||
                    (shipToAddress.postalCode &&
                      shipToAddress.postalCode
                        .toLowerCase()
                        .indexOf(shipToAddressFilter) >= 0),
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
                    (billToAddress.line1 &&
                      billToAddress.line1
                        .toLowerCase()
                        .indexOf(billToAddressFilter) >= 0) ||
                    (billToAddress.line2 &&
                      billToAddress.line2
                        .toLowerCase()
                        .indexOf(billToAddressFilter) >= 0) ||
                    (billToAddress.city &&
                      billToAddress.city
                        .toLowerCase()
                        .indexOf(billToAddressFilter) >= 0) ||
                    (billToAddress.stateProvince &&
                      billToAddress.stateProvince
                        .toLowerCase()
                        .indexOf(billToAddressFilter) >= 0) ||
                    (billToAddress.countryRegion &&
                      billToAddress.countryRegion
                        .toLowerCase()
                        .indexOf(billToAddressFilter) >= 0) ||
                    (billToAddress.postalCode &&
                      billToAddress.postalCode
                        .toLowerCase()
                        .indexOf(billToAddressFilter) >= 0),
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
      orderStatusTypeValues.filter(
        (t) => t.name.toLowerCase().indexOf(value) > -1,
      ),
    );
  }
  public handleShippingTypeFilter(value: string) {
    this.shippingTypes$.next(
      shippingTypeValues.filter(
        (t) => t.name.toLowerCase().indexOf(value) > -1,
      ),
    );
  }
}
