import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OidcFacade } from '../+state/oidc.facade';
import { switchMap, tap, } from 'rxjs/operators';
import { Auth0Facade } from '../+state/auth0.facade';

export abstract class PermissionsGuard implements CanActivate {
  constructor(private readonly oidcFacade: OidcFacade, private readonly auth0Facade: Auth0Facade, private readonly router: Router) { }

  protected abstract permissions: string[] = [];

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.oidcFacade.waitForAuthenticationLoaded().pipe(
      switchMap(() => this.auth0Facade.hasPermissions(this.permissions)),
      tap(t => {
        if (!t) {
          this.router.navigate(['oidc/access-denied'], { relativeTo: this.router.routerState.root });
        }
      }));
  }
}
