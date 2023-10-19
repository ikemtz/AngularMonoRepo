import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from 'imng-ngrx-utils/testing';
import {
  testAddSetAndClearCurrentEntity,
  testEditSetAndClearCurrentEntity,
  testSaveCurrentEntity,
  testUpdateCurrentEntity,
} from 'imng-kendo-data-entry/testing';
import { createODataPayload } from 'imng-kendo-odata';
import { of } from 'rxjs';

import { CustomerEffects } from '../+state/customer.effects';
import { customersFeature } from '../+state/customer.reducer';
import { CustomerCrudFacade } from './crud.facade';
import { CustomerApiService } from './api.service';
import { environment } from '../../../../environments/environment';
import { CustomerProperties, ICustomer } from '../../../models/webapi';

export const createCustomer = () =>
  <ICustomer>{
    [CustomerProperties.ID]: 'ID',
    [CustomerProperties.NUM]: 'NUM',
    [CustomerProperties.NAME]: 'NAME',
    [CustomerProperties.COMPANY_NAME]: 'COMPANY_NAME',
    [CustomerProperties.SALES_AGENT_ID]: 0,
    [CustomerProperties.EMAIL_ADDRESS]: 'EMAIL_ADDRESS',
    [CustomerProperties.PHONE]: 'PHONE',
    [CustomerProperties.SALES_AGENT]: 'SALES_AGENT',
  };

describe('CustomerCrudFacade', () => {
  let facade: CustomerCrudFacade;
  let httpClient: HttpClient;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => {}); //NOSONAR

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(customersFeature),
          EffectsModule.forFeature([CustomerEffects]),
        ],
        providers: [
          CustomerCrudFacade,
          CustomerApiService,
          {
            provide: HttpClient,
            useValue: {
              get: jest.fn(() => of(createODataPayload([createCustomer()]))),
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

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      store = TestBed.inject(Store);
      facade = TestBed.inject(CustomerCrudFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    test('clearCurrentEntity() should set currentCustomer to null', async () => {
      let isNewActive = await readFirst(facade.isNewActive$);
      expect(isNewActive).toBeFalsy();

      facade.clearCurrentEntity();
      isNewActive = await readFirst(facade.isNewActive$);

      expect(isNewActive).toBeFalsy();
    });

    test('New Entity Set And Clear CurrentEntity', async () =>
      testAddSetAndClearCurrentEntity<CustomerCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<CustomerCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<CustomerCrudFacade>(facade, httpClient));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<CustomerCrudFacade>(facade, httpClient));

    test('should load SalesAgents', async () => {
      facade.loadSalesAgents({});
      expect(httpClient.get).toBeCalledTimes(1);
      const result = await readFirst(facade.salesAgents$);
      expect(result.length).toBe(1);
    });
  });
});
