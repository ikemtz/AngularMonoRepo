///<reference types="jest" />
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { DrawerMode, DrawerPosition } from '../types/drawer';
import { DrawerAnimation } from '../interfaces/drawer-animation';

@Component({
  selector: 'kendo-drawer',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_DRAWER_STUB {
  //NOSONAR
  @Input() public animation?: boolean | DrawerAnimation;
  @Input() public autoCollapse = true;
  @Input() public expanded?: boolean;
  @Input() public isItemExpanded = jest.fn();
  @Input() public items: unknown[] = [];
  @Input() public mini?: boolean;
  @Input() public miniWidth = 50;
  @Input() public mode?: DrawerMode;
  @Input() public position?: DrawerPosition;
  @Input() public width = 240;

  public expand?: EventEmitter<unknown>;
  public collapse?: EventEmitter<unknown>;
  // eslint-disable-next-line @angular-eslint/no-output-native
  public select?: EventEmitter<unknown>;
  public expandedChange?: EventEmitter<boolean>;

  public toggle = jest.fn();
}
