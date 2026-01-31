import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { ProductsRoutingModule } from './products.routing';
import { productsFeature } from './+state/product.reducer';
import { ProductEffects } from './+state/product.effects';
import { ProductListComponent, ProductListFacade } from './products-list';
import {
  ProductAddComponent,
  ProductEditComponent,
  ProductApiService,
  ProductCrudFacade,
} from './products-crud';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    StoreModule.forFeature(productsFeature),
    EffectsModule.forFeature([ProductEffects]),
    ProductListComponent,
    ProductAddComponent,
    ProductEditComponent,
  ],
  providers: [ProductListFacade, ProductCrudFacade, ProductApiService],
})
export class ProductsModule {}
