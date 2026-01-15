/* eslint-disable @angular-eslint/prefer-inject */
import { OnInit, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';
import {
  CompetencyProperties,
  CompetencyFormGroupFac,
  ICompetencyForm,
} from '../../../models/competencies-odata';

import { CompetencyCrudFacade } from './crud.facade';

@Component({
  template: '',
  standalone: true,
})
export abstract class CompetencyBaseEntryComponent
  extends BaseDataEntryComponent<CompetencyCrudFacade>
  implements OnInit
{
  public readonly props = CompetencyProperties;
  public addEditForm: FormGroup<ICompetencyForm>;

  constructor(facade: CompetencyCrudFacade) {
    super(facade);
  }
  public override ngOnInit(): void {
    super.ngOnInit();
  }

  public initForm(): void {
    this.addEditForm = CompetencyFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}
