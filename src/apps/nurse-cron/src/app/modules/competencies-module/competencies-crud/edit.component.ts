import { Component, ChangeDetectionStrategy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';

import { CompetencyBaseEntryComponent } from './base-entry.component';
import { CompetencyCrudFacade } from './crud.facade';
import { ICompetency } from '../../../models/competencies-odata';

@Component({
  selector: 'nrcrn-competency-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetencyEditComponent extends CompetencyBaseEntryComponent {
  public dialogTitle = 'Edit Competency';
  public active$ = this.facade.isEditActive$;

  constructor(facade: CompetencyCrudFacade) {
    super(facade);
  }
  public initForm() {
    super.initForm();
    this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
  }
  public save() {
    if (this.addEditForm.valid) {
      const val: ICompetency = this.addEditForm.value;
      this.facade.updateExistingEntity(val);
    }
  }
}
