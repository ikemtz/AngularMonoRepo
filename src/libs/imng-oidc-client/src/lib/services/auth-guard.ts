import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OidcFacade } from '../+state/oidc.facade';
import { Injectable, inject } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {
  private readonly document = inject(DOCUMENT);
  private readonly oidcFacade = inject(OidcFacade);
 //NOSONAR
  /**
   * This will automatically attempt to authenticate you when trying to access a protected route.
   */
  public readonly isLoggedInPipe$ = this.oidcFacade.waitForAuthenticationLoaded().pipe(
    switchMap(() => this.oidcFacade.loggedIn$),
    tap(t => {
      if (!t) {
        this.oidcFacade.signinRedirect({
          data: { redirect_url: this.document.location.href }
        });
      }
    })
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> { //NOSONAR
    return this.isLoggedInPipe$;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) //NOSONAR
    : Observable<boolean> {
    return this.isLoggedInPipe$;
  }
}
