import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  Input,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { of } from 'rxjs';
import { jest } from '@jest/globals';

@Component({
  selector: 'kendo-grid-excel',
  template: '',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
})
export class IMNG_KENDO_GRID_EXCEL_STUB {
  @Input() public fileName = '';
  @Input() public fetchData = jest.fn(() => of({ data: [], total: 0 }));
}
