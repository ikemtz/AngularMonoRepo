import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst, cold } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { NursesEffects } from '../+state/nurses.effects';
import { ListFacade } from './list.facade';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import * as NursesActions from '../+state/nurses.actions';
import { NURSES_FEATURE_KEY, NursesState, initialState, reducer } from '../+state/nurses.reducer';
import { IEmployee } from '../../models/emp-api';
import { ODataService } from 'imng-kendo-odata';
import { NursesApiService } from '../services/nurses-api.service';
import { of } from 'rxjs';

interface TestSchema {
  nurses: NursesState;
}

describe('ListFacade', () => {
  let facade: ListFacade;
  let store: Store<TestSchema>;
  const createNursesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as IEmployee);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(NURSES_FEATURE_KEY, reducer),
          EffectsModule.forFeature([NursesEffects]),
          HttpClientTestingModule,
        ],
        providers: [
          ListFacade,
          ODataService,
          {
            provide: NursesApiService,
            useValue: { delete: jest.fn(() => of()) },
          },
        ],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(ListFacade);
    });

    it('loadEntities() should return empty list with loaded == true', async done => {
      try {
        let gridData = await readFirst(facade.gridData$);
        let isloading = await readFirst(facade.loading$);
        const client: ODataService = TestBed.get(ODataService);
        const response = cold('-a-|', {
          a: { data: [{ id: 'i ❤' }, { id: 'imng' }, { id: '💯' }], total: 3 },
        });
        client.fetch = jest.fn(() => response);

        expect(gridData.data.length).toBe(0);
        expect(isloading).toBe(false);
        facade.loadEntities({});

        gridData = await readFirst(facade.gridData$);
        isloading = await readFirst(facade.loading$);

        expect(gridData.data.length).toBe(0);
        expect(isloading).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should deleteNurse', async done => {
      try {
        const nurserApi: NursesApiService = TestBed.get(NursesApiService);
        facade.deleteNurse(createNursesEntity('💩', '🤳'));
        expect(nurserApi.delete).toBeCalledTimes(1);
        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
