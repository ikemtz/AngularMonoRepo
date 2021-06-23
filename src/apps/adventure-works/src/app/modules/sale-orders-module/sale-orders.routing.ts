import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-auth0-oidc';
import { SaleOrderListComponent } from './sale-orders-list';


const routes: Routes = [
  { path: '', component: SaleOrderListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleOrdersRoutingModule { }
