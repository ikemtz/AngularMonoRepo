import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';

@Component({
  selector: 'kendo-treelist-checkbox-column',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_TREELIST_CHECKBOX_COLUMN_STUB {//NOSONAR
  @Input() public autoSize?: boolean;
  @Input() public checkChildren?: boolean;
  @Input() public columnMenu? = true;
  @Input() public class?:
    | string//NOSONAR
    | string[]
    | Set<string>
    | { [key: string]: unknown }; 
  @Input() public expandable? = false;
  @Input() public footerClass?:
    | string
    | string[]
    | Set<string>
    | { [key: string]: unknown };
  @Input() public footerStyle?: { [key: string]: string };
  @Input() public headerClass?:
    | string
    | string[]
    | Set<string>
    | { [key: string]: unknown };
  @Input() public headerStyle?: { [key: string]: string };
  @Input() public hidden? = false;
  @Input() public includeInChooser? = true;
  @Input() public lockable? = true;
  @Input() public locked? = false;
  @Input() public media?: string;
  @Input() public minResizableWidth? = 10;
  @Input() public reorderable? = true;
  @Input() public resizable? = true;
  @Input() public resizeStep? = 10;
  @Input() public showSelectAll?: boolean;
  @Input() public style?: { [key: string]: string };
  @Input() public tableCellsRole? = 'gridcell';
  @Input() public title?: string;
  @Input() public width?: number;

  public orderIndex = 0;
}
