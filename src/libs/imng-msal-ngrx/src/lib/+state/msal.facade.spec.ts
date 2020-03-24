import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { MsalEntity } from './msal.models';
import { MsalEffects } from './msal.effects';
import { MsalFacade } from './msal.facade';

import * as MsalSelectors from './msal.selectors';
import * as MsalActions from './msal.actions';
import { MSAL_FEATURE_KEY, State, initialState, reducer } from './msal.reducer';

interface TestSchema {
  msal: State;
}

describe('MsalFacade', () => {
  let facade: MsalFacade;
  let store: Store<TestSchema>;
  const createMsalEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as MsalEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [StoreModule.forFeature(MSAL_FEATURE_KEY, reducer), EffectsModule.forFeature([MsalEffects])],
        providers: [MsalFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [NxModule.forRoot(), StoreModule.forRoot({}), EffectsModule.forRoot([]), CustomFeatureModule],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(MsalFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async done => {
      try {
        let list = await readFirst(facade.allMsal$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(MsalActions.loadMsal());

        list = await readFirst(facade.allMsal$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadMsalSuccess` to manually update list
     */
    it('allMsal$ should return the loaded list; and loaded flag == true', async done => {
      try {
        let list = await readFirst(facade.allMsal$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          MsalActions.loadMsalSuccess({
            msal: [createMsalEntity('AAA'), createMsalEntity('BBB')],
          }),
        );

        list = await readFirst(facade.allMsal$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
