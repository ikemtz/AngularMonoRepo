import { Observable } from 'rxjs';
import { first, flatMap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { oidcQuery } from '../+state/oidc.selectors';
import { OidcState } from '../+state/oidc.reducer';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private store: Store<OidcState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(oidcQuery.getAccessToken).pipe(
      first(),
      flatMap(access_token => {
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
