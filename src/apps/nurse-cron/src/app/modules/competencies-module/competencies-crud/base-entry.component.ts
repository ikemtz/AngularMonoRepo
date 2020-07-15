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

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.addEditForm = CompetencyFormGroupFac();
  }

  public cancel() {
    this.facade.clearCurrentEntity();
  }
}
