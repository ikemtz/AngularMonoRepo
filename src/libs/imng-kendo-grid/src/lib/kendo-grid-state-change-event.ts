import { DataStateChangeEvent } from '@progress/kendo-angular-grid';

export interface GridStateChangeEvent extends DataStateChangeEvent {
  selectors?: string[];
  count?: boolean;
}
