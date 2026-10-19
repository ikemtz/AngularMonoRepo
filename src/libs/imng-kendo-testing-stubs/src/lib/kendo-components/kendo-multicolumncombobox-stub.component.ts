import { jest } from '@jest/globals';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  QueryList,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import {
  AdaptiveMode,
  DropDownFillMode,
  DropDownRounded,
  DropDownSize,
} from '../types/dropdowns';
import { InputAttributesType, ItemDisabledFn } from '../type';
import { PopupSettings } from '../interfaces/popup-settings';
import { Observable } from 'rxjs';
import { VirtualizationSettings } from '../interfaces/virtualization-settings';
import { IMNG_KENDO_COMBOBOX_COLUMN_STUB } from './kendo-combobox-column-stub.component';

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
  @Input() public adaptiveMode: AdaptiveMode = 'none';
  @Input() public adaptiveSubtitle?: string;
  @Input() public adaptiveTitle = '';
  @Input() public allowCustom = false;
  @Input() public clearButton = true;
  @Input() public data?: never;
  @Input() public disabled?: boolean;
  @Input() public fillMode?: DropDownFillMode;
  @Input() public filterable?: boolean;
  @Input() public inputAttributes?: InputAttributesType;
  @Input() public itemDisabled?: ItemDisabledFn;
  @Input() public listHeight?: number;
  @Input() public loading?: boolean;
  @Input() public placeholder = '';
  @Input() public popupSettings?: PopupSettings;
  @Input() public readonly = false;
  @Input() public rounded?: DropDownRounded;
  @Input() public showStickyHeader = true;
  @Input() public size?: DropDownSize;
  @Input() public suggest = false;
  @Input() public tabindex = 0;
  @Input() public textField?: string;
  @Input() public value?: never;
  @Input() public valueField?: string;
  @Input() public valueNormalizer?: (
    text: Observable<string>,
  ) => Observable<never>;
  @Input() public valuePrimitive?: boolean;
  @Input() public virtual?: boolean | VirtualizationSettings;

  public columns?: QueryList<IMNG_KENDO_COMBOBOX_COLUMN_STUB>;
  public isOpen?: boolean;

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

  public focusItemAt = jest.fn();
  public reset = jest.fn();
  public toggle = jest.fn();
}
