import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NursesRoutingModule } from './nurses-routing.module';
import { ListComponent } from './list/list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromNurses from './+state/nurses.reducer';
import { NursesEffects } from './+state/nurses.effects';
import { ListFacade } from './list/list.facade';
import { GridModule, ExcelModule, PDFModule } from '@progress/kendo-angular-grid';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { AddNursesComponent } from './add-edit-nurses/add-nurses.component';
import { DataEntryDialogModule } from 'imng-kendo-data-entry';
import { ReactiveFormsModule } from '@angular/forms';
import { NursesDataEntryFacade } from './add-edit-nurses/nurses-data-entry-facade';
import { ListDetailComponent } from './list-detail/list-detail.component';
import { EditNursesComponent } from './add-edit-nurses/edit-nurses.component';
import { NursesApiService } from './services/nurses-api.service';
import { NurseCertificationsApiService } from './services/nurse-certifications-api.service';
import { AddNurseCertificationComponent } from './add-edit-nurse-certification/add-nurse-certification.component';
import { EditNurseCertificationComponent } from './add-edit-nurse-certification/edit-nurse-certification.component';
import { NurseCertificationDataEntryFacade } from './add-edit-nurse-certification/nurse-certification-data-entry-facade';
import { ImngODataGridModule } from 'imng-kendo-grid-odata';
const routes: Routes = [{ path: '', component: ListComponent }];

@NgModule({
  declarations: [
    ListComponent,
    AddNursesComponent,
    EditNursesComponent,
    ListDetailComponent,
    AddNurseCertificationComponent,
    EditNurseCertificationComponent,
  ],
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
    ImngODataGridModule,
  ],
  providers: [
    ListFacade,
    NursesDataEntryFacade,
    NursesApiService,
    NurseCertificationsApiService,
    NurseCertificationDataEntryFacade,
  ],
})
export class NursesModule {
  constructor() {
    library.add(faPlusCircle, faEdit, faTrashAlt);
  }
}
