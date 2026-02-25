import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { Align } from '@progress/kendo-angular-popup';

@Component({
  selector: 'kendo-popup',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_POPUP_STUB {
  @Input() anchor: ElementRef | HTMLElement | undefined;
  @Input() anchorAlign: Align | undefined;
  @Input() popupAlign: Align | undefined;
}
