import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from 'imng-ngrx-utils/testing';

import { idleFeature } from './idle.reducer';
import { IdleFacade } from './idle.facade';
import { IdleEffects } from './idle.effects';
import { IDLE_CONFIG } from '../idle-config';


describe('IdleFacade', () => {
  let facade: IdleFacade;
  let store: Store;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(idleFeature),
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

    it('current state should match initial', async () => {
      expect(store).toBeTruthy();
      expect(await readFirst(facade.isTimingOut$)).toBe(false);
    });
  });
});
