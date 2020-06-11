import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import { OidcEffects } from './oidc.effects';
import {
  OidcState,
  initialState,
  oidcReducer,
  OIDC_FEATURE_KEY
} from './oidc.reducer';
import { OidcService } from '../services/oidc.service';
import { OidcFacade } from './oidc.facade';
import { OIDC_CONFIG } from '../models/config.model';
import { of } from 'rxjs';

interface TestSchema {
  [OIDC_FEATURE_KEY]: OidcState;
}



describe('OidcFacade', () => {
  let facade: OidcFacade;
  let store: Store<TestSchema>;
  let service: OidcService;

  beforeEach(() => { });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(OIDC_FEATURE_KEY, oidcReducer, { initialState }),
          EffectsModule.forFeature([OidcEffects]),
        ],
        providers: [OidcFacade, OidcService,
          { provide: OIDC_CONFIG, useValue: { oidc_config: {} } }],
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
      facade = TestBed.inject(OidcFacade);
      service = TestBed.inject(OidcService);
    });

    it('current state should match initial', async done => {
      try {
        expect(store).toBeTruthy();
        expect(await readFirst(facade.loading$)).toBe(false);
        expect(await readFirst(facade.expiring$)).toBe(false);

        done();
      } catch (err) {
        done.fail(err);
      }
    });



    it('current state should match initial', async done => {
      try {
        const oidcUser = {
          access_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16azRRa1l4TVRCRE4wRXpSVFZGTXpJNE4wUXdRelJETVVSRU5UZ3pOVVpCTnpWRFFqbEdPQSJ9.eyJpc3MiOiJodHRwczovL25yc3J4LWRlbW8uYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExMzAyODgxMjE2NzkxNTQ2NjI2IiwiYXVkIjpbIklNLU51cnNlciIsImh0dHBzOi8vbnJzcngtZGVtby5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTkwMzg0NzQzLCJleHAiOjE1OTAzOTE5NDMsImF6cCI6Ikg4NjdSRGlFS0Q2V1B2cWVGRm5xVTJtMmc2MEY5Rkg3Iiwic2NvcGUiOiJvcGVuaWQgZW1haWwifQ.ukutcSkeYu_utBtV_pTNEGke6oQR-MYIV8SeA5KQLUKvrRxz7bzgi6FrjnSv8Tvw32gfCtanPbNm12VIqaaf8j0ER28RMIDP6jzsAJkScf4DDKCYGrJJNm1KCclSl2qNADqQUil59Ce98xtsAsTkkwAHenoOljYI90RFWQYJHWQkI_4IrClWcfyb33HKwCpz2wn3whbOFVDHAcubHE9NadptBzlt01cffFQEFWVyYZX0UaVqHCGwTNmSrGr_wlAfnuQRm2IhpKXaAZ3WKjDDtp85ZfAgHx-frGV6uVafmoMP1rAHnt37f8SLMu93hStunrsnJzbygzm_m08qg54l9A",
          expiresAt: "2020-05-25T07:32:25.941Z",
          id_token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16azRRa1l4TVRCRE4wRXpSVFZGTXpJNE4wUXdRelJETVVSRU5UZ3pOVVpCTnpWRFFqbEdPQSJ9.eyJlbWFpbCI6ImlrZW10ekBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL25yc3J4LWRlbW8uYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExMzAyODgxMjE2NzkxNTQ2NjI2IiwiYXVkIjoiSDg2N1JEaUVLRDZXUHZxZUZGbnFVMm0yZzYwRjlGSDciLCJpYXQiOjE1OTAzODQ3NDMsImV4cCI6MTU5MDQyMDc0MywiYXRfaGFzaCI6InVFU1FxWU1UZXNwbFlZSWVBWl8wRFEiLCJub25jZSI6IjNkc3M0bmZPc2ZBbnNDREtJejE5bVY5dGhnd0h2NVJSIn0.pMe9aLarMI03ygDzEl-G96DH1gQTHB7tRO-3LiHh_WnHObVccmcUDpWXqt6N9FnRIokeBsfi-qerOOfJ06ep91C2w3A3FImcGS8FCBaC9C3MbEuEhqIac2hlKHXLvT8FwaFzxccXaFXMifdiujmsIX1IS3Ec2c8UrOBBbN1-bDXbElf4A9hGH7rY2YC0w774KQMO0-qkz7_x3GkJWuVAW3zPWSBnQ7wLj8Me2Css251TVNWZJKXo3EzxORXcmCYn4noboTW5Bc1M7hYQ4M3JWs5P4ycU_6W2VDoP1g49tZvcSUNLsT-Dn7Ge97Qvymg8gB0hUmigwLKHpZmfivw9gw",
          userName: "ikemtz@outlook.com",
          toStorageString: jest.fn()
        };
        service.getOidcUser = jest.fn(() => of(oidcUser as any));
        facade.getOidcUser();
        const result = await readFirst(facade.identity$);
        expect(result).toMatchSnapshot();
        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
