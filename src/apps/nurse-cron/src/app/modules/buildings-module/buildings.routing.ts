import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-oidc-client';
import { BuildingListComponent } from './buildings-list';


const routes: Routes = [
  { path: '', component: BuildingListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuildingsRoutingModule { }
