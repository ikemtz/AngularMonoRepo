import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { oidcSupportRoute, oidcAccessDeniedRoute } from 'imng-auth0-oidc';
import { AppPreloadStrategy } from './app.preload.strategy';
import { CallbackComponent } from 'imng-msal-ngrx';

const routes: Routes = [
  { path: 'nurses', loadChildren: () => import('./modules/nurses/nurses.module').then(m => m.NursesModule) },
  { path: 'callback', component: CallbackComponent },
  { path: '', component: HomeComponent },
  oidcSupportRoute,
  oidcAccessDeniedRoute,
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      enableTracing: false,
      preloadingStrategy: AppPreloadStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
