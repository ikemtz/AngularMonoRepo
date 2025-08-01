import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { normalizeRequest } from 'imng-nrsrx-client-utils';

import { CompetencyBaseEntryComponent } from './base-entry.component';
import { ICompetency } from '../../../models/competencies-odata';

@Component({
    selector: 'nrcrn-competency-add',
    templateUrl: './add-edit.component.html',
    styleUrls: ['./add-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CompetencyAddComponent
  extends CompetencyBaseEntryComponent
  implements OnInit, OnDestroy
{
  public dialogTitle = 'Add Competency';
  public active$ = this.facade.isNewActive$;

  public override initForm(): void {
    super.initForm();
    this.addEditForm.patchValue({});
  }

  public save(): void {
    const val = normalizeRequest<ICompetency>(this.addEditForm.value);
    val.id = undefined;
    this.facade.saveNewEntity(val);
  }
}
