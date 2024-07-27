/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OidcMockFacade {
  constructor() {}

  loggedIn$: Observable<boolean> = of(true);
  /**
   * Convenient function to wait for OIDC dependencies to be loaded.
   */
  public waitForAuthenticationLoaded(): Observable<boolean> {
    return of(true);
  }
}
