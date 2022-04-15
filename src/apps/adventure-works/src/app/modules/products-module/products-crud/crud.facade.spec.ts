import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from 'imng-ngrx-utils/testing';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testSaveCurrentEntity,
  testUpdateCurrentEntity,
} from 'imng-kendo-data-entry/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ProductEffects } from '../+state/product.effects';
import {
  ProductsPartialState,
  PRODUCTS_FEATURE_KEY,
  productsFeature,
} from '../+state/product.reducer';
import { ProductCrudFacade } from './crud.facade';
import { ProductApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import { IProduct, ProductProperties } from '../../../models/webapi';

interface TestSchema {
  [PRODUCTS_FEATURE_KEY]: ProductsPartialState;
}

export const createProduct = () =>
  <IProduct>{
    [ProductProperties.ID]: 'ID',
    [ProductProperties.NAME]: 'NAME',
    [ProductProperties.NUM]: 'NUM',
    [ProductProperties.COLOR]: 'COLOR',
    [ProductProperties.STANDARD_COST]: 0,
    [ProductProperties.LIST_PRICE]: 0,
    [ProductProperties.SIZE]: 'SIZE',
    [ProductProperties.WEIGHT]: 0,
    [ProductProperties.PRODUCT_CATEGORY_ID]: 'PRODUCT_CATEGORY_ID',
    [ProductProperties.PRODUCT_MODEL_ID]: 'PRODUCT_MODEL_ID',
    [ProductProperties.SELL_START_DATE]: new Date(),
    [ProductProperties.SELL_END_DATE]: new Date(),
    [ProductProperties.DISCONTINUED_DATE]: new Date(),
    [ProductProperties.THUMB_NAIL_PHOTO]: 'THUMB_NAIL_PHOTO',
    [ProductProperties.PRODUCT_MODEL]: 'PRODUCT_MODEL',
    [ProductProperties.PRODUCT_CATEGORY]: 'PRODUCT_CATEGORY',
  };

describe('ProductCrudFacade', () => {
  let facade: ProductCrudFacade;
  let store: Store<TestSchema>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => { });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(productsFeature),
          EffectsModule.forFeature([ProductEffects]),
          HttpClientTestingModule,
        ],
        providers: [
          ProductCrudFacade,
          ProductApiService,
        ],
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}, { runtimeChecks: environment.runtimeChecks }),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      store = TestBed.inject(Store);
      facade = TestBed.inject(ProductCrudFacade);
    });

    test('clearCurrentEntity() should set currentProduct to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<ProductCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<ProductCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<ProductCrudFacade>(facade, TestBed.inject(HttpClient)));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<ProductCrudFacade>(facade, TestBed.inject(HttpClient)));
  });
});
