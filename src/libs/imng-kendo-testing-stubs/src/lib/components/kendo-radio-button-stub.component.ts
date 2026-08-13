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
  selector: 'kendo-radiobutton',
  template: '',
  standalone: true,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_RADIO_BUTTON_STUB {
  @Input() public checked = false;
  @Input() public disabled?: boolean;
  @Input() public inputAttributes = {};
  @Input() public name = '';
  @Input() public size?: InputSize;
  @Input() public tabindex?: number;
  @Input() public title?: string;
  @Input() public value = '';

  public blur = new EventEmitter<never>();
  public focus = new EventEmitter<never>();
  public checkedChange = new EventEmitter<boolean>();
}
