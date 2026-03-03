import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { jest } from '@jest/globals';

@Component({
  selector: 'kendo-dropdownbutton',
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
export class IMNG_KENDO_DROPDOWNBUTTON_STUB {
  @Input() public data = [];
  @Input() public fillMode = 'fillMode';
  @Input() public textField = 'textField';
  @Input() public size = 'size';
  @Input() public disabled = false;
}
