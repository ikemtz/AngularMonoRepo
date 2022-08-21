import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-oidc-client';
import { OrderListComponent } from './orders-list';
import { PrimeOrderListComponent } from './prime-orders-list';


const routes: Routes = [
  { path: '', component: OrderListComponent, canActivate: [AuthGuard] },
  { path: 'prime', component: PrimeOrderListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
