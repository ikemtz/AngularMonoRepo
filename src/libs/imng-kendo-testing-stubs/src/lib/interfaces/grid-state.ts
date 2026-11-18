import {
  CompositeFilterDescriptor,
  GroupDescriptor,
} from '@progress/kendo-data-query';
import { SortDescriptor } from './sort-descriptor';
import { ColumnState } from './column-state';
import { GridDataResult } from './grid-data-result';

export interface GridState {
  columnState?: ColumnState[];
  currentData?: unknown[] | GridDataResult;
  filter?: CompositeFilterDescriptor;
  group?: GroupDescriptor[];
  searchFilter?: CompositeFilterDescriptor;
  skip?: number;
  sort?: SortDescriptor[];
}
