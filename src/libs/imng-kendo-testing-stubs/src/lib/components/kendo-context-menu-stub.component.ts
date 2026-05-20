import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  ElementRef,
  Input,
  NO_ERRORS_SCHEMA,
  TrackByFunction,
  ViewContainerRef,
} from '@angular/core';
import { PopupAnimation } from '../interfaces/popup-animation';
import { PopupSettings } from '../interfaces/popup-settings';
import { Collision } from '../interfaces/collision';
import { Align } from '../interfaces/align';
import { MenuAnimation } from '../interfaces/menu-animation';
import { MenuSize } from '../type';
import { OpenOnClickSettings } from '../interfaces/open-on-click-settings';

@Component({
  selector: 'kendo-contextmenu',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_CONTEXTMENU_STUB {//NOSONAR 
  @Input() public alignToAnchor? = false;
  @Input() public anchorAlign?: Align = {
    horizontal: 'left',
    vertical: 'bottom',
  };
  @Input() public animate?: boolean | MenuAnimation;
  @Input() public appendTo?: ViewContainerRef;
  @Input() public ariaLabel?: string;
  @Input() public collision?: Collision = {
    horizontal: 'fit',
    vertical: 'flip',
  };
  @Input() public filter?: string;
  @Input() public hoverDelay?: number;
  @Input() public items?: unknown[];
  @Input() public openOnClick?: boolean | OpenOnClickSettings;
  @Input() public popupAlign?: Align = { horizontal: 'left', vertical: 'top' };
  @Input() public popupAnimate?: boolean | PopupAnimation = true;
  @Input() public popupSettings?: PopupSettings;
  @Input() public showOn? = 'contextmenu';
  @Input() public size?: MenuSize;
  @Input() public target?: string | ElementRef<unknown> | HTMLElement | unknown; //NOSONARs
  @Input() public trackBy?: TrackByFunction<unknown>;
  @Input() public vertical? = true;
}
