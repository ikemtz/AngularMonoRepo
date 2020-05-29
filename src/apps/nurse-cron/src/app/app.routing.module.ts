import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { oidcAccessDeniedRoute, oidcSupportRoute } from 'imng-auth0-oidc';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: 'employees',
    loadChildren: () => import('./modules/employees-module/employees.module').then(m => m.EmployeesModule),
  }, {
    path: 'certifications',
    loadChildren: () => import('./modules/certifications-module/certifications.module').then(m => m.CertificationsModule),
  }, {
    path: 'competencies',
    loadChildren: () => import('./modules/competencies-module/competencies.module').then(m => m.CompetenciesModule),
  }, {
    path: 'health-items',
    loadChildren: () => import('./modules/health-items-module/health-items.module').then(m => m.HealthItemsModule),
  },
  oidcSupportRoute,
  oidcAccessDeniedRoute,
  { path: '**', component: HomeComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
