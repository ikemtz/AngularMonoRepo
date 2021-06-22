import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { ODataState, createODataPayload, createODataResult } from 'imng-kendo-odata';
import { testDeleteCurrentEntity } from 'imng-kendo-data-entry/testing';
import { of } from 'rxjs';

import { CustomerEffects } from '../+state/customer.effects';
import * as customerActionTypes from '../+state/customer.actions';
import { CustomersPartialState, initialState, reducer as customersReducer, CUSTOMERS_FEATURE_KEY } from '../+state/customer.reducer';
import { CustomerListFacade } from './list.facade';
import { CustomerProperties, ICustomer } from '../../../models';
import { environment } from '../../../environments/environment';

interface TestSchema {
  [CUSTOMERS_FEATURE_KEY]: CustomersPartialState;
}

export const createCustomer = () => <ICustomer>{
  [CustomerProperties.ID]: 'ID',
  [CustomerProperties.NAME_STYLE]: true,
  [CustomerProperties.TITLE]: 'TITLE',
  [CustomerProperties.FIRST_NAME]: 'FIRST_NAME',
  [CustomerProperties.MIDDLE_NAME]: 'MIDDLE_NAME',
  [CustomerProperties.LAST_NAME]: 'LAST_NAME',
  [CustomerProperties.SUFFIX]: 'SUFFIX',
  [CustomerProperties.COMPANY_NAME]: 'COMPANY_NAME',
  [CustomerProperties.SALES_PERSON]: 'SALES_PERSON',
  [CustomerProperties.EMAIL_ADDRESS]: 'EMAIL_ADDRESS',
  [CustomerProperties.PHONE]: 'PHONE',
};

describe('CustomerListFacade', () => {
  let facade: CustomerListFacade;
  let store: Store<TestSchema>;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => { });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CUSTOMERS_FEATURE_KEY, customersReducer, { initialState }),
          EffectsModule.forFeature([CustomerEffects]),
        ],
        providers: [
          DataPersistence,
          CustomerListFacade,
          { provide: HttpClient, useValue: { get: jest.fn(() => of(createODataPayload([createCustomer()]))) } },
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
      facade = TestBed.inject(CustomerListFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    /**
     * The initially generated facade::loadEntities() returns an array of (1)
     */
    it('loadEntities() should return a list of (1) with loading == false and httpClient.get is invoked', async done => {
      try {
        let list = await readFirst(facade.gridData$);
        expect(list.data.length).toBe(0);
        facade.loadEntities({});

        list = await readFirst(facade.gridData$);
        const loading = await readFirst(facade.loading$);
        expect(list.data.length).toBe(1);
        expect(loading).toBe(false);
        expect(httpClient.get).toBeCalledTimes(1);
        expect(httpClient.get).toBeCalledWith('customers-odata/odata/v1/Customers?&$count=true');
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should get the grid state', async done => {
      try {
        const filteringState: ODataState = {
          filter: { logic: 'and', filters: [{ field: '💩', operator: 'eq', value: '🍑' }] },
        };
        let state = await readFirst(facade.gridODataState$);
        expect(state.count).toBeUndefined();
        facade.loadEntities(filteringState);

        state = await readFirst(facade.gridODataState$);
        expect(state).toStrictEqual(filteringState);

        facade.loadEntities({});
        state = await readFirst(facade.gridODataState$);
        expect(state).toStrictEqual({});
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `customersLoaded` to manually submit list for state management
     */
    it('gridData$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.gridData$);
        expect(list.data.length).toBe(0);
        store.dispatch(customerActionTypes.loadCustomersSuccess(createODataResult([createCustomer(), createCustomer()])));

        list = await readFirst(facade.gridData$);
        expect(list.data.length).toBe(2);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should handle DeleteItem', done => {
      testDeleteCurrentEntity(done, facade, httpClient);
    });
  });
});
