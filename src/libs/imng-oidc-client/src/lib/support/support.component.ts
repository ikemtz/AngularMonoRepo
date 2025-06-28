import { Component, inject } from '@angular/core';
import { OidcFacade } from '../+state/oidc.facade';
import { OidcUserFacade } from '../+state/oidc-user.facade';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'imng-support',
  template: `<div class="container pt-5 mt-5">
    <div class="row h3 text-center">
      <div class="col-md-12 text-center">OIDC Support</div>
    </div>
    <div class="row">
      <div class="col-md-3">Audiences</div>
      <div class="col-md-8">
        @for (
          item of facade.audiences$ | async;
          track item;
          let isLast = $last
        ) {
          <span>
            {{ item }}
            @if (!isLast) {
              <br />
            }
          </span>
        }
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">Permissions</div>
      <div class="col-md-8">
        @for (
          item of facade.permissions$ | async;
          track item;
          let isLast = $last
        ) {
          <span>
            {{ item }}
            @if (!isLast) {
              <br />
            }
          </span>
        }
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">Expires</div>
      <div class="col-md-8">{{ facade.expiresAt$ | async }}</div>
    </div>
    @for (item of profileValue$ | async; track item) {
      <div class="row">
        <div class="col-md-3">{{ item.key }}</div>
        <div class="col-md-8">{{ item.value }}</div>
      </div>
    }
  </div>`,
  standalone: false,
})
export class SupportComponent {
  readonly facade = inject(OidcFacade);
  readonly oidcUserFacade = inject(OidcUserFacade);

  public profileValue$: Observable<{ key: string; value: string }[]>;
  constructor() {
    this.profileValue$ = this.oidcUserFacade.profile$.pipe(
      map((x) =>
        Object.keys(x).map((propertyKey) => ({
          key: propertyKey,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value: (x as any)[propertyKey], //NOSONAR
        })),
      ),
    );
  }
}
