import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { RowArgs } from '../interfaces/row-args';

@Directive({
  selector: '[kendoGridSelectBy]',
})
export class IMNG_KENDO_SELECTION_STUB {
  @Input() public columnKey?:
    | string
    | ((column: never, columnIndex: number) => never);
  @Input() public rangeSelectionStartColumnIndex? = 0;
  @Input() public rangeSelectionStartRow?: RowArgs | number = 0;
  @Input() public selectedKeys?: never[] = [];
  @Input() public kendoGridSelectBy?: string | ((context: RowArgs) => never);
  @Output() public selectedKeysChange: EventEmitter<never[]> = new EventEmitter<
    never[]
  >();
}
