import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-auth0-oidc';
import { HealthItemListComponent } from './health-items-list';


const routes: Routes = [
  { path: '', component: HealthItemListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HealthItemsRoutingModule { }
