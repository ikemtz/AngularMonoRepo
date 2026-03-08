import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input,
} from '@angular/core';

type CssClassValue =
  | undefined
  | string
  | string[]
  | Set<string>
  | { [key: string]: never };
type StyleValue = undefined | { [key: string]: string };
@Component({
  selector: 'kendo-combobox-column',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_COMBOBOX_COLUMN_STUB {
  @Input() class: CssClassValue;
  @Input() field: undefined | string;
  @Input() headerClass: CssClassValue;
  @Input() headerStyle: StyleValue;
  @Input() hidden = false;
  @Input() media: undefined | string;
  @Input() style: StyleValue;
  @Input() title: undefined | string;
  @Input() width: undefined | number;
}
