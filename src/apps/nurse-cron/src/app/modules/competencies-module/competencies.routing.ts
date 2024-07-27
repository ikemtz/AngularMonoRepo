import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-oidc-client';
import { CompetencyListComponent } from './competencies-list';

export const competencyRoutes: Routes = [
  { path: '', component: CompetencyListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(competencyRoutes)],
  exports: [RouterModule],
})
export class CompetenciesRoutingModule {}
