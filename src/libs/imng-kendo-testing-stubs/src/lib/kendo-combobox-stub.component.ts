import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input,
  EventEmitter,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { jest } from '@jest/globals';

@Component({
  selector: 'kendo-combobox',
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
export class IMNG_KENDO_COMBOBOX_STUB {
  @Input() public valuePrimitive = false;
  @Input() public valueField = 'valueField';
  @Input() public textField = 'textField';
  @Input() public data = [];
  @Input() public disabled = false;
  @Input() public filterable = true;

  public filterChange = new EventEmitter<never>();
  public selectionChange = new EventEmitter<never>();
  public valueChange = new EventEmitter<never>();
}
