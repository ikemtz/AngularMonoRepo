import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core';

type testType = number | string | undefined;

@Component({
  selector: 'kendo-dialog',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_DIALOG_STUB {
  @Input() public height: testType;
  @Input() public width: testType;
  @Input() public minWidth: testType;
  @Input() public autoFocusedElement: string | undefined;
  @Output() public close: EventEmitter<any> = new EventEmitter<any>(); //NOSONAR
}
