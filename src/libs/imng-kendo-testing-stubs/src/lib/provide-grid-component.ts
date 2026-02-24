import { IMNG_KENDO_GRID_STUB } from './kendo-grid-stub.component';
import { GridComponent } from '@progress/kendo-angular-grid';

export function provideGridComponent() {
  return { provide: GridComponent, useClass: IMNG_KENDO_GRID_STUB };
}
