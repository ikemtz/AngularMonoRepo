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
import { Observable } from 'rxjs';

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
  @Input() public adaptiveMode = 'none';
  @Input() public adaptiveSubtitle: string | undefined;
  @Input() public adaptiveTitle = '';
  @Input() public allowCustom = false;
  @Input() public clearButton = true;
  @Input() public data: unknown = [];
  @Input() public disabled = false;
  @Input() public fillMode = undefined;
  @Input() public filterable: undefined | boolean;
  @Input() public inputAttributes: undefined | { [key: string]: string };
  @Input() public itemDisabled: undefined | (() => boolean);
  @Input() public listHeight: undefined | number;
  @Input() public loading: undefined | boolean;
  @Input() public placeholder: undefined | string;
  @Input() public popupSettings: unknown;
  @Input() public readonly = false;
  @Input() public rounded: unknown;
  @Input() public showStickyHeader = true;
  @Input() public size: unknown;
  @Input() public suggest = false;
  @Input() public tabindex = 0;
  @Input() public textField: string | undefined = 'textField';
  @Input() public value: unknown;
  @Input() public valueField: string | undefined = 'valueField';
  @Input() public valueNormalizer:
    | undefined
    | ((text: Observable<string>) => Observable<never>);
  @Input() public valuePrimitive: undefined | boolean;
  @Input() public virtual: unknown;
  public isOpen = false;
  public close = new EventEmitter<never>();
  public closed = new EventEmitter<never>();
  public filterChange = new EventEmitter<never>();
  public inputBlur = new EventEmitter<never>();
  public inputFocus = new EventEmitter<never>();
  public blur = new EventEmitter<never>();
  public focus = new EventEmitter<never>();
  public open = new EventEmitter<never>();
  public opened = new EventEmitter<never>();
  public selectionChange = new EventEmitter<never>();
  public valueChange = new EventEmitter<never>();

  public focustItemAt = jest.fn();
  public reset = jest.fn();
  public toggle = jest.fn();
}
