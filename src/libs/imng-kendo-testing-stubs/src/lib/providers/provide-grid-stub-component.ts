import { IMNG_KENDO_GRID_STUB } from '../components/kendo-grid-stub.component';
import { GridComponent } from '@progress/kendo-angular-grid';

export function provideGridStubComponent() {
  return { provide: GridComponent, useClass: IMNG_KENDO_GRID_STUB };
}
