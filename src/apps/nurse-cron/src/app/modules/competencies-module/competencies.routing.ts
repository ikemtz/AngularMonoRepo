import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-oidc-client';
import { CompetencyListComponent } from './competencies-list';


const routes: Routes = [
  { path: '', component: CompetencyListComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetenciesRoutingModule { }
