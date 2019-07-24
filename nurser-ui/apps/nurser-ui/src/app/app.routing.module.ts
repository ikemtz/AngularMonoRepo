import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccessDeniedRoute } from '@imao/auth0-oidc';
import { AppPreloadStrategy } from './app.preload.strategy';

const routes: Routes = [
  { path: '', component: HomeComponent },
  AccessDeniedRoute,
  {
    path: 'employees',
    loadChildren: () => import('./modules/employees/employees.module').then(m => m.EmployeesModule),
  },
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
