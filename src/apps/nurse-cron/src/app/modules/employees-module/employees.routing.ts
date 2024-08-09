import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-oidc-client';
import { EmployeeListComponent } from './employees-list';


export const employeeRoutes: Routes = [
  { path: '', component: EmployeeListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(employeeRoutes)],
  exports: [RouterModule]
})
export class EmployeesRoutingModule { }
