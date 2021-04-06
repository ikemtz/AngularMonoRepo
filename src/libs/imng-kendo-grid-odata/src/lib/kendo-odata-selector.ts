
import { MemoizedSelector } from '@ngrx/store';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { ODataState } from 'imng-kendo-odata';

export interface KendoODataSelector {
  getLoading: MemoizedSelector<Record<string, unknown>, boolean>;
  getError: MemoizedSelector<Record<string, unknown>, unknown>;
  getGridData: MemoizedSelector<Record<string, unknown>, GridDataResult>;
  getGridODataState: MemoizedSelector<Record<string, unknown>, ODataState>;
  getPagerSettings: MemoizedSelector<Record<string, unknown>, false | PagerSettings>;
}
