import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input,
} from '@angular/core';
import { CssClassType, StyleType } from '../type';

@Component({
  selector: 'kendo-combobox-column',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_COMBOBOX_COLUMN_STUB {
  @Input() class: CssClassType;
  @Input() field?: string;
  @Input() headerClass: CssClassType;
  @Input() headerStyle: StyleType;
  @Input() hidden = false;
  @Input() media?: string;
  @Input() style: StyleType;
  @Input() title?: string;
  @Input() width?: number;
}
