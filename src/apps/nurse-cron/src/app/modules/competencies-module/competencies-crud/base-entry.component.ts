import { OnInit, Directive } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { CompetencyCrudFacade } from './crud.facade';
import { ICompetency, CompetencyProperties, CompetencyFormGroupFac } from '../../../models/competencies-odata';

@Directive()
export abstract class CompetencyBaseEntryComponent extends BaseDataEntryComponent<ICompetency, CompetencyCrudFacade>
  implements OnInit {
  public readonly props = CompetencyProperties;

  constructor(facade: CompetencyCrudFacade) {
    super(facade);
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.addEditForm = CompetencyFormGroupFac();
  }

  public cancel(): void {
    this.facade.clearCurrentEntity();
  }
}
