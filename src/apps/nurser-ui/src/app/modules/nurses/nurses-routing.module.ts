import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NursesComponent } from './list/list.component';

const routes: Routes = [{ path: '', component: NursesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NursesRoutingModule {}
