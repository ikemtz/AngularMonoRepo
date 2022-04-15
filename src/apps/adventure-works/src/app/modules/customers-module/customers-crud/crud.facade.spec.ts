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
    [CustomerProperties.SALES_PERSON]: 'SALES_PERSON',
    [CustomerProperties.EMAIL_ADDRESS]: 'EMAIL_ADDRESS',
    [CustomerProperties.PHONE]: 'PHONE',
  };

describe('CustomerCrudFacade', () => {
  let facade: CustomerCrudFacade;
  let store: Store;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  beforeEach(() => { });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(customersFeature),
          EffectsModule.forFeature([CustomerEffects]),
          HttpClientTestingModule,
        ],
        providers: [
          CustomerCrudFacade,
          CustomerApiService,
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
      testAddSetAndClearCurrentEntity<CustomerCrudFacade>(facade));
    test('Existing Entity Set And Clear CurrentEntity', async () =>
      testEditSetAndClearCurrentEntity<CustomerCrudFacade>(facade));
    test('Save CurrentEntity', async () =>
      testSaveCurrentEntity<CustomerCrudFacade>(facade, TestBed.inject(HttpClient)));
    test('Update CurrentEntity', async () =>
      testUpdateCurrentEntity<CustomerCrudFacade>(facade, TestBed.inject(HttpClient)));
  });
});
