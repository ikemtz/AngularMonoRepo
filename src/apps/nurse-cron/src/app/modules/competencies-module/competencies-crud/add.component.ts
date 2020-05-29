import { Component, ChangeDetectionStrategy } from '@angular/core';

import { CompetencyCrudFacade } from './crud.facade';
import { CompetencyBaseEntryComponent } from './base-entry.component';
import { ICompetency } from '../../../models/competencies-odata';

@Component({
  selector: 'nrcrn-competency-add',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetencyAddComponent extends CompetencyBaseEntryComponent {
  public dialogTitle = 'Add Competency';
  public active$ = this.facade.isNewActive$;

  constructor(facade: CompetencyCrudFacade) {
    super(facade);
  }
  public initForm() {
    super.initForm();
    this.addEditForm.patchValue({});
  }
  public save() {
    if (this.addEditForm.valid) {
      const val: ICompetency = this.addEditForm.value;
      val.id = null;
      this.facade.saveNewEntity(val);
    }
  }
}
