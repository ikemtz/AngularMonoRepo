import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { SupportComponent } from './support/support.component';
import { AccessDeniedComponent } from './components/access-denied.component';
import { AuthGuard } from './services/auth-guard';
import { LogoutSuccessComponent } from './components/logout-success.component';

const routes: Routes = [
  { path: 'support', component: SupportComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'logout', component: LogoutSuccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Auth0OidcRoutingModule { }

export const oidcSupportRoute: Route = {
  path: 'oidc/support',
  component: SupportComponent,
  canActivate: [AuthGuard]
};

export const oidcAccessDeniedRoute: Route = {
  path: 'oidc/access-denied',
  component: AccessDeniedComponent,
};

export const oidcLogoutRoute: Route = {
  path: 'oidc/logout',
  component: LogoutSuccessComponent,
};

export const oidcRoutes: Route[] = [oidcSupportRoute, oidcAccessDeniedRoute, oidcLogoutRoute];
