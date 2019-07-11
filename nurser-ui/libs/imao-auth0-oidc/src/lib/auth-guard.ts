import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, first } from 'rxjs/operators';
import { OidcFacade } from './facades/oidc.facade';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private oidcFacade: OidcFacade) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    return this.oidcFacade.waitForAuthenticationLoaded().pipe(
      switchMap(loading => {
        return this.oidcFacade.identity$.pipe(
          first(),
          switchMap(user => {
            if (user && !user.expired) {
              return of(true);
            } else {
              this.router.navigate(['/']);
              return of(false);
            }
          })
        );
      })
    );
  }
}
