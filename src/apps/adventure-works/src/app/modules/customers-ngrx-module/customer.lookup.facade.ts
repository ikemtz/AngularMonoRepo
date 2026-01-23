import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { ODataState } from 'imng-kendo-odata';

import { customersFeature, customerActionTypes } from './+state';

@Injectable({ providedIn: 'root' })
export class CustomerLookupFacade {
  private readonly store = inject(Store);

  salesAgents$ = this.store.select(customersFeature.selectSalesAgents);

  public loadSalesAgents(state: ODataState): void {
    this.store.dispatch(customerActionTypes.loadSalesAgentsRequest(state));
  }
}
