import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CssClassType } from '../type';

@Component({
  selector: 'kendo-grid-checkbox-column',
  template: '',
  standalone: true,
  providers: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_CHECKBOX_COLUMN_STUB {
  @Input() public autoSize?: boolean;
  @Input() public columnMenu = true;
  @Input() public class?: CssClassType;
  @Input() public filterClass?: CssClassType;
  @Input() public filterStyle?: { [key: string]: string };
  @Input() public footerClass?: CssClassType;
  @Input() public footerStyle?: { [key: string]: string };
  @Input() public headerClass?: CssClassType;
  @Input() public headerStyle?: { [key: string]: string };
  @Input() public hidden = false;
  @Input() public includeInChooseroolean = true;
  @Input() public lockable = true;
  @Input() public locked = false;
  @Input() public maxResizableWidth?: number;
  @Input() public media?: string;
  @Input() public minResizableWidth = 10;
  @Input() public reorderable = true;
  @Input() public resizable = true;
  @Input() public resizeStep = 10;
  @Input() public showDisabledCheckbox?: boolean;
  @Input() public showSelectAll?: boolean;
  @Input() public stickable = true;
  @Input() public sticky = false;
  @Input() public style?: { [key: string]: string };
  @Input() public tableCellsRole = 'gridcell';
  @Input() public title?: string;
  @Input() public width?: number;

  public cellRowspanFn?: () => void;
  public orderIndex = 0;
}
