import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { SVGIcon } from '../interfaces/svg-icon';

@Component({
  selector: 'kendo-upload',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_UPLOADDROPZONE_STUB {
  @Input() public icon?: string;
  @Input() public iconClass?: string;
  @Input() public svgIcon?: SVGIcon;
  @Input() public zoneId?: string;
}
