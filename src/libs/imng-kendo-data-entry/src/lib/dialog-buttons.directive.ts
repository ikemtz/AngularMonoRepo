import { Directive, TemplateRef } from '@angular/core';

@Directive({
    selector: '[imngDialogBtns]',
    standalone: false
})
export class DialogButtonsDirective {
  constructor(public tpl: TemplateRef<unknown>) { }
}
