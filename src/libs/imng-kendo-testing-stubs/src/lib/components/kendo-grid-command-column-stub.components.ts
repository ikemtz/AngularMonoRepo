import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CssClassType, StyleType } from '../type';

@Component({
  selector: 'kendo-grid-command-column',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_GRID_COMMAND_COLUMN_STUB {
  @Input() public autoSize?: boolean;
  @Input() public columnMendu = true;
  @Input() public class?: CssClassType;
  @Input() public filterClass?: CssClassType;
  @Input() public filterStyle?: StyleType;
  @Input() public footerClass?: CssClassType;
  @Input() public footerStyle?: StyleType;
  @Input() public headerClass?: CssClassType;
  @Input() public headerStyle?: StyleType;
  @Input() public hidden = false;
  @Input() public includeInChooser = true;
  @Input() public lockable = true;
  @Input() public locked = false;
  @Input() public maxResizableWidth?: number;
  @Input() public media?: string;
  @Input() public minResizableWidth = 10;
  @Input() public reorderable = true;
  @Input() public resizable = true;
  @Input() public resizeStep = 10;
  @Input() public stickable = true;
  @Input() public sticky = false;
  @Input() public style?: StyleType;
  @Input() public tableCellsRole = 'gridcell';
  @Input() public title?: string;
  @Input() public width?: number;

  public cellRowSpan?: () => number;
  public orderIndex = 0;
}
