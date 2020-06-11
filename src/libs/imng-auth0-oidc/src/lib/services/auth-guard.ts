import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { OidcFacade } from '../+state/oidc.facade';
import { Injectable, Inject } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(@Inject(DOCUMENT) private readonly document: any, private readonly oidcFacade: OidcFacade) { }

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

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.isLoggedInPipe$;
  }
}
