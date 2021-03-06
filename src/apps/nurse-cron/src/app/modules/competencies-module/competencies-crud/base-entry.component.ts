import { OnInit, Component } from '@angular/core';
import { BaseDataEntryComponent } from 'imng-kendo-data-entry';

import { CompetencyCrudFacade } from './crud.facade';
import { CompetencyProperties, CompetencyFormGroupFac } from '../../../models/competencies-odata';

@Component({ template: '' })
export abstract class CompetencyBaseEntryComponent extends BaseDataEntryComponent<CompetencyCrudFacade>
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
