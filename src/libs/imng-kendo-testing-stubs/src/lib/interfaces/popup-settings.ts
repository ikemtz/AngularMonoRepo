import { ViewContainerRef } from '@angular/core';
export interface PopupSettings {
  animate?: boolean;
  appendTo?: 'root' | ViewContainerRef | 'component';
}
