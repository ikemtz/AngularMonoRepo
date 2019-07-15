import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OidcFacade } from '../+state/oidc.facade';
import { switchMap, tap, } from 'rxjs/operators';
import { Auth0Facade } from '../+state/auth0.facade';

export const AccessDeniedRouteUrl = 'access-denied';

export abstract class PermissionsGuard implements CanActivate {
  constructor(private oidcFacade: OidcFacade, private auth0Facade: Auth0Facade, private router: Router) { }

  protected abstract permissions: string[];
  private hasPermissions$ = this.oidcFacade.waitForAuthenticationLoaded().pipe(
    switchMap(() => this.auth0Facade.hasPermissionsPipe(this.permissions)),
    tap((t) => {
      if (!t) {
        this.router.navigate([AccessDeniedRouteUrl], { relativeTo: this.router.routerState.root });
      }
    })
  );

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.hasPermissions$;
  }
}
