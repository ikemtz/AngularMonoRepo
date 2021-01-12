import { OnInit, Directive } from '@angular/core';
import { BaseDataEntryDirective } from 'imng-kendo-data-entry';

import { CompetencyCrudFacade } from './crud.facade';
import { CompetencyProperties, CompetencyFormGroupFac } from '../../../models/competencies-odata';

@Directive()
export abstract class CompetencyBaseEntryDirective extends BaseDataEntryDirective<CompetencyCrudFacade>
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
