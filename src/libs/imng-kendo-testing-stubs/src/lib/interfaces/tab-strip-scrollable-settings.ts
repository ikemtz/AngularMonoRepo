import { IMNG_KENDO_SVG_ICON_STUB } from '../components/kendo-svg-icon-stub.component';
import {
  TabStripScrollButtonsPosition,
  TabStripScrollButtonsVisibility,
} from '../types/tab-strips';

export interface TabStripScrollableSettings {
  buttonScrollSpeed?: number;
  enabled?: boolean;
  mouseScroll?: boolean;
  nextButtonIcon?: string;
  nextSVGButtonIcon?: IMNG_KENDO_SVG_ICON_STUB;
  prevButtonIcon?: string;
  prevSVGButtonIcon?: IMNG_KENDO_SVG_ICON_STUB;
  scrollButtons?: TabStripScrollButtonsVisibility;
  scrollButtonsPosition?: TabStripScrollButtonsPosition;
}
