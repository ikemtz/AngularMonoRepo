import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input,
} from '@angular/core';
import { TabStripScrollableSettings } from '../interfaces/tab-strip-scrollable-settings';
import { TabAlignment, TabPosition, TabStripSize } from '../types/tab-strips';
import { IMNG_KENDO_SVG_ICON_STUB } from './kendo-svg-icon-stub.component';

@Component({
  selector: 'kendo-grid',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_TABSTRIP_STUB {
  @Input() public animate = true;
  @Input() public closable = false;
  @Input() public closeIcon = 'x';
  @Input() public closeIconClass?: string;
  @Input() public closeSVGIcon?: IMNG_KENDO_SVG_ICON_STUB;
  @Input() public height?: string;
  @Input() public keepTabContent: boolean | 'loadOnDemand' = false;
  @Input() public scrollable: boolean | TabStripScrollableSettings = false;
  @Input() public showContentArea = true;
  @Input() public size?: TabStripSize;
  @Input() public tabAlignment: TabAlignment = 'start';
  @Input() public tabPosition: TabPosition = 'top';
}
