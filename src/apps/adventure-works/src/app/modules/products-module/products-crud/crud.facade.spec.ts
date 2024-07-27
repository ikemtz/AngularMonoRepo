import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
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
import { createTestProduct } from '../../../models/webapi';

describe('ProductCrudFacade', () => {
  let facade: ProductCrudFacade;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {}); //NOSONAR

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
          {
            provide: HttpClient,
            useValue: {
              get: jest.fn(() => of(createODataPayload([createTestProduct()]))),
            },
          },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}, { runtimeChecks: environment.runtimeChecks }),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

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
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      const result = await readFirst(facade.productModels$);
      expect(result.length).toBe(1);
    });

    test('should load ProductCategories', async () => {
      facade.loadProductCategories({});
      expect(httpClient.get).toHaveBeenCalledTimes(1);
      const result = await readFirst(facade.productCategories$);
      expect(result.length).toBe(1);
    });
  });
});
