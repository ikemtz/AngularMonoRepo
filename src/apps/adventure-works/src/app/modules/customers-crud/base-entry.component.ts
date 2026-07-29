import { OnInit, Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

import { CustomerLookupFacade } from '../customers-ngrx-module/customer.lookup.facade';
import { CustomerCrudFacade } from '../customers-ngrx-module/customer.crud.facade';
import {
  CustomerProperties,
  ICustomerForm,
  CustomerFormGroupFac,
  ISalesAgent,
  SalesAgentProperties,
} from '../../models/webapi';

@Component({
  template: '',
})
export abstract class CustomerBaseEntryComponent
  extends BaseDataEntryComponent<CustomerCrudFacade>
  implements OnInit
{
  public readonly customerLookupFacade = inject(CustomerLookupFacade);
  public readonly props = CustomerProperties;
  public readonly salesAgentProps = SalesAgentProperties;
  public readonly salesAgents$: Observable<ISalesAgent[]>;
  public readonly salesAgentFilter$ = new BehaviorSubject('');
  public addEditForm: FormGroup<ICustomerForm>;

  constructor() {
    super(inject(CustomerCrudFacade));
    this.salesAgents$ = this.customerLookupFacade.salesAgents$.pipe(
      switchMap((salesAgents) =>
        this.salesAgentFilter$.pipe(
          map((salesAgentFilter) =>
            salesAgentFilter
              ? salesAgents.filter(
                  (salesAgent) =>
                    salesAgent.name?.toLowerCase().includes(salesAgentFilter) ||
                    salesAgent.loginId
                      ?.toLowerCase()
                      .includes(salesAgentFilter),
                )
              : salesAgents,
          ),
        ),
      ),
    );
  }

  public override ngOnInit(): void {
    this.initForm();
    this.customerLookupFacade.loadSalesAgents({
      selectors: [
        SalesAgentProperties.ID,
        SalesAgentProperties.NAME,
        SalesAgentProperties.LOGIN_ID,
      ],
    });
  }

  public initForm(): void {
    this.addEditForm = CustomerFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }

  public handleSalesAgentFilter(value: string) {
    this.salesAgentFilter$.next(value.toLowerCase());
  }
}
