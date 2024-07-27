import { TestBed } from '@angular/core/testing';

import { PermissionsGuard } from './permissions.guard';
import { OidcFacade } from '../+state/oidc.facade';
import { OidcUserFacade } from '../+state/oidc-user.facade';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { readFirst } from 'imng-ngrx-utils/testing';

describe('PermissionsGuard', () => {
  let guard: PermissionsGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: OidcFacade,
          useValue: { waitForAuthenticationLoaded: jest.fn(() => of(true)) },
        },
        {
          provide: OidcUserFacade,
          useValue: { hasPermissions: jest.fn(() => of(false)) },
        },
        {
          provide: Router,
          useValue: { navigate: jest.fn(), routerState: { root: '🌳🌳🌳' } },
        },
        PermissionsGuardTester,
      ],
    });
    guard = TestBed.inject(PermissionsGuardTester);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should support canActivate', async () => {
    const result = await readFirst(
      guard.canActivate(null as never, null as never) as Observable<boolean>,
    );
    expect(result).toBe(false);
    expect(router.navigate).toBeCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledWith(['oidc/access-denied'], {
      relativeTo: '🌳🌳🌳',
    });
  });
});

@Injectable()
class PermissionsGuardTester extends PermissionsGuard {
  protected permissions = ['tester'];
  constructor(
    oidcFacade: OidcFacade,
    oidcUserFacade: OidcUserFacade,
    router: Router,
  ) {
    super(oidcFacade, oidcUserFacade, router);
  }
}
