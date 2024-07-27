import { Observable, throwError } from 'rxjs';
import { first, catchError, mergeMap } from 'rxjs/operators';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { oidcSelectors } from '../+state/oidc.selectors';
import * as oidcActions from '../+state/oidc.actions';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private readonly store: Store) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return this.store.select(oidcSelectors.selectAccessToken).pipe(
      first(),
      mergeMap((accessToken) => {
        if (accessToken) {
          req = req.clone({
            setHeaders: { Authorization: `Bearer ${accessToken}` },
          });
        }
        return next.handle(req).pipe(
          catchError((err: Error) => {
            if (err instanceof HttpErrorResponse) {
              this.store.dispatch(oidcActions.setHttpError(err));
            }
            return throwError(() => err);
          }),
        );
      }),
    );
  }
}
