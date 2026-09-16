import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
@Component({
  selector: 'kendo-label',
  template: '',
  standalone: true,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_LABEL_STUB {
  @Input() public for: unknown;
  @Input() public labelCssClass?: unknown;
  @Input() public labelCssStyle?: unknown;
  @Input() public optional = false;
  @Input() public text?: string;
}
