import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SupportComponent } from './support/support.component';
import { AccessDeniedComponent } from './components/access-denied.component';

const routes: Routes = [
  { path: 'support', component: SupportComponent },
  { path: 'access-denied', component: AccessDeniedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Auth0OidcRoutingModule { }

export const oidcLazyRoutes = {
  path: 'oidc',
  loadChildren: () => import('./auth0-oidc.module').then(m => m.Auth0OidcModule)
};