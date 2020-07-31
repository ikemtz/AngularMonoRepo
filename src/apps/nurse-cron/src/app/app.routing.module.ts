import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { oidcAccessDeniedRoute, oidcSupportRoute, AuthGuard } from 'imng-auth0-oidc';
import { HomeComponent } from './home/home.component';
import { MessagingComponent } from './messaging/messaging.component';


const routes: Routes = [
  {
    path: 'buildings',
    loadChildren: () => import('./modules/buildings-module/buildings.module').then(m => m.BuildingsModule),
    canActivateChild: [AuthGuard]
  }, {
    path: 'employees',
    loadChildren: () => import('./modules/employees-module/employees.module').then(m => m.EmployeesModule),
    canActivateChild: [AuthGuard]
  }, {
    path: 'certifications',
    loadChildren: () => import('./modules/certifications-module/certifications.module').then(m => m.CertificationsModule),
    canActivateChild: [AuthGuard]
  }, {
    path: 'competencies',
    loadChildren: () => import('./modules/competencies-module/competencies.module').then(m => m.CompetenciesModule),
    canActivateChild: [AuthGuard]
  }, {
    path: 'health-items',
    loadChildren: () => import('./modules/health-items-module/health-items.module').then(m => m.HealthItemsModule),
    canActivateChild: [AuthGuard]
  }, {
    path: 'units',
    loadChildren: () => import('./modules/units-module/units.module').then(m => m.UnitsModule),
    canActivateChild: [AuthGuard]
  }, {
    path: 'messaging',
    component: MessagingComponent,
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
