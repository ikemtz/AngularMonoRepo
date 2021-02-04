/* eslint-disable @typescript-eslint/no-explicit-any */
import { Observable, of } from 'rxjs';
import { first, catchError, mergeMap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { oidcQuery } from '../+state/oidc.selectors';
import { OidcState } from '../+state/oidc.reducer';
import * as oidcActions from '../+state/oidc.actions';
import { Config, OIDC_CONFIG } from '../models/config.model';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    @Inject(OIDC_CONFIG) private readonly config: Config,
    private readonly store: Store<OidcState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.store.select(oidcQuery.getAccessToken).pipe(
      first(),
      mergeMap(accessToken => {
        if (accessToken) {
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${accessToken}` }
          });
        }
        const handler = next.handle(req);
        if (this.config.disableHttpExceptionHandling) {
          return handler;
        }
        return handler.pipe(
          catchError((err: any) => {
            if (err instanceof HttpErrorResponse) {
              this.store.dispatch(oidcActions.setHttpError(err));
            }
            return of(err);
          }));
      }
      ));
  }
}
