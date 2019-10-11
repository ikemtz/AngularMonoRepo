import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';
import { EmployeeRouteGuard } from './services/emp-route-guard';

const routes: Routes = [
  { path: '', redirectTo: 'list' },
  {
    path: 'list', component: ListComponent, canActivate: [EmployeeRouteGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [EmployeeRouteGuard]
})
export class EmployeesRoutingModule { }
