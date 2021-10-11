import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { readFirst } from 'imng-ngrx-utils/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { ODataService, ODataState } from 'imng-kendo-odata';
import { testDeleteCurrentEntity } from 'imng-kendo-data-entry/testing';
import { Observable, of } from 'rxjs';
import { environment } from '@env/nurse-cron';

import { CertificationEffects } from '../+state/certification.effects';
import * as certificationActionTypes from '../+state/certification.actions';
import {
  CertificationsPartialState,
  initialState,
  reducer as certificationReducer,
  CERTIFICATIONS_FEATURE_KEY,
} from '../+state/certification.reducer';
import { CertificationListFacade } from './list.facade';
import { ICertification, CertificationProperties } from '../../../models/certifications-odata';

interface TestSchema {
  [CERTIFICATIONS_FEATURE_KEY]: CertificationsPartialState;
}

export const createCertification = () =>
  <ICertification>{
    [CertificationProperties.ID]: 'ID',
    [CertificationProperties.NAME]: 'NAME',
    [CertificationProperties.IS_ENABLED]: true,
    [CertificationProperties.EXPIRES_ON_UTC]: new Date(),
  };

describe('CertificationListFacade', () => {
  let facade: CertificationListFacade;
  let store: Store<TestSchema>;
  let httpClient: HttpClient;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CERTIFICATIONS_FEATURE_KEY, certificationReducer, { initialState }),
          EffectsModule.forFeature([CertificationEffects]),
        ],
        providers: [
          CertificationListFacade,
          {
            provide: HttpClient,
            useValue: { get: jest.fn(() => of({ value: [createCertification()], '@odata.count': 1 })) },
          },
        ],
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

      store = TestBed.inject(Store);
      facade = TestBed.inject(CertificationListFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      facade.loadEntities({});

      list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(1);
      expect(httpClient.get).toBeCalledTimes(1);
      expect(httpClient.get).toBeCalledWith('certifications-odata/odata/v1/Certifications?&$count=true');
    });

    it('reloadEntities() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.gridData$);
      let isloading = await readFirst(facade.loading$);

      const service: { fetch: (endpoint, odataState) => Observable<unknown> } = TestBed.inject(ODataService);
      const response = of({ data: [{ id: 'i ❤' }, { id: 'imng' }, { id: '💯' }], total: 3 });
      service.fetch = jest.fn(() => response);

      expect(list.data.length).toBe(0);
      expect(isloading).toBe(false);
      facade.reloadEntities();

      list = await readFirst(facade.gridData$);
      isloading = await readFirst(facade.loading$);

      expect(list.data.length).toBe(3);
      expect(isloading).toBe(false);
      expect(service.fetch).toBeCalledTimes(1);
    });

    it('should get the grid state', async () => {
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
    });

    /**
     * Use `certificationsLoaded` to manually submit list for state management
     */
    it('gridData$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(0);
      store.dispatch(
        certificationActionTypes.loadCertificationsSuccess({
          data: [createCertification(), createCertification()],
          total: 0,
        }),
      );

      list = await readFirst(facade.gridData$);
      expect(list.data.length).toBe(2);
    });

    it('should handle DeleteItem', async () => {
      await testDeleteCurrentEntity(facade, httpClient);
    });
  });
});
