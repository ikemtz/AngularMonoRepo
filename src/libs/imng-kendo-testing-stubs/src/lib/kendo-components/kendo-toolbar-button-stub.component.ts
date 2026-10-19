import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { SVGIcon } from '../interfaces/svg-icon';
@Component({
  selector: 'kendo-toolbar-button',
  template: '',
  standalone: true,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_TOOLBAR_BUTTON_STUB {
  @Input() public className?: string | string[] | object;
  @Input() public disabled?: boolean;
  @Input() public fillMode: unknown;
  @Input() public icon?: string;
  @Input() public iconClass?: string;
  @Input() public imageUrl?: string;
  @Input() public rounded?: never;
  @Input() public selected = false;
  @Input() public showIcon?: never;
  @Input() public showText?: never;
  @Input() public style?: { [key: string]: string };
  @Input() public svgIcon?: SVGIcon;
  @Input() public text?: string;
  @Input() public themeColor?: never;
  @Input() public title?: string;
  @Input() public togglable?: boolean;
  @Input() public toggleable?: boolean = false;

  click?: EventEmitter<never> = new EventEmitter<never>();
  pointerdown?: EventEmitter<never> = new EventEmitter<never>();
  selectedChange?: EventEmitter<never> = new EventEmitter<never>();
}
