import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, oidcRoutes } from 'imng-oidc-client';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: 'customers',
    loadChildren: () => import('./modules/customers-module/customers.module').then(m => m.CustomersModule),
    canActivateChild: [AuthGuard]
  }, //{
  //  path: 'products',
  //  loadChildren: () => import('./modules/products-module/products.module').then(m => m.ProductsModule),
  //  canActivateChild: [AuthGuard]
  //}, {
  //  path: 'sale-orders',
  //  loadChildren: () => import('./modules/sale-orders-module/sale-orders.module').then(m => m.SaleOrdersModule),
  //  canActivateChild: [AuthGuard]
  //},
  ...oidcRoutes,
  { path: '**', component: HomeComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      initialNavigation: 'enabled',
      enableTracing: false,
      relativeLinkResolution: 'corrected',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
