import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-oidc-client';
import { UnitListComponent } from './units-list';

export const unitRoutes: Routes = [
  { path: '', component: UnitListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(unitRoutes)],
  exports: [RouterModule],
})
export class UnitsRoutingModule {}
