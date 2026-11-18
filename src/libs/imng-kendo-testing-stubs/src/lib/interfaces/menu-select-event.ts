import { MenuEvent } from './menu-event';

export interface MenuSelectEvent extends MenuEvent {
  originalEvent: never;
}
