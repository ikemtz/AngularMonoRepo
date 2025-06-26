import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
    selector: '[imngDialogBtns]',
    standalone: false
})
export class DialogButtonsDirective {
  tpl = inject<TemplateRef<unknown>>(TemplateRef);
}
