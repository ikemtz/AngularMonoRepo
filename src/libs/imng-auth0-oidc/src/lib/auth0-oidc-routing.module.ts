import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support/support.component';
import { AccessDeniedComponent } from './components/access-denied.component';
import { AuthGuard } from './services/auth-guard';
import { LogoutSuccessComponent } from './components/logout-success.component';

const routes: Routes = [
  { path: 'support', component: SupportComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'log-out', component: LogoutSuccessComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Auth0OidcRoutingModule { }

export const oidcSupportRoute = {
  path: 'oidc/support',
  component: SupportComponent,
  canActivate: [AuthGuard]
};

export const oidcAccessDeniedRoute = {
  path: 'oidc/access-denied',
  component: AccessDeniedComponent,
};

export const oidcLogoutRoute = {
  path: 'oidc/log-out',
  component: LogoutSuccessComponent,
};
