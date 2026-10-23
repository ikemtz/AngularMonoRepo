import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input,
} from '@angular/core';
import { CssClassType, StyleType } from '../type';
import { IMNG_KENDO_SVG_ICON_STUB } from './kendo-svg-icon-stub.component';

@Component({
  selector: 'kendo-grid',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_TABSTRIP_TAB_STUB {
  @Input() public closable?: boolean;
  @Input() public closeIcon?: string;
  @Input() public closeIconClass?: string;
  @Input() public closeSVGIcon?: IMNG_KENDO_SVG_ICON_STUB;
  @Input() public cssClass?: CssClassType;
  @Input() public cssStyle?: StyleType;
  @Input() public disabled = false;
  @Input() public selected?: boolean;
  @Input() public title?: string;
}
