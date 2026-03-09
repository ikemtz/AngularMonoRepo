import { jest } from '@jest/globals';
import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'kendo-datepicker',
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
export class IMNG_KENDO_DATEPICKER_STUB {
  @Input() public activeView: unknown = 'month';
  @Input() public adaptiveMode: unknown = 'none';
  @Input() public adaptiveSubtitle = '';
  @Input() public adaptiveTitle = '';
  @Input() public allowCaretMode = false;
  @Input() public animateCalendarNavigation = false;
  @Input() public autoCorrectParts = true;
  @Input() public autoFill = false;
  @Input() public autoSwitchKeys: string[] = [];
  @Input() public autoSwitchParts = true;
  @Input() public bottomView: unknown = 'month';
  @Input() public calendarType: unknown = 'infinite';
  @Input() public clearButton = false;
  @Input() public disabled?: boolean;
  @Input() public disabledDates?: unknown[];
  @Input() public enableMouseWheel = true;
  @Input() public fillMode: unknown;
  @Input() public focusedDate?: Date;
  @Input() public footer = false;
  @Input() public format: unknown;
  @Input() public formatPlaceholder: unknown;
  @Input() public incompleteDateValidation = false;
  @Input() public inputAttributes?: { [key: string]: string };
  @Input() public max = new Date(2099, 12, 31);
  @Input() public min = new Date(1900, 1, 1);
  @Input() public navigation: unknown;
  @Input() public placeHolder: unknown;
  @Input() public popupSettings: unknown;
  @Input() public rangeValidation = true;
  @Input() public readonly = false;
  @Input() public readOnlyInput?: boolean;
  @Input() public rounded: unknown;
  @Input() public showOtherMonthDays?: boolean;
  @Input() public size: unknown;
  @Input() public tabindex = 0;
  @Input() public topView: unknown = 'century';
  @Input() public twoDigitYearMax = 68;
  @Input() public value?: Date;
  @Input() public weekDaysFormat: unknown = 'short';
  @Input() public weekNumber = false;

  public isOpen?: boolean;

  public close = new EventEmitter<unknown>();
  public blur = new EventEmitter<unknown>();
  public focus = new EventEmitter<unknown>();
  public open = new EventEmitter<unknown>();
  public toggle = jest.fn();
  @Output() public valueChange = new EventEmitter<Date>();
}
