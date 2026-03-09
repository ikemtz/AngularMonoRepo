import { jest } from '@jest/globals';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'kendo-multicolumncombobox',
  template: '',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useValue: {
        writeValue: jest.fn(),
        registerOnChange: jest.fn(),
        registerOnTouched: jest.fn(),
      },
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_MULTICOLUMNCOMBOBOX_STUB {
  @Input() public filterable = false;
  @Input() public valuePrimitive = false;
  @Input() public valueField = 'valueField';
  @Input() public textField = 'textField';
  @Input() public data = [];
  @Input() public disabled = false;
  @Input() public loading = false;

  public selectionChange = new EventEmitter<never>();
  public valueChange = new EventEmitter<never>();
  public filterChange = new EventEmitter<never>();
  public open = new EventEmitter<never>();
  public opened = new EventEmitter<never>();
  public close = new EventEmitter<never>();
  public closed = new EventEmitter<never>();
  public onBlur = new EventEmitter<never>();
}
