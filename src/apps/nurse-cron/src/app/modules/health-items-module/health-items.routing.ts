import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-oidc-client';
import { HealthItemListComponent } from './health-items-list';

export const healthItemRoutes: Routes = [
  { path: '', component: HealthItemListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(healthItemRoutes)],
  exports: [RouterModule],
})
export class HealthItemsRoutingModule {}
