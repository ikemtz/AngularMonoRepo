import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { OidcFacade } from '../+state/oidc.facade';
import { switchMap, tap } from 'rxjs/operators';
import { OidcUserFacade } from '../+state/oidc-user.facade';

export abstract class PermissionsGuard  {
  constructor(
    private readonly oidcFacade: OidcFacade,
    private readonly oidcUserFacade: OidcUserFacade,
    private readonly router: Router
  ) { }

  protected abstract permissions: string[];

  public canActivate(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    route: ActivatedRouteSnapshot, //NOSONAR
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    state: RouterStateSnapshot //NOSONAR
  ): Observable<boolean> | boolean {
    return this.oidcFacade.waitForAuthenticationLoaded().pipe(
      switchMap(() => this.oidcUserFacade.hasPermissions(this.permissions)),
      tap((t) => {
        if (!t) {
          this.router.navigate(['oidc/access-denied'], {
            relativeTo: this.router.routerState.root,
          });
        }
      })
    );
  }
}
