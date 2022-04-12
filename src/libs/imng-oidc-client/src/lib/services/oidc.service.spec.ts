import { TestBed } from '@angular/core/testing';
import { OidcService } from './oidc.service';
import { OIDC_LIBRARY_CONFIG } from '../models/oidc-library-config';
import { OidcEvent } from '../models/constants';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('OidcService', () => {
  let service: OidcService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OIDC_LIBRARY_CONFIG,
          useValue: { oidc_config: {}, getUserMetadata: true },
        },
        {
          provide: HttpClient,
          useValue: { get: () => of({ userinfo_endpoint: 'xyz' }) },
        },
      ],
    });
    service = TestBed.inject(OidcService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a _oidcUserManager defined', () => {
    expect(service.getUserManager()).toBeTruthy();
  });

  it('should have a getOidcClient defined', () => {
    expect(service.getOidcClient()).toBeTruthy();
  });

  it('should handle signInPopup', () => {
    service.getUserManager().signinPopup = jest.fn(
      () => new Promise(() => null)
    );
    service.signInPopup();
    expect(service.getUserManager().signinPopup).toBeCalledTimes(1);
  });

  it('should handle signinPopupCallback', () => {
    service.getUserManager().signinPopupCallback = jest.fn(
      () => new Promise(() => null)
    );
    service.signinPopupCallback();
    expect(service.getUserManager().signinPopupCallback).toBeCalledTimes(1);
  });

  it('should handle removeOidcEvents', () => {
    service.getUserManager().events.removeAccessTokenExpired = jest.fn();
    service.removeOidcEvent(OidcEvent.AccessTokenExpired, jest.fn());
    expect(
      service.getUserManager().events.removeAccessTokenExpired
    ).toBeCalledTimes(1);
  });

  it('should handle AccessTokenExpiring', () => {
    service.getUserManager().events.removeAccessTokenExpiring = jest.fn();
    service.removeOidcEvent(OidcEvent.AccessTokenExpiring, jest.fn());
    expect(
      service.getUserManager().events.removeAccessTokenExpiring
    ).toBeCalledTimes(1);
  });

  it('should handle SilentRenewError', () => {
    service.getUserManager().events.removeSilentRenewError = jest.fn();
    service.removeOidcEvent(OidcEvent.SilentRenewError, jest.fn());
    expect(
      service.getUserManager().events.removeSilentRenewError
    ).toBeCalledTimes(1);
  });

  it('should handle UserLoaded', () => {
    service.getUserManager().events.removeUserLoaded = jest.fn();
    service.removeOidcEvent(OidcEvent.UserLoaded, jest.fn());
    expect(service.getUserManager().events.removeUserLoaded).toBeCalledTimes(1);
  });

  it('should handle UserSessionChanged', () => {
    service.getUserManager().events.removeUserSessionChanged = jest.fn();
    service.removeOidcEvent(OidcEvent.UserSessionChanged, jest.fn());
    expect(
      service.getUserManager().events.removeUserSessionChanged
    ).toBeCalledTimes(1);
  });

  it('should handle UserSignedOut', () => {
    service.getUserManager().events.removeUserSignedOut = jest.fn();
    service.removeOidcEvent(OidcEvent.UserSignedOut, jest.fn());
    expect(service.getUserManager().events.removeUserSignedOut).toBeCalledTimes(
      1
    );
  });

  it('should handle UserUnloaded', () => {
    service.getUserManager().events.removeUserUnloaded = jest.fn();
    service.removeOidcEvent(OidcEvent.UserUnloaded, jest.fn());
    expect(service.getUserManager().events.removeUserUnloaded).toBeCalledTimes(
      1
    );
  });
});
