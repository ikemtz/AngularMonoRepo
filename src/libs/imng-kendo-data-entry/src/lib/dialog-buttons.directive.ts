import { Directive, TemplateRef } from '@angular/core';

@Directive({ selector: '[imngDialogBtns]' })
export class DialogButtonsDirective {
  constructor(public tpl: TemplateRef<unknown>) { }
}
