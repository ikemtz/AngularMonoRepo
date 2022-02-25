import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule, DataPersistence } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing/src/testing-utils';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testSaveCurrentEntity,
  testUpdateCurrentEntity,
} from 'imng-kendo-data-entry/testing';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CustomerEffects } from '../+state/customer.effects';
import {
  CustomersPartialState,
  initialState,
  reducer as customersReducer,
  CUSTOMERS_FEATURE_KEY,
} from '../+state/customer.reducer';
import { CustomerCrudFacade } from './crud.facade';
import { CustomerApiService } from './api.service';
import { CustomerProperties, ICustomer } from '../../../models';
import { environment } from '../../../../environments/environment';

interface TestSchema {
  [CUSTOMERS_FEATURE_KEY]: CustomersPartialState;
}

export const createCustomer = () =>
  <ICustomer>{
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

describe('CustomerCrudFacade', () => {
  let facade: CustomerCrudFacade;
  let store: Store<TestSchema>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CUSTOMERS_FEATURE_KEY, customersReducer, { initialState }),
          EffectsModule.forFeature([CustomerEffects]),
          HttpClientTestingModule,
        ],
        providers: [DataPersistence, CustomerCrudFacade, CustomerApiService],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}, { runtimeChecks: environment.runtimeChecks }),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      store = TestBed.inject(Store);
      facade = TestBed.inject(CustomerCrudFacade);
    });

    test('clearCurrentEntity() should set currentCustomer to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      await testAddSetAndClearCurrentEntity<CustomerCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      await testEditSetAndClearCurrentEntity<CustomerCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      await testSaveCurrentEntity<CustomerCrudFacade>(facade, TestBed.inject(HttpClient)));
    test('Update CurrentEntity', async () =>
      await testUpdateCurrentEntity<CustomerCrudFacade>(facade, TestBed.inject(HttpClient)));
  });
});
