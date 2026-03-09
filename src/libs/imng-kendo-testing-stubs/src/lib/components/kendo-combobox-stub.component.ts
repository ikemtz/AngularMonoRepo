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
import { AdaptiveMode, DropDownFillMode } from '../types/dropdowns';
import { InputAttributesType, ItemDisabledFn } from '../type';

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
  @Input() public adaptiveMode: AdaptiveMode = 'none';
  @Input() public adaptiveSubtitle?: string;
  @Input() public adaptiveTitle = '';
  @Input() public allowCustom = false;
  @Input() public clearButton = true;
  @Input() public data?: unknown;
  @Input() public disabled?: boolean;
  @Input() public fillMode?: DropDownFillMode;
  @Input() public filterable?: boolean;
  @Input() public inputAttributes?: InputAttributesType;
  @Input() public itemDisabled?: ItemDisabledFn;
  @Input() public listHeight?: number;
  @Input() public loading?: boolean;
  @Input() public placeholder?: string;
  @Input() public popupSettings: unknown;
  @Input() public readonly = false;
  @Input() public rounded: unknown;
  @Input() public showStickyHeader = true;
  @Input() public size: unknown;
  @Input() public suggest = false;
  @Input() public tabindex = 0;
  @Input() public textField?: string;
  @Input() public value: unknown;
  @Input() public valueField?: string;
  @Input() public valueNormalizer?: (
    text: Observable<string>,
  ) => Observable<never>;
  @Input() public valuePrimitive?: boolean;
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
