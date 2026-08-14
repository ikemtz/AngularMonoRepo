import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { InputRounded, InputSize } from '../type';
import { ControlValueAccessor } from '@angular/forms';
import { jest } from '@jest/globals';

@Component({
  selector: 'kendo-switch',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_SWITCH_STUB
  implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit
{
  public ngOnDestroy = jest.fn();
  public ngOnInit = jest.fn();
  public writeValue = jest.fn();
  public registerOnChange = jest.fn();
  public registerOnTouched = jest.fn();
  public setDisabledState? = jest.fn();
  public ngAfterViewInit = jest.fn();

  @Input() public checked?: boolean;
  @Input() public disabled? = false;
  @Input() public offLabel?: string;
  @Input() public onLabel?: string;
  @Input() public readonly? = false;
  @Input() public size?: InputSize;
  @Input() public tabindex? = 0;
  @Input() public thumbRounded?: InputRounded;
  @Input() public trackRounded?: InputRounded;

  public blur = new EventEmitter<never>();
  public focus = new EventEmitter<never>();
  public valueChange = new EventEmitter<never>();
}
