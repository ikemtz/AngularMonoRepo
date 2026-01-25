import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ODataService } from 'imng-kendo-odata';

import {
  customersFeature,
  CustomerListEffects,
  CustomerLookupEffects,
  CustomerCrudEffects,
} from './+state';

import { CustomerApiService } from './customer.api.service';
import { CustomerCrudFacade } from './customer.crud.facade';
import { CustomerListFacade } from './customer.list.facade';
import { CustomerLookupFacade } from './customer.lookup.facade';

@NgModule({
  imports: [
    StoreModule.forFeature(customersFeature),
    EffectsModule.forFeature([
      CustomerCrudEffects,
      CustomerListEffects,
      CustomerLookupEffects,
    ]),
  ],
  providers: [
    ODataService,
    CustomerApiService,

    CustomerCrudFacade,
    CustomerListFacade,
    CustomerLookupFacade,
  ],
})
export class CustomersModule {}
