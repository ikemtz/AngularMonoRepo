import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support/support.component';
import { AccessDeniedComponent } from './components/access-denied.component'; 
import { AuthGuard } from './services/auth-guard';

const routes: Routes = [
  { path: 'support', component: SupportComponent },
  { path: 'access-denied', component: AccessDeniedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Auth0OidcRoutingModule { }

//TODO: Fix lazy loading issue related to: https://github.com/Microsoft/TypeScript/issues/16675
//export const oidcLazyRoutes = {
//  path: 'oidc',
//  loadChildren: () => import('./auth0-oidc.module').then(m => m.Auth0OidcModule)
//};
export const oidcSupportRoute = {
  path: 'oidc/support',
  component: SupportComponent,
  canActivate: [AuthGuard]
};

export const oidcAccessDeniedRoute = {
  path: 'oidc/access-denied',
  component: AccessDeniedComponent,
};