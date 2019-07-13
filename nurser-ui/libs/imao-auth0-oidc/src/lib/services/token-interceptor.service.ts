import { OidcFacade } from '../+state/oidc.facade';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

export class TokenInterceptorService implements HttpInterceptor {
  constructor(private oidcFacade: OidcFacade) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.oidcFacade.accessToken$.pipe(
      switchMap(access_token => {
        if (access_token) {
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${access_token}` }
          });
        }
        return next.handle(req);
      })
    );
  }
}
