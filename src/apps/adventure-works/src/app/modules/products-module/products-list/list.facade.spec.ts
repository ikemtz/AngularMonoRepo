import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { readFirst } from 'imng-ngrx-utils/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { ODataState, createODataPayload, createODataResult } from 'imng-kendo-odata';
import { testDeleteCurrentEntity } from 'imng-kendo-data-entry/testing';
import { of } from 'rxjs';

import { ProductEffects } from '../+state/product.effects';
import * as productActionTypes from '../+state/product.actions';
import { ProductsPartialState, initialState, reducer as productsReducer, PRODUCTS_FEATURE_KEY } from '../+state/product.reducer';
import { ProductListFacade } from './list.facade';
import { IProduct, ProductProperties } from '../../../models';
import { environment } from '../../../../environments/environment';

interface TestSchema {
  [PRODUCTS_FEATURE_KEY]: ProductsPartialState;
}

export const createProduct = () => <IProduct>{
  [ProductProperties.ID]: 'ID',
  [ProductProperties.NAME]: 'NAME',
  [ProductProperties.PRODUCT_NUMBER]: 'PRODUCT_NUMBER',
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
  [ProductProperties.THUMBNAIL_PHOTO_FILE_NAME]: 'THUMBNAIL_PHOTO_FILE_NAME',
  [ProductProperties.PRODUCT_CATEGORY]: 'PRODUCT_CATEGORY',
  [ProductProperties.PRODUCT_MODEL]: 'PRODUCT_MODEL',
};

describe('ProductListFacade', () => {
  let facade: ProductListFacade;
  let store: Store<TestSchema>;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => { });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(PRODUCTS_FEATURE_KEY, productsReducer, { initialState }),
          EffectsModule.forFeature([ProductEffects]),
        ],
        providers: [
          DataPersistence,
          ProductListFacade,
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

      store = TestBed.inject(Store);
      facade = TestBed.inject(ProductListFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    /**
     * The initially generated facade::loadEntities() returns an array of (1)
     */
    it('loadEntities() should return a list of (1) with loading == false and httpClient.get is invoked', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      facade.loadEntities({});

      list = await readFirst(facade.gridData$);
      const loading = await readFirst(facade.loading$);
      expect(list.data.length).toBe(1);
      expect(loading).toBe(false);
      expect(httpClient.get).toBeCalledTimes(1);
      expect(httpClient.get).toBeCalledWith('aw-odata/odata/v1/Products?&$count=true');

    });

    it('should get the grid state', async () => {
      const filteringState: ODataState = {
        filter: { logic: 'and', filters: [{ field: '💩', operator: 'eq', value: '🍑' }] },
      };
      let state = await readFirst(facade.gridODataState$);
      expect(state?.count).toBeUndefined();
      facade.loadEntities(filteringState);

      state = await readFirst(facade.gridODataState$);
      expect(state).toStrictEqual(filteringState);

      facade.loadEntities({});
      state = await readFirst(facade.gridODataState$);
      expect(state).toStrictEqual({});

    });

    /**
     * Use `productsLoaded` to manually submit list for state management
     */
    it('gridData$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      store.dispatch(productActionTypes.loadProductsSuccess(createODataResult([createProduct(), createProduct()])));

      list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(2);

    });

    it('should handle DeleteItem', async () => {
      await testDeleteCurrentEntity(facade, httpClient);
    });
  });
});
