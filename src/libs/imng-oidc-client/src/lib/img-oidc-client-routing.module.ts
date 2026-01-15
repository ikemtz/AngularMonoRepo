import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { IMNG_USER_SUPPORT } from './support/support.component';
import { IMNG_ACCESS_DENIED } from './components/access-denied.component';
import { AuthGuard } from './services/auth-guard';
import { IMNG_LOGOUT_SUCCESS } from './components/logout-success.component';

const routes: Routes = [
  { path: 'support', component: IMNG_USER_SUPPORT },
  { path: 'access-denied', component: IMNG_ACCESS_DENIED },
  { path: 'logout', component: IMNG_LOGOUT_SUCCESS },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImngOidcClientRoutingModule {}

export const oidcSupportRoute: Route = {
  path: 'oidc/support',
  component: IMNG_USER_SUPPORT,
  canActivate: [AuthGuard],
};

export const oidcAccessDeniedRoute: Route = {
  path: 'oidc/access-denied',
  component: IMNG_ACCESS_DENIED,
};

export const oidcLogoutRoute: Route = {
  path: 'oidc/logout',
  component: IMNG_LOGOUT_SUCCESS,
};

export const oidcRoutes: Route[] = [
  oidcSupportRoute,
  oidcAccessDeniedRoute,
  oidcLogoutRoute,
];
