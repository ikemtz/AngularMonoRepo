import { Directive, TemplateRef, inject } from '@angular/core';

@Directive({
  selector: '[imngDialogBtns]',
  standalone: true,
})
export class IMNG_KENDO_DIALOG_BUTTONS {
  tpl = inject<TemplateRef<unknown>>(TemplateRef);
}
