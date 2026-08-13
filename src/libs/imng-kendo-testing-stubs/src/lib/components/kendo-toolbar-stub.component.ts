import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { InputSize } from '../type';
@Component({
  selector: 'kendo-toolbar',
  template: '',
  standalone: true,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_TOOLBAR_STUB {
  @Input() public fillMode: unknown;
  @Input() public overflow?: unknown;
  @Input() public popupSettings: unknown;
  @Input() public showIcon: unknown;
  @Input() public showText: unknown;
  @Input() public size?: InputSize;
  @Input() public tabindex?: number;

  public close = new EventEmitter<never>();
  public open = new EventEmitter<never>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public toggle(_popupOpen?: boolean) {}
}
