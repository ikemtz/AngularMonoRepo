import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { formGroupPatcher } from 'imng-kendo-data-entry';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { CompetencyBaseEntryComponent } from './base-entry.component';
import { CompetencyCrudFacade } from './crud.facade';

@Component({
  selector: 'nrcn-competency-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompetencyEditComponent extends CompetencyBaseEntryComponent implements OnInit, OnDestroy {
  public dialogTitle = 'Edit Competency';
  public active$ = this.facade.isEditActive$;

  constructor(facade: CompetencyCrudFacade) {
    super(facade);
  }
  public override initForm(): void {
    super.initForm();
    if (this.addEditForm) {
      this.allSubscriptions.push(this.facade.currentEntity$.pipe(formGroupPatcher(this.addEditForm)).subscribe());
    }
  }

  public save(): void {
    const val = normalizeRequest<ICompetency>(this.addEditForm.value);
    this.facade.updateExistingEntity(val);
  }
}
