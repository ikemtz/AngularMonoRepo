import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OidcFacade } from './facades/oidc.facade';
import { Injectable } from '@angular/core';
import { tap, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private oidcFacade: OidcFacade, private router: Router) { }

  private isLoggedInPipe$ = this.oidcFacade.waitForAuthenticationLoaded().pipe(
    switchMap(() => this.oidcFacade.loggedIn$),
    tap(t => {
      if (!t) this.oidcFacade.signinRedirect({
        data: { redirect_url: this.router.url }
      });
    })
  );

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.isLoggedInPipe$;
  }

  public canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.isLoggedInPipe$;
  }
}
