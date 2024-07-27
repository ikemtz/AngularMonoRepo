import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-oidc-client';
import { PrimeOrderListComponent } from './prime-orders-list';

export const orderRoutes: Routes = [
  { path: '', component: PrimeOrderListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
