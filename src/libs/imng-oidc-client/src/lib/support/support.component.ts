import { Component } from '@angular/core';
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
        <span *ngFor="let item of facade.audiences$ | async; last as isLast">
          {{ item }} <br *ngIf="!isLast" />
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">Permissions</div>
      <div class="col-md-8">
        <span *ngFor="let item of facade.permissions$ | async; last as isLast">
          {{ item }} <br *ngIf="!isLast" />
        </span>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">Expires</div>
      <div class="col-md-8">{{ facade.expiresAt$ | async }}</div>
    </div>
    <div class="row" *ngFor="let item of profileValue$ | async">
      <div class="col-md-3">{{ item.key }}</div>
      <div class="col-md-8">{{ item.value }}</div>
    </div>
  </div> `,
})
export class SupportComponent {
  public profileValue$: Observable<{ key: string; value: string; }[]>;
  constructor(
    public readonly facade: OidcFacade,
    public readonly oidcUserFacade: OidcUserFacade
  ) {
    this.profileValue$ = this.oidcUserFacade.profile$.pipe(
      map((x) =>
        Object.keys(x).map((propertyKey) => ({
          key: propertyKey,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          value: (x as any)[propertyKey], //NOSONAR
        }))
      )
    );
  }
}
