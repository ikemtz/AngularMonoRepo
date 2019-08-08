import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { oidcSupportRoute, oidcAccessDeniedRoute } from '@imao/auth0-oidc';
import { AppPreloadStrategy } from './app.preload.strategy';

const routes: Routes = [
  { path: '', component: HomeComponent },
  oidcSupportRoute,
  oidcAccessDeniedRoute
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      enableTracing: false,
      preloadingStrategy: AppPreloadStrategy
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
