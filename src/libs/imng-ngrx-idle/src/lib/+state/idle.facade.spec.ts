import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from 'imng-ngrx-utils/testing';

import { IdleState, IDLE_FEATURE_KEY, idleReducer, initialState } from './idle.reducer';
import { IdleFacade } from './idle.facade';
import { IdleEffects } from './idle.effects';
import { IDLE_CONFIG } from '../idle-config';

interface TestSchema {
  [IDLE_FEATURE_KEY]: IdleState;
}

describe('IdleFacade', () => {
  let facade: IdleFacade;
  let store: Store<TestSchema>;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(IDLE_FEATURE_KEY, idleReducer, { initialState }),
          EffectsModule.forFeature([IdleEffects]),
        ],
        providers: [IdleFacade,
          {
            provide: IDLE_CONFIG, useValue: {
              timeoutWarningInMs: 2,
              autoLogoutInMs: 4
            }
          }
        ],
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}, { runtimeChecks: {} }),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule { }
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(IdleFacade);
    });

    it('current state should match initial', async done => {
      try {
        expect(store).toBeTruthy();
        expect(await readFirst(facade.isTimingOut$)).toBe(false);
        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
