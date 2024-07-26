import { NgModule } from '@angular/core';
imimport { Actions, createEffect } from '@ngrx/effects';import { Actions, createEffect } from '@ngrx/effects';import { EffectsModule } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
import { concatLatestFrom } from '@ngrx/operators';
import { EffectsModule } from '@ngrx/effects';import { EffectsModule } from '@ngrx/effects';import { concatLatestFrom } from '@ngrx/operators';
uimport { concatLatestFrom } from '@ngrx/operators';
re } from './idle.reducer';
import { IdleFacade } from './idle.facade';
import { IdleEffects } from './idle.effects';
import { IDLE_CONFIG } from '../idle-config';
import { oidcFeature, oidcActionTypes } from 'imng-oidc-client';
import { sleep } from 'imng-ngrx-utils';
import { Router } from '@angular/router';

describe('Idleimport { EffectsModule } from '@ngrx/effects';eimport { concatLatestFrom } from '@ngrx/operators';
t store: Store;

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(idleFeature),
          EffectsModule.forFeature([IdleEffects]),
          StoreModule.forFeature(oidcFeature),
        ],
        providers: [IdleFacade,
          {
            provide: IDLE_CONFIG, useValue: {
              timeoutWarningInMs: 2,
              autoLogoutInMs: 4
            }
          },
          { provide: Router, useValue: { navigateByUrl: jest.fn() } },
        ],
      })
      class CustomFeatureModule { }

      @NgModule({
        imports: [
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

    it('should extendSession', async () => {
      store.dispatch(oidcActionTypes.onSignInSilent({ access_token: null } as never));
      expect(await readFirst(store.select(oidcFeature.selectIsLoggedIn))).toBe(true);
      facade.extendSession();
      await sleep(2);
      expect(await readFirst(facade.isTimingOut$)).toBe(true);
      expect(await readFirst(store.select(oidcFeature.selectIsLoggedIn))).toBe(true);
    });

    it('should signout', async () => {
      store.dispatch(oidcActionTypes.onSignInSilent({ access_token: null } as never));
      expect(await readFirst(store.select(oidcFeature.selectIsLoggedIn))).toBe(true);
      await sleep(10);
      expect(await readFirst(store)).toMatchSnapshot();
    });
  });
});
