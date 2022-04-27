import { OnInit, Component } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { CustomerFormGroupFac, CustomerProperties, ISalesAgent, SalesAgentProperties } from '../../../models/webapi';

import { CustomerCrudFacade } from './crud.facade';

@Component({ template: '' })
export abstract class CustomerBaseEntryComponent extends BaseDataEntryComponent<CustomerCrudFacade>
  implements OnInit {
  public readonly props = CustomerProperties;
  public readonly salesAgentProps = SalesAgentProperties;
  public readonly salesAgents$: Observable<ISalesAgent[]>;
  public readonly salesAgentFilter$ = new BehaviorSubject('');

  constructor(facade: CustomerCrudFacade) {
    super(facade);
    this.salesAgents$ = facade.salesAgents$.pipe(
      switchMap(salesAgents => this.salesAgentFilter$.pipe(
        map(salesAgentFilter => salesAgentFilter ? salesAgents
          .filter(salesAgent => (
            (salesAgent.name && salesAgent.name.toLowerCase().indexOf(salesAgentFilter) >= 0) ||
            (salesAgent.loginId && salesAgent.loginId.toLowerCase().indexOf(salesAgentFilter) >= 0)
          )) : salesAgents
        ))));
  }

  public ngOnInit(): void {
    this.initForm();
    this.facade.loadSalesAgents({
      selectors: [
        SalesAgentProperties.ID,
        SalesAgentProperties.NAME,
        SalesAgentProperties.LOGIN_ID,]
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
