import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-oidc-client';
import { CustomerListComponent } from './customers-list';

export const customerRoutes: Routes = [
  { path: '', component: CustomerListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(customerRoutes)],
  exports: [RouterModule],
})
export class CustomersRoutingModule {}
