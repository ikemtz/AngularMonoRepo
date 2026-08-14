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
  selector: 'kendo-textarea',
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
export class IMNG_KENDO_TEXTAREA_STUB {
  @Input() public placeholder = 'placeholder';
  @Input() public title = 'title';
  @Input() public cols = 30;
  @Input() public row = 5;
  @Input() public maxlength = 250;
  @Input() public disabled = false;
  @Input() public readonly = false;
  @Input() public resizable: boolean | string = false;

  public valueChange = new EventEmitter<never>();
}
