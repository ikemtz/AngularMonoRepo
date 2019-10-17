import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { NursesRoutingModule } from './nurses-routing.module';
import { NursesComponent } from './list/list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromNurses from './+state/nurses.reducer';
import { NursesEffects } from './+state/nurses.effects';
import { ListFacade } from './list/list.facade';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const routes: Routes = [{ path: '', component: NursesComponent }];

@NgModule({
  declarations: [NursesComponent],
  imports: [
    CommonModule,
    NursesRoutingModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature(fromNurses.NURSES_FEATURE_KEY, fromNurses.reducer),
    EffectsModule.forFeature([NursesEffects]),
    GridModule,
    ExcelModule,
    PDFModule,
    FontAwesomeModule,
  ],
  providers: [ListFacade],
})
export class NursesModule {
  constructor() {
    library.add(faPlusCircle);
  }
}
