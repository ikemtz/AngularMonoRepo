import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';
import { OidcEffects } from './oidc.effects';
import * as OidcActions from './oidc.actions';
import { OIDC_CONFIG } from '../models/config.model';
import { OidcService } from '../services/oidc.service';
import { HttpClient } from '@angular/common/http';

describe('Oidc Effects', () => {
  let actions: Observable<any>;
  let effects: OidcEffects;
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        OidcEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
        { provide: OIDC_CONFIG, useValue: { oidc_config: {}, getUserMetadata: true, } },
        OidcService,
        { provide: HttpClient, useValue: { get: () => of({ userinfo_endpoint: 'xyz' }) } }
      ],

    });

    effects = TestBed.inject(OidcEffects);
    service = TestBed.inject(OidcService);
  });

  describe('signInSilent$', () => {
    it('should fail because silent_redirect_uri is not configured', async done => {
      try {
        actions = of(OidcActions.signInSilent({}));
        const result = await readFirst(effects.signInSilent$);
        expect(result).toMatchSnapshot();
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });

    it('should work', async done => {
      try {
        actions = of(OidcActions.signInSilent({}));
        service.signInSilent = jest.fn(() => of(1));
        const result = await readFirst(effects.signInSilent$);
        expect(result).toMatchSnapshot();
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });
  });

  describe('signInPopup$', () => {
    it('should fail because silent_redirect_uri is not configured', async done => {
      try {
        actions = of(OidcActions.signInPopup({}));
        const result = await readFirst(effects.signInPopup$);
        expect(result).toMatchSnapshot();
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });

    it('should work', async done => {
      try {
        actions = of(OidcActions.signInPopup({}));
        service.signInPopup = jest.fn(() => of(1));
        const result = await readFirst(effects.signInPopup$);
        expect(result).toMatchSnapshot();
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });
  });

  describe('removeOidcUser$', () => {
    it('should fail because silent_redirect_uri is not configured', async done => {
      try {
        actions = of(OidcActions.removeOidcUser());
        service.removeOidcUser = jest.fn(() => throwError('Expected exception in unit tests.'));
        const result = await readFirst(effects.removeOidcUser$);
        expect(result).toMatchSnapshot();
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });
  });

  describe('signInRedirect$', () => {
    it('should signInRedirect', async done => {
      try {
        actions = of(OidcActions.signInRedirect({}));
        service.signInPopup = jest.fn(x => of('x'));
        const result = await readFirst(effects.signInRedirect$);
        expect(result).toMatchSnapshot();
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });

    it('should work', async done => {
      try {
        actions = of(OidcActions.signInRedirect({}));
        service.signInRedirect = jest.fn(() => of(1));
        service.signinRedirectCallback = jest.fn(() => of(1));
        const result = await readFirst(effects.signInRedirect$);
        expect(result).toMatchSnapshot();
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });
  });

  describe('signOutPopup$', () => {
    it('should fail because silent_redirect_uri is not configured', async done => {
      try {
        actions = of(OidcActions.signOutPopup({}));
        (window as any).open = jest.fn();
        const result = await readFirst(effects.signOutPopup$);
        expect(window.open).toBeCalledTimes(1);
        expect(result).toMatchSnapshot();
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });

    it('should work', async done => {
      try {
        actions = of(OidcActions.signOutPopup({}));
        service.signOutPopup = jest.fn(() => of(1));
        const result = await readFirst(effects.signOutPopup$);
        expect(result).toMatchSnapshot();
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });
  });

  describe('signOutRedirect$', () => {
    it('should fail because silent_redirect_uri is not configured', async done => {
      try {
        actions = of(OidcActions.signOutRedirect({}));
        const result = await readFirst(effects.signOutRedirect$);
        expect(result).toMatchSnapshot();
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });

    it('should work', async done => {
      try {
        actions = of(OidcActions.signOutRedirect({}));
        service.signOutRedirect = jest.fn(() => of(1));
        const result = await readFirst(effects.signOutRedirect$);
        expect(result).toMatchSnapshot();
        done();
      }
      catch (err) {
        done.fail(err);
      }
    });
  });

  describe('oidc effects', () => {
    it('should initialize', () => {
      const result = effects.ngrxOnInitEffects();
      expect(result).toStrictEqual({ type: "[Oidc] get oidc user" });
    });
  });
});
