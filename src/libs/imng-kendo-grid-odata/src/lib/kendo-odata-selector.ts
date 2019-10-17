import { MemoizedSelector } from '@ngrx/store';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { ODataState } from 'imng-kendo-odata';

export interface KendoODataSelector {
  getLoading: MemoizedSelector<object, boolean>;
  getError: MemoizedSelector<object, any>;
  getGridData: MemoizedSelector<object, GridDataResult>;
  getGridODataState: MemoizedSelector<object, ODataState>;
  getPagerSettings: MemoizedSelector<object, false | PagerSettings>;
}
