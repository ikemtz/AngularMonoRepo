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
  selector: 'kendo-dropdownlist',
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
export class IMNG_KENDO_DROPDOWNLIST_STUB {
  @Input() public valuePrimitive = false;
  @Input() public valueField = 'valueField';
  @Input() public textField = 'textField';
  @Input() public defaultItem: unknown | undefined;
  @Input() public filterable = true;
  @Input() public disabled = false;
  @Input() public itemDisabled = false;
  @Input() public loading = false;
  @Input() public readonly = false;
  @Input() public listHeight = 200;
  @Input() public popupSettings: unknown | undefined;
  @Input() public data = [];

  public selectionChange = new EventEmitter<unknown>();
}
