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
import { AddNursesComponent } from './add-edit-nurses/add-nurses.component';
import { DataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';
import { NursesDataEntryFacade } from './add-edit-nurses/nurses-data-entry-facade';

const routes: Routes = [{ path: '', component: NursesComponent }];

@NgModule({
  declarations: [NursesComponent, AddNursesComponent],
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
    DataEntryDialogModule,
    ReactiveFormsModule,
  ],
  providers: [ListFacade, NursesDataEntryFacade],
})
export class NursesModule {
  constructor() {
    library.add(faPlusCircle);
  }
}
