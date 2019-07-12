import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OidcFacade } from './facades/oidc.facade';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(private oidcFacade: OidcFacade, private router: Router) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.oidcFacade.loggedIn$.pipe(tap(t => {
      if (!t) this.router.navigate(['/']);
    }));
  }

  public canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.oidcFacade.loggedIn$.pipe(tap(t => {
      if (!t) this.router.navigate(['/']);
    }));
  }
}
