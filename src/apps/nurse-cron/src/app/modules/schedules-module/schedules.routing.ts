import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'imng-oidc-client';
import { ScheduleListComponent } from './schedules-list';

export const scheduleRoutes: Routes = [
  { path: '', component: ScheduleListComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(scheduleRoutes)],
  exports: [RouterModule],
})
export class SchedulesRoutingModule {}
