import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { LoaderSize, LoaderThemeColor, LoaderType } from '../type';

@Component({
  selector: 'kendo-loader',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_LOADER_STUB implements AfterViewInit {
  @Input() public size?: LoaderSize;
  @Input() public themeColor?: LoaderThemeColor;
  @Input() public type?: LoaderType = 'pulsing';
  public ngAfterViewInit = jest.fn();
}
