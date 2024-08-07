import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, oidcRoutes } from 'imng-oidc-client';
import { HomeComponent } from './home/home.component';

export const appRoutes: Routes = [
  {
    path: 'customers',
    loadChildren: () =>
      import('./modules/customers-module/customers.module').then(
        (m) => m.CustomersModule,
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/products-module/products.module').then(
        (m) => m.ProductsModule,
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'orders',
    loadChildren: () =>
      import('./modules/orders-module/orders.module').then(
        (m) => m.OrdersModule,
      ),
    canActivateChild: [AuthGuard],
  },
  {
    path: 'prime-orders',
    loadChildren: () =>
      import('./modules/prime-orders-module/orders.module').then(
        (m) => m.OrdersModule,
      ),
    canActivateChild: [AuthGuard],
  },
  ...oidcRoutes,
  { path: '**', component: HomeComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
