import { IMNG_KENDO_GRID_STUB } from 'imng-kendo-testing-stubs';
import { GridComponent } from '@progress/kendo-angular-grid';

export function provideGridStubComponent() {
  return { provide: GridComponent, useClass: IMNG_KENDO_GRID_STUB };
}
