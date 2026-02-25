import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[kendoButton]',
  template: '',
  standalone: true,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_BUTTON_STUB {
  @Input() public svgIcon: unknown;
  @Input() disabled: boolean | undefined;
  @Input() rounded: unknown;
  @Input() public fillMode: unknown;
  click: EventEmitter<never> | undefined;
}
