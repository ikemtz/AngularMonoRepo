import {
  Component,
  ChangeDetectionStrategy,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Input,
  EventEmitter,
  ElementRef,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { jest } from '@jest/globals';
import { SVGIcon } from '../interfaces/svg-icon';
import {
  IconShowOptions,
  InputFillMode,
  InputRounded,
  InputSize,
  InputType,
} from '../type';

@Component({
  selector: 'kendo-textbox',
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
export class IMNG_KENDO_TEXTBOX_STUB implements ControlValueAccessor {
  //NOSONAR
  @Input() public placeholder = 'placeholder';
  @Input() public clearButton = false;
  @Input() public maxlength = 100;
  @Input() public clearButtonIcon?: string;
  @Input() public clearButtonSvgIcon?: SVGIcon;
  @Input() public disabled? = false;
  @Input() public errorIcon?: string;
  @Input() public errorSvgIcon?: SVGIcon;
  @Input() public fillMode?: InputFillMode;
  @Input() public inputAttributes?: { [key: string]: string };
  @Input() public readonly? = false;
  @Input() public rounded?: InputRounded;
  @Input() public selectOnFocus? = false;
  @Input() public showErrorIcon?: IconShowOptions = false;
  @Input() public showSuccessIcon?: IconShowOptions = false;
  @Input() public size?: InputSize;
  @Input() public successIcon?: string;
  @Input() public successSvgIcon?: SVGIcon;
  @Input() public tabindex = 0;
  @Input() public title?: string;
  @Input() public type?: InputType = 'text';
  @Input() public value?: string;

  public valueChange = new EventEmitter<never>();
  public inputBlur = new EventEmitter<never>();
  public inputFocus = new EventEmitter<never>();

  public input?: ElementRef<never>;
  public blur = new EventEmitter<never>();
  public focus = new EventEmitter<never>();

  public writeValue = jest.fn();
  public registerOnChange = jest.fn();
  public registerOnTouched = jest.fn();
  public setDisabledState? = jest.fn();

  public svgIcon = jest.fn();
  public handleInputFocus = jest.fn();
  public handleInputBlur = jest.fn();
  public handleInput = jest.fn();
  public clearTitle = jest.fn();
  public checkClearButton = jest.fn();
  public clearValue = jest.fn();
  public showErrorsInitial = jest.fn();
}
