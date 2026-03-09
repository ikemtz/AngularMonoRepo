import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { IconFlip, IconSize, IconThemeColor } from '../types/svg-icons';
import { SVGIcon } from '../interfaces/svg-icon';

@Component({
  selector: 'kendo-svg-icon',
  template: '',
  standalone: true,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_SVG_ICON_STUB {
  @Input() public flip?: IconFlip;
  @Input() public icon?: SVGIcon;
  @Input() public size?: IconSize;
  @Input() public themeColor?: IconThemeColor;
}
