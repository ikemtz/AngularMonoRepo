import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { ButtonFillMode, ButtonRounded } from '@progress/kendo-angular-buttons';
import { SVGIcon } from '@progress/kendo-svg-icons';

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
  @Input() public svgIcon: SVGIcon | undefined;
  @Input() disabled: boolean | undefined;
  @Input() rounded: ButtonRounded | undefined;
  @Input() public fillMode: ButtonFillMode | undefined;
  click: EventEmitter<never> | undefined;
}
