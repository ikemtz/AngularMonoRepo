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

@NgModule({
  imports: [
    StoreModule.forFeature(customersFeature),
    EffectsModule.forFeature([
      CustomerCrudEffects,
      CustomerListEffects,
      CustomerLookupEffects,
    ]),
  ],
  providers: [ODataService, CustomerApiService],
})
export class CustomersNgrxModule {}
