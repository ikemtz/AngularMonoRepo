import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { HttpClient } from '@angular/common/http';
import { readFirst } from '@nrwl/angular/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { ODataState } from 'imng-kendo-odata';
import { testDeleteCurrentEntity } from 'imng-kendo-data-entry/testing';
import { of } from 'rxjs';
import { environment } from '@env';

import { CompetencyEffects } from '../+state/competency.effects';
import * as competencyActionTypes from '../+state/competency.actions';
import { CompetenciesPartialState, initialState, reducer as competencyReducer, COMPETENCIES_FEATURE_KEY } from '../+state/competency.reducer';
import { CompetencyListFacade } from './list.facade';
import { ICompetency, CompetencyProperties } from '../../../models/competencies-odata';

interface TestSchema {
  [COMPETENCIES_FEATURE_KEY]: CompetenciesPartialState;
}

export const createCompetency = () => <ICompetency>{
  [CompetencyProperties.ID]: 'ID',
  [CompetencyProperties.NAME]: 'NAME',
  [CompetencyProperties.IS_ENABLED]: true,
};

describe('CompetencyListFacade', () => {
  let facade: CompetencyListFacade;
  let store: Store<TestSchema>;
  let httpClient: HttpClient;

  beforeEach(() => { });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(COMPETENCIES_FEATURE_KEY, competencyReducer, { initialState }),
          EffectsModule.forFeature([CompetencyEffects]),
        ],
        providers: [CompetencyListFacade,
          { provide: HttpClient, useValue: { get: jest.fn(() => of({ value: [createCompetency()], '@odata.count': 1 })) } },
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
      facade = TestBed.inject(CompetencyListFacade);
      httpClient = TestBed.inject(HttpClient);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.gridData$);
        expect(list.data.length).toBe(0);
        facade.loadEntities({});

        list = await readFirst(facade.gridData$);
        expect(list.data.length).toBe(1);
        expect(httpClient.get).toBeCalledTimes(1);
        expect(httpClient.get).toBeCalledWith('competencies-odata/odata/v1/Competencies?&$count=true');
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
     * Use `competenciesLoaded` to manually submit list for state management
     */
    it('gridData$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.gridData$);
        expect(list.data.length).toBe(0);
        store.dispatch(competencyActionTypes.loadCompetenciesSuccess({ data: [createCompetency(), createCompetency()], total: 0 }));

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
