import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
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
import { createODataPayload } from 'imng-kendo-odata';
import { of } from 'rxjs';

import { ProductEffects } from '../+state/product.effects';
import { productsFeature } from '../+state/product.reducer';
import { ProductCrudFacade } from './crud.facade';
import { ProductApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import { IProduct, ProductProperties } from '../../../models/webapi';

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
  let store: Store;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => { }); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(productsFeature),
          EffectsModule.forFeature([ProductEffects]),
        ],
        providers: [
          ProductCrudFacade,
          ProductApiService,
          { provide: HttpClient, useValue: { get: jest.fn(() => of(createODataPayload([createProduct()]))) } },
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
      httpClient = TestBed.inject(HttpClient);
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
      testSaveCurrentEntity<ProductCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<ProductCrudFacade>(facade, httpClient));

    test('should load ProductModels', async () => {
      facade.loadProductModels({});
      expect(httpClient.get).toBeCalledTimes(1);
      const result = await readFirst(facade.productModels$);
      expect(result.length).toBe(1);
    });

    test('should load ProductCategories', async () => {
      facade.loadProductCategories({});
      expect(httpClient.get).toBeCalledTimes(1);
      const result = await readFirst(facade.productCategories$);
      expect(result.length).toBe(1);
    });
  });
});
