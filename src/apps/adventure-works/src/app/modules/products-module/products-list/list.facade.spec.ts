import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { readFirst } from 'imng-ngrx-utils/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { ODataState, createODataPayload, createODataResult, ODataService } from 'imng-kendo-odata';
import { testDeleteCurrentEntity } from 'imng-kendo-data-entry/testing';
import { Observable, of } from 'rxjs';

import { ProductEffects } from '../+state/product.effects';
import * as productActionTypes from '../+state/product.actions';
import { productsFeature } from '../+state/product.reducer';
import { ProductListFacade } from './list.facade';
import { environment } from '../../../../environments/environment';
import { IProduct, ProductProperties } from '../../../models/odata';

export const createProduct = () => <IProduct>{
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

describe('ProductListFacade', () => {
  let facade: ProductListFacade;
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
          ProductListFacade,
          { provide: HttpClient, useValue: { get: jest.fn(() => of(createODataPayload([createProduct()]))) } },
        ],
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
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
    test('loadEntities() should return a list of (1) with loading == false and httpClient.get is invoked', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      facade.loadEntities({});

      list = await readFirst(facade.gridData$);
      const loading = await readFirst(facade.loading$);
      expect(list.data.length).toBe(1);
      expect(loading).toBe(false);
      expect(httpClient.get).toBeCalledTimes(1);
      expect(httpClient.get).toBeCalledWith('aw-odata/odata/v1/Products?&$count=true');

      facade.reloadEntities();
      expect(httpClient.get).toBeCalledTimes(2);
    });

    test('reloadEntities() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.gridData$);
      let isloading = await readFirst(facade.loading$);

      const service: { fetch: (endpoint: string, odataState: ODataState) => Observable<unknown>; } = TestBed.inject(ODataService);
      const response = of({ data: [{ id: 'i ❤' }, { id: 'imng' }, { id: '💯' }], total: 3 });
      service.fetch = jest.fn(() => response);

      expect(list.data.length).toBe(0);
      expect(isloading).toBe(true);
      facade.reloadEntities();

      list = await readFirst(facade.gridData$);
      isloading = await readFirst(facade.loading$);

      expect(list.data.length).toBe(3);
      expect(isloading).toBe(false);
      expect(service.fetch).toBeCalledTimes(1);
    });

    test('it should get the grid state', async () => {
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
    test('gridData$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      store.dispatch(productActionTypes.loadProductsSuccess(createODataResult([createProduct(), createProduct()])));

      list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(2);
    });

    test('it should handle DeleteItem', async () => {
      await testDeleteCurrentEntity(facade, httpClient);
    });
  });
});
