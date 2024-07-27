import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-oidc-client';
import { CertificationListComponent } from './certifications-list';

export const certificationRoutes: Routes = [
  { path: '', component: CertificationListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(certificationRoutes)],
  exports: [RouterModule],
})
export class CertificationsRoutingModule {}
