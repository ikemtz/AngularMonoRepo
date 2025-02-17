/* eslint-disable @typescript-eslint/no-explicit-any */
import { TestBed } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { readFirst } from 'imng-ngrx-utils/testing';
import { OidcEffects } from './oidc.effects';
import * as OidcActions from './oidc.actions';
import { OIDC_LIBRARY_CONFIG } from '../models/oidc-library-config';
import { OidcService } from '../services/oidc.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

describe('Oidc Effects', () => {
  let actions: Observable<any>;
  let effects: OidcEffects;
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OidcEffects,
        provideMockActions(() => actions),
        provideMockStore(),
        {
          provide: OIDC_LIBRARY_CONFIG,
          useValue: { oidc_config: {}, getUserMetadata: true },
        },
        OidcService,
        {
          provide: HttpClient,
          useValue: { get: () => of({ userinfo_endpoint: 'xyz' }) },
        },
        { provide: Router, useValue: { navigateByUrl: jest.fn() } },
      ],
    });

    effects = TestBed.inject(OidcEffects);
    service = TestBed.inject(OidcService);
  });

  describe('signInSilent$', () => {
    it('should fail because silent_redirect_uri is not configured', async () => {
      actions = of(OidcActions.signInSilent({}));
      const result = await readFirst(effects.signInSilent$);
      expect(result).toMatchSnapshot();
    });

    it('should work', async () => {
      actions = of(OidcActions.signInSilent({}));
      service.signInSilent = jest.fn(() => of(1));
      const result = await readFirst(effects.signInSilent$);
      expect(result).toMatchSnapshot();
    });
  });

  describe('signInPopup$', () => {
    it('should fail because silent_redirect_uri is not configured', async () => {
      actions = of(OidcActions.signInPopup({}));
      const result = await readFirst(effects.signInPopup$);
      expect(result).toMatchSnapshot();
    });

    it('should work', async () => {
      actions = of(OidcActions.signInPopup({}));
      service.signInPopup = jest.fn(() => of(1));
      const result = await readFirst(effects.signInPopup$);
      expect(result).toMatchSnapshot();
    });
  });

  describe('removeOidcUser$', () => {
    it('should fail because silent_redirect_uri is not configured', async () => {
      actions = of(OidcActions.removeOidcUser());
      service.removeOidcUser = jest.fn(() =>
        throwError(() => new Error('Expected exception in unit tests.')),
      );
      const result = await readFirst(effects.removeOidcUser$);
      expect(result).toMatchSnapshot();
    });
  });

  describe('signInRedirect$', () => {
    it('should signInRedirect', async () => {
      actions = of(OidcActions.signInRedirect({}));
      service.signInPopup = jest.fn(() => of('x'));
      const result = await readFirst(effects.signInRedirect$);
      expect(result).toMatchSnapshot();
    });

    it('should work', async () => {
      actions = of(OidcActions.signInRedirect({}));
      service.signInRedirect = jest.fn(() => of(1));
      service.signinRedirectCallback = jest.fn(() => of(1));
      const result = await readFirst(effects.signInRedirect$);
      expect(result).toMatchSnapshot();
    });
  });

  describe('signOutPopup$', () => {
    it('should fail because silent_redirect_uri is not configured', async () => {
      actions = of(OidcActions.signOutPopup({}));
      (window as any).open = jest.fn();
      const result = await readFirst(effects.signOutPopup$);
      expect(window.open).toHaveBeenCalledTimes(1);
      expect(result).toMatchSnapshot();
    });

    it('should work', async () => {
      actions = of(OidcActions.signOutPopup({}));
      service.signOutPopup = jest.fn(() => of(1));
      const result = await readFirst(effects.signOutPopup$);
      expect(result).toMatchSnapshot();
    });
  });

  describe('signOutRedirect$', () => {
    it('should fail because silent_redirect_uri is not configured', async () => {
      actions = of(OidcActions.signOutRedirect({}));
      const result = await readFirst(effects.signOutRedirect$);
      expect(result).toMatchSnapshot();
    });

    it('should work', async () => {
      actions = of(OidcActions.signOutRedirect({}));
      service.signOutRedirect = jest.fn(() => of(1));
      const result = await readFirst(effects.signOutRedirect$);
      expect(result).toMatchSnapshot();
    });
  });

  describe('oidc effects', () => {
    it('should initialize', () => {
      const result = effects.ngrxOnInitEffects();
      expect(result).toStrictEqual({ type: '[Oidc] get oidc user' });
    });
  });
});
