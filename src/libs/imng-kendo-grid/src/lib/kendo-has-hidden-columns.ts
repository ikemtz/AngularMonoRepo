import { GridComponent } from '@progress/kendo-angular-grid';
import { map } from 'rxjs';

export function hasHiddenColumns(gridComponent: GridComponent) {
  return map(() => gridComponent.columns.some((s) => s.hidden));
}
