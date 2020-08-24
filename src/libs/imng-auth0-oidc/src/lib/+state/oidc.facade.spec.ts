import { NgModule, InjectionToken } from '@angular/core';
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
import * as oidcActions from './oidc.actions';
import { OidcService } from '../services/oidc.service';
import { OidcFacade } from './oidc.facade';
import { OIDC_CONFIG, Config } from '../models/config.model';
import { of } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Auth0Facade } from './auth0.facade';

interface TestSchema {
  [OIDC_FEATURE_KEY]: OidcState;
}

describe('OidcFacade', () => {
  let facade: OidcFacade;
  let auth0Facade: Auth0Facade;
  let store: Store<TestSchema>;
  let service: OidcService;
  let oidcConfig: Config;

  beforeEach(() => { });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(OIDC_FEATURE_KEY, oidcReducer, { initialState }),
          EffectsModule.forFeature([OidcEffects]),
        ],
        providers: [OidcFacade, OidcService, Auth0Facade,
          { provide: OIDC_CONFIG, useValue: { getUserMetadata: true, oidc_config: { automaticSilentRenew: true }, log: { level: 0, logger: console } } },
          { provide: HttpClient, useValue: { get: () => of({ userinfo_endpoint: 'xyz' }) } },
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
      facade = TestBed.inject(OidcFacade);
      service = TestBed.inject(OidcService);
      oidcConfig = TestBed.inject(OIDC_CONFIG);
      auth0Facade = TestBed.inject(Auth0Facade);
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

    it('should getOidcUser with no metaData', async done => {
      try {
        oidcConfig.getUserMetadata = false;
        const oidcUser = {
          access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16azRRa1l4TVRCRE4wRXpSVFZGTXpJNE4wUXdRelJETVVSRU5UZ3pOVVpCTnpWRFFqbEdPQSJ9.eyJpc3MiOiJodHRwczovL25yc3J4LWRlbW8uYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExMzAyODgxMjE2NzkxNTQ2NjI2IiwiYXVkIjpbIklNLU51cnNlciIsImh0dHBzOi8vbnJzcngtZGVtby5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTkwMzg0NzQzLCJleHAiOjE1OTAzOTE5NDMsImF6cCI6Ikg4NjdSRGlFS0Q2V1B2cWVGRm5xVTJtMmc2MEY5Rkg3Iiwic2NvcGUiOiJvcGVuaWQgZW1haWwifQ.ukutcSkeYu_utBtV_pTNEGke6oQR-MYIV8SeA5KQLUKvrRxz7bzgi6FrjnSv8Tvw32gfCtanPbNm12VIqaaf8j0ER28RMIDP6jzsAJkScf4DDKCYGrJJNm1KCclSl2qNADqQUil59Ce98xtsAsTkkwAHenoOljYI90RFWQYJHWQkI_4IrClWcfyb33HKwCpz2wn3whbOFVDHAcubHE9NadptBzlt01cffFQEFWVyYZX0UaVqHCGwTNmSrGr_wlAfnuQRm2IhpKXaAZ3WKjDDtp85ZfAgHx-frGV6uVafmoMP1rAHnt37f8SLMu93hStunrsnJzbygzm_m08qg54l9A',
          expiresAt: '2020-05-25T07:32:25.941Z',
          id_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16azRRa1l4TVRCRE4wRXpSVFZGTXpJNE4wUXdRelJETVVSRU5UZ3pOVVpCTnpWRFFqbEdPQSJ9.eyJlbWFpbCI6ImlrZW10ekBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL25yc3J4LWRlbW8uYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExMzAyODgxMjE2NzkxNTQ2NjI2IiwiYXVkIjoiSDg2N1JEaUVLRDZXUHZxZUZGbnFVMm0yZzYwRjlGSDciLCJpYXQiOjE1OTAzODQ3NDMsImV4cCI6MTU5MDQyMDc0MywiYXRfaGFzaCI6InVFU1FxWU1UZXNwbFlZSWVBWl8wRFEiLCJub25jZSI6IjNkc3M0bmZPc2ZBbnNDREtJejE5bVY5dGhnd0h2NVJSIn0.pMe9aLarMI03ygDzEl-G96DH1gQTHB7tRO-3LiHh_WnHObVccmcUDpWXqt6N9FnRIokeBsfi-qerOOfJ06ep91C2w3A3FImcGS8FCBaC9C3MbEuEhqIac2hlKHXLvT8FwaFzxccXaFXMifdiujmsIX1IS3Ec2c8UrOBBbN1-bDXbElf4A9hGH7rY2YC0w774KQMO0-qkz7_x3GkJWuVAW3zPWSBnQ7wLj8Me2Css251TVNWZJKXo3EzxORXcmCYn4noboTW5Bc1M7hYQ4M3JWs5P4ycU_6W2VDoP1g49tZvcSUNLsT-Dn7Ge97Qvymg8gB0hUmigwLKHpZmfivw9gw',
          userName: 'ikemtz@outlook.com',
          toStorageString: jest.fn()
        };
        const getUserMock = jest.fn(() => of(oidcUser as any));
        const removeUserMock = jest.fn(() => new Promise<void>(resolve => resolve()));
        (service as any)._oidcUserManager.getUser = getUserMock;
        (service as any)._oidcUserManager.removeUser = removeUserMock;
        facade.getOidcUser();
        const getResult = await readFirst(facade.identity$);
        expect(getResult).toMatchSnapshot('identity');
        expect(await readFirst(facade.waitForAuthenticationLoaded())).toBe(true);
        expect(await readFirst(facade.permissions$)).toMatchSnapshot('permissions');
        expect(await readFirst(facade.userMetadata$)).toMatchSnapshot('userMetadata');
        expect(await readFirst(auth0Facade.permissions$)).toMatchSnapshot('auth0_permissions');
        expect(await readFirst(auth0Facade.email$)).toMatchSnapshot('email');
        expect(await readFirst(auth0Facade.profilePicture$)).toMatchSnapshot('profilePicture');

        expect(await readFirst(auth0Facade.hasPermissions(['requiredPermission']))).toBe(false);
        expect(getUserMock).toBeCalledTimes(1);

        done();
      } catch (err) {
        done.fail(err);
      }
    });


    it('should getOidcUser and removeOidcUser', async done => {
      try {
        const oidcUser = {
          access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16azRRa1l4TVRCRE4wRXpSVFZGTXpJNE4wUXdRelJETVVSRU5UZ3pOVVpCTnpWRFFqbEdPQSJ9.eyJpc3MiOiJodHRwczovL25yc3J4LWRlbW8uYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExMzAyODgxMjE2NzkxNTQ2NjI2IiwiYXVkIjpbIklNLU51cnNlciIsImh0dHBzOi8vbnJzcngtZGVtby5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTkwMzg0NzQzLCJleHAiOjE1OTAzOTE5NDMsImF6cCI6Ikg4NjdSRGlFS0Q2V1B2cWVGRm5xVTJtMmc2MEY5Rkg3Iiwic2NvcGUiOiJvcGVuaWQgZW1haWwifQ.ukutcSkeYu_utBtV_pTNEGke6oQR-MYIV8SeA5KQLUKvrRxz7bzgi6FrjnSv8Tvw32gfCtanPbNm12VIqaaf8j0ER28RMIDP6jzsAJkScf4DDKCYGrJJNm1KCclSl2qNADqQUil59Ce98xtsAsTkkwAHenoOljYI90RFWQYJHWQkI_4IrClWcfyb33HKwCpz2wn3whbOFVDHAcubHE9NadptBzlt01cffFQEFWVyYZX0UaVqHCGwTNmSrGr_wlAfnuQRm2IhpKXaAZ3WKjDDtp85ZfAgHx-frGV6uVafmoMP1rAHnt37f8SLMu93hStunrsnJzbygzm_m08qg54l9A',
          expiresAt: '2020-05-25T07:32:25.941Z',
          id_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16azRRa1l4TVRCRE4wRXpSVFZGTXpJNE4wUXdRelJETVVSRU5UZ3pOVVpCTnpWRFFqbEdPQSJ9.eyJlbWFpbCI6ImlrZW10ekBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL25yc3J4LWRlbW8uYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExMzAyODgxMjE2NzkxNTQ2NjI2IiwiYXVkIjoiSDg2N1JEaUVLRDZXUHZxZUZGbnFVMm0yZzYwRjlGSDciLCJpYXQiOjE1OTAzODQ3NDMsImV4cCI6MTU5MDQyMDc0MywiYXRfaGFzaCI6InVFU1FxWU1UZXNwbFlZSWVBWl8wRFEiLCJub25jZSI6IjNkc3M0bmZPc2ZBbnNDREtJejE5bVY5dGhnd0h2NVJSIn0.pMe9aLarMI03ygDzEl-G96DH1gQTHB7tRO-3LiHh_WnHObVccmcUDpWXqt6N9FnRIokeBsfi-qerOOfJ06ep91C2w3A3FImcGS8FCBaC9C3MbEuEhqIac2hlKHXLvT8FwaFzxccXaFXMifdiujmsIX1IS3Ec2c8UrOBBbN1-bDXbElf4A9hGH7rY2YC0w774KQMO0-qkz7_x3GkJWuVAW3zPWSBnQ7wLj8Me2Css251TVNWZJKXo3EzxORXcmCYn4noboTW5Bc1M7hYQ4M3JWs5P4ycU_6W2VDoP1g49tZvcSUNLsT-Dn7Ge97Qvymg8gB0hUmigwLKHpZmfivw9gw',
          userName: 'ikemtz@outlook.com',
          toStorageString: jest.fn()
        };
        const getUserMock = jest.fn(() => of(oidcUser as any));
        const removeUserMock = jest.fn(() => new Promise<void>(resolve => resolve()));
        (service as any)._oidcUserManager.getUser = getUserMock;
        (service as any)._oidcUserManager.removeUser = removeUserMock;
        facade.getOidcUser();
        const getResult = await readFirst(facade.identity$);
        expect(getResult).toMatchSnapshot('identity');
        expect(await readFirst(facade.waitForAuthenticationLoaded())).toBe(true);
        expect(await readFirst(facade.permissions$)).toMatchSnapshot('permissions');
        expect(await readFirst(facade.userMetadata$)).toMatchSnapshot('userMetadata');
        expect(await readFirst(auth0Facade.permissions$)).toMatchSnapshot('auth0_permissions');
        expect(await readFirst(auth0Facade.email$)).toMatchSnapshot('email');
        expect(await readFirst(auth0Facade.profilePicture$)).toMatchSnapshot('profilePicture');

        expect(await readFirst(auth0Facade.hasPermissions(['requiredPermission']))).toBe(false);
        expect(getUserMock).toBeCalledTimes(1);

        facade.removeOidcUser();
        const removeResult = await readFirst(facade.identity$);
        expect(removeResult).toBeNull();
        expect(removeUserMock).toBeCalledTimes(1);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should addUserLoaded and addUserSignedOut', async done => {
      try {
        const oidcUser = {
          access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16azRRa1l4TVRCRE4wRXpSVFZGTXpJNE4wUXdRelJETVVSRU5UZ3pOVVpCTnpWRFFqbEdPQSJ9.eyJpc3MiOiJodHRwczovL25yc3J4LWRlbW8uYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExMzAyODgxMjE2NzkxNTQ2NjI2IiwiYXVkIjpbIklNLU51cnNlciIsImh0dHBzOi8vbnJzcngtZGVtby5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTkwMzg0NzQzLCJleHAiOjE1OTAzOTE5NDMsImF6cCI6Ikg4NjdSRGlFS0Q2V1B2cWVGRm5xVTJtMmc2MEY5Rkg3Iiwic2NvcGUiOiJvcGVuaWQgZW1haWwifQ.ukutcSkeYu_utBtV_pTNEGke6oQR-MYIV8SeA5KQLUKvrRxz7bzgi6FrjnSv8Tvw32gfCtanPbNm12VIqaaf8j0ER28RMIDP6jzsAJkScf4DDKCYGrJJNm1KCclSl2qNADqQUil59Ce98xtsAsTkkwAHenoOljYI90RFWQYJHWQkI_4IrClWcfyb33HKwCpz2wn3whbOFVDHAcubHE9NadptBzlt01cffFQEFWVyYZX0UaVqHCGwTNmSrGr_wlAfnuQRm2IhpKXaAZ3WKjDDtp85ZfAgHx-frGV6uVafmoMP1rAHnt37f8SLMu93hStunrsnJzbygzm_m08qg54l9A',
          expiresAt: '2020-05-25T07:32:25.941Z',
          id_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16azRRa1l4TVRCRE4wRXpSVFZGTXpJNE4wUXdRelJETVVSRU5UZ3pOVVpCTnpWRFFqbEdPQSJ9.eyJlbWFpbCI6ImlrZW10ekBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL25yc3J4LWRlbW8uYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExMzAyODgxMjE2NzkxNTQ2NjI2IiwiYXVkIjoiSDg2N1JEaUVLRDZXUHZxZUZGbnFVMm0yZzYwRjlGSDciLCJpYXQiOjE1OTAzODQ3NDMsImV4cCI6MTU5MDQyMDc0MywiYXRfaGFzaCI6InVFU1FxWU1UZXNwbFlZSWVBWl8wRFEiLCJub25jZSI6IjNkc3M0bmZPc2ZBbnNDREtJejE5bVY5dGhnd0h2NVJSIn0.pMe9aLarMI03ygDzEl-G96DH1gQTHB7tRO-3LiHh_WnHObVccmcUDpWXqt6N9FnRIokeBsfi-qerOOfJ06ep91C2w3A3FImcGS8FCBaC9C3MbEuEhqIac2hlKHXLvT8FwaFzxccXaFXMifdiujmsIX1IS3Ec2c8UrOBBbN1-bDXbElf4A9hGH7rY2YC0w774KQMO0-qkz7_x3GkJWuVAW3zPWSBnQ7wLj8Me2Css251TVNWZJKXo3EzxORXcmCYn4noboTW5Bc1M7hYQ4M3JWs5P4ycU_6W2VDoP1g49tZvcSUNLsT-Dn7Ge97Qvymg8gB0hUmigwLKHpZmfivw9gw',
          userName: 'ikemtz@outlook.com',
          toStorageString: jest.fn()
        };
        const removeUserMock = jest.fn(() => new Promise<void>(resolve => resolve()));
        (service as any)._oidcUserManager.removeUser = removeUserMock;
        facade.addUserLoaded(oidcUser as any);
        const getResult = await readFirst(facade.identity$);
        expect(getResult).toMatchSnapshot('identity');
        expect(await readFirst(facade.waitForAuthenticationLoaded())).toBe(true);
        expect(await readFirst(auth0Facade.profile$)).toMatchSnapshot('profile');

        facade.addUserSignedOut();
        const removeResult = await readFirst(facade.identity$);
        expect(removeResult).toBeNull();
        expect(removeUserMock).toBeCalledTimes(1);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should handle accessTokenExpired', async done => {
      try {
        const oidcUser = {
          access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16azRRa1l4TVRCRE4wRXpSVFZGTXpJNE4wUXdRelJETVVSRU5UZ3pOVVpCTnpWRFFqbEdPQSJ9.eyJpc3MiOiJodHRwczovL25yc3J4LWRlbW8uYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExMzAyODgxMjE2NzkxNTQ2NjI2IiwiYXVkIjpbIklNLU51cnNlciIsImh0dHBzOi8vbnJzcngtZGVtby5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTkwMzg0NzQzLCJleHAiOjE1OTAzOTE5NDMsImF6cCI6Ikg4NjdSRGlFS0Q2V1B2cWVGRm5xVTJtMmc2MEY5Rkg3Iiwic2NvcGUiOiJvcGVuaWQgZW1haWwifQ.ukutcSkeYu_utBtV_pTNEGke6oQR-MYIV8SeA5KQLUKvrRxz7bzgi6FrjnSv8Tvw32gfCtanPbNm12VIqaaf8j0ER28RMIDP6jzsAJkScf4DDKCYGrJJNm1KCclSl2qNADqQUil59Ce98xtsAsTkkwAHenoOljYI90RFWQYJHWQkI_4IrClWcfyb33HKwCpz2wn3whbOFVDHAcubHE9NadptBzlt01cffFQEFWVyYZX0UaVqHCGwTNmSrGr_wlAfnuQRm2IhpKXaAZ3WKjDDtp85ZfAgHx-frGV6uVafmoMP1rAHnt37f8SLMu93hStunrsnJzbygzm_m08qg54l9A',
          expiresAt: '2020-05-25T07:32:25.941Z',
          id_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16azRRa1l4TVRCRE4wRXpSVFZGTXpJNE4wUXdRelJETVVSRU5UZ3pOVVpCTnpWRFFqbEdPQSJ9.eyJlbWFpbCI6ImlrZW10ekBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL25yc3J4LWRlbW8uYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExMzAyODgxMjE2NzkxNTQ2NjI2IiwiYXVkIjoiSDg2N1JEaUVLRDZXUHZxZUZGbnFVMm0yZzYwRjlGSDciLCJpYXQiOjE1OTAzODQ3NDMsImV4cCI6MTU5MDQyMDc0MywiYXRfaGFzaCI6InVFU1FxWU1UZXNwbFlZSWVBWl8wRFEiLCJub25jZSI6IjNkc3M0bmZPc2ZBbnNDREtJejE5bVY5dGhnd0h2NVJSIn0.pMe9aLarMI03ygDzEl-G96DH1gQTHB7tRO-3LiHh_WnHObVccmcUDpWXqt6N9FnRIokeBsfi-qerOOfJ06ep91C2w3A3FImcGS8FCBaC9C3MbEuEhqIac2hlKHXLvT8FwaFzxccXaFXMifdiujmsIX1IS3Ec2c8UrOBBbN1-bDXbElf4A9hGH7rY2YC0w774KQMO0-qkz7_x3GkJWuVAW3zPWSBnQ7wLj8Me2Css251TVNWZJKXo3EzxORXcmCYn4noboTW5Bc1M7hYQ4M3JWs5P4ycU_6W2VDoP1g49tZvcSUNLsT-Dn7Ge97Qvymg8gB0hUmigwLKHpZmfivw9gw',
          userName: 'ikemtz@outlook.com',
          expired: true,
        };
        store.dispatch(oidcActions.userFound(oidcUser as any));

        facade.accessTokenExpired();
        const result = await readFirst(facade.identity$);
        expect(result).toBeNull();
        expect(await readFirst(facade.expired$)).toBe(true);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should handle accessTokenExpiring', async done => {
      try {
        const oidcUser = {
          access_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16azRRa1l4TVRCRE4wRXpSVFZGTXpJNE4wUXdRelJETVVSRU5UZ3pOVVpCTnpWRFFqbEdPQSJ9.eyJpc3MiOiJodHRwczovL25yc3J4LWRlbW8uYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExMzAyODgxMjE2NzkxNTQ2NjI2IiwiYXVkIjpbIklNLU51cnNlciIsImh0dHBzOi8vbnJzcngtZGVtby5hdXRoMC5jb20vdXNlcmluZm8iXSwiaWF0IjoxNTkwMzg0NzQzLCJleHAiOjE1OTAzOTE5NDMsImF6cCI6Ikg4NjdSRGlFS0Q2V1B2cWVGRm5xVTJtMmc2MEY5Rkg3Iiwic2NvcGUiOiJvcGVuaWQgZW1haWwifQ.ukutcSkeYu_utBtV_pTNEGke6oQR-MYIV8SeA5KQLUKvrRxz7bzgi6FrjnSv8Tvw32gfCtanPbNm12VIqaaf8j0ER28RMIDP6jzsAJkScf4DDKCYGrJJNm1KCclSl2qNADqQUil59Ce98xtsAsTkkwAHenoOljYI90RFWQYJHWQkI_4IrClWcfyb33HKwCpz2wn3whbOFVDHAcubHE9NadptBzlt01cffFQEFWVyYZX0UaVqHCGwTNmSrGr_wlAfnuQRm2IhpKXaAZ3WKjDDtp85ZfAgHx-frGV6uVafmoMP1rAHnt37f8SLMu93hStunrsnJzbygzm_m08qg54l9A',
          expiresAt: '2020-05-25T07:32:25.941Z',
          id_token: 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ik16azRRa1l4TVRCRE4wRXpSVFZGTXpJNE4wUXdRelJETVVSRU5UZ3pOVVpCTnpWRFFqbEdPQSJ9.eyJlbWFpbCI6ImlrZW10ekBvdXRsb29rLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczovL25yc3J4LWRlbW8uYXV0aDAuY29tLyIsInN1YiI6Imdvb2dsZS1vYXV0aDJ8MTExMzAyODgxMjE2NzkxNTQ2NjI2IiwiYXVkIjoiSDg2N1JEaUVLRDZXUHZxZUZGbnFVMm0yZzYwRjlGSDciLCJpYXQiOjE1OTAzODQ3NDMsImV4cCI6MTU5MDQyMDc0MywiYXRfaGFzaCI6InVFU1FxWU1UZXNwbFlZSWVBWl8wRFEiLCJub25jZSI6IjNkc3M0bmZPc2ZBbnNDREtJejE5bVY5dGhnd0h2NVJSIn0.pMe9aLarMI03ygDzEl-G96DH1gQTHB7tRO-3LiHh_WnHObVccmcUDpWXqt6N9FnRIokeBsfi-qerOOfJ06ep91C2w3A3FImcGS8FCBaC9C3MbEuEhqIac2hlKHXLvT8FwaFzxccXaFXMifdiujmsIX1IS3Ec2c8UrOBBbN1-bDXbElf4A9hGH7rY2YC0w774KQMO0-qkz7_x3GkJWuVAW3zPWSBnQ7wLj8Me2Css251TVNWZJKXo3EzxORXcmCYn4noboTW5Bc1M7hYQ4M3JWs5P4ycU_6W2VDoP1g49tZvcSUNLsT-Dn7Ge97Qvymg8gB0hUmigwLKHpZmfivw9gw',
          userName: 'ikemtz@outlook.com',
        };
        store.dispatch(oidcActions.userFound(oidcUser as any));

        facade.accessTokenExpiring();
        expect(await readFirst(facade.expiring$)).toBe(true);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should handle clearingHttpErrors', async done => {
      try {
        store.dispatch(oidcActions.setHttpError(new HttpErrorResponse({ error: new Error('this is an expected error during unit tests, do not be alarmed!') })));
        const initialresult: any = await readFirst(facade.httpError$);
        expect(initialresult).toMatchSnapshot();
        expect(await readFirst(facade.hasErrors$)).toBe(true);
        facade.clearErrors();
        const result: any = await readFirst(store);
        expect(result.errors).toBeFalsy();
        expect(await readFirst(facade.hasErrors$)).toBe(false);
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should handle clearingSilentRenewErrors', async done => {
      try {
        const exception = new Error('this is an expected error during unit tests, do not be alarmed!');
        facade.addSilentRenewError(exception);
        const initialresult: any = await readFirst(facade.silentRenewError$);
        expect(initialresult).toMatchSnapshot();
        expect(await readFirst(facade.hasErrors$)).toBe(true);
        expect(await readFirst(facade.silentRenewError$)).toBe(exception);
        facade.clearErrors();
        expect(await readFirst(facade.hasErrors$)).toBe(false);
        expect(await readFirst(facade.silentRenewError$)).toBeFalsy();
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should support signInRedirect', async done => {
      try {
        const mockSigninRedirect = jest.fn(() => of());
        (service as any)._oidcUserManager.signinRedirect = mockSigninRedirect;
        facade.signinRedirect({ redirect_uri: '🐱🐱🐱' });
        expect(mockSigninRedirect).toBeCalledTimes(1);
        expect(mockSigninRedirect).toBeCalledWith({ redirect_uri: '🐱🐱🐱' });
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should support signinSilent', async done => {
      try {
        const mockSigninSilent = jest.fn(() => of());
        (service as any)._oidcUserManager.signinSilent = mockSigninSilent;
        facade.signinSilent({ redirect_uri: '🐱🐱🐱' });
        expect(mockSigninSilent).toBeCalledTimes(1);
        expect(mockSigninSilent).toBeCalledWith({ redirect_uri: '🐱🐱🐱' });
        done();
      } catch (err) {
        done.fail(err);
      }
    });

    it('should handle accessTokenExpired without a store', () => {
      sessionStorage.setItem('unit_test', 'validation');
      (<any>facade).store = null;
      facade.accessTokenExpired();
      expect(sessionStorage.getItem('unit_test')).toBeNull();
    });
  });
});
