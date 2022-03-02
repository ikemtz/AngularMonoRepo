import { MemoizedSelector } from '@ngrx/store';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { ODataState } from 'imng-kendo-odata';

export interface KendoODataSelector {
  getLoading: MemoizedSelector<unknown, boolean>;
  getError: MemoizedSelector<unknown, unknown>;
  getGridData: MemoizedSelector<unknown, GridDataResult>;
  getGridODataState: MemoizedSelector<unknown, ODataState>;
  getPagerSettings: MemoizedSelector<unknown, false | PagerSettings>;
}
