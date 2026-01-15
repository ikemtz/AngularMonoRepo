import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';

import { OrdersRoutingModule } from './orders.routing';
import { ordersFeature } from './+state/order.reducer';
import { OrderEffects } from './+state/order.effects';

//primeNG
import { ImngPrimeTableODataModule } from 'imng-prime-table-odata';
import { TableModule } from 'primeng/table';
import {
  PrimeOrderListComponent,
  PrimeOrderListFacade,
} from './prime-orders-list';

@NgModule({
  imports: [
    CommonModule,
    TableModule,
    ImngPrimeTableODataModule,
    ReactiveFormsModule,
    OrdersRoutingModule,
    StoreModule.forFeature(ordersFeature),
    EffectsModule.forFeature([OrderEffects]),
    PrimeOrderListComponent,
  ],
  providers: [PrimeOrderListFacade],
})
export class OrdersModule {}
