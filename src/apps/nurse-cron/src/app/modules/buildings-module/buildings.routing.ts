import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-oidc-client';
import { BuildingListComponent } from './buildings-list';

export const buildingRoutes: Routes = [
  { path: '', component: BuildingListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(buildingRoutes)],
  exports: [RouterModule],
})
export class BuildingsRoutingModule {}
