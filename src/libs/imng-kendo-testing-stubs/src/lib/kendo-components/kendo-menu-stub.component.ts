import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  input,
  NO_ERRORS_SCHEMA,
  ViewContainerRef,
} from '@angular/core';
import { MenuAnimation } from '../interfaces/menu-animation';
import { OpenOnClickSettings } from '../interfaces/open-on-click-settings';
import { PopupSettings } from '../interfaces/popup-settings';
import { MenuSize } from '../type';
import { MenuEvent } from '../interfaces/menu-event';
import { MenuSelectEvent } from '../interfaces/menu-select-event';

@Component({
  selector: 'kendo-menu',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_MENU_STUB {
  animate? = input<boolean | MenuAnimation>({ duration: 100, type: 'slide' });
  appendTo? = input<ViewContainerRef>();
  hoverDelay? = input<number>();
  items? = input<never[]>();
  openOnClick = input<boolean | OpenOnClickSettings>();
  popupSettings = input<PopupSettings>();
  size = input<MenuSize>();
  trackBy = input<unknown>();
  vertical = input<boolean>();

  public close = new EventEmitter<MenuEvent>();
  public open = new EventEmitter<MenuEvent>();
  public select = new EventEmitter<MenuSelectEvent>();
  public toggle = jest.fn();
}
