import { MemoizedSelector } from '@ngrx/store';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { ODataState } from 'imng-kendo-odata';

export interface KendoODataSelector<Entity> {
  getLoading: MemoizedSelector<object, boolean>;
  getError: MemoizedSelector<object, any>;
  getGridDataResult: MemoizedSelector<object, GridDataResult>;
  getCurrentEntity: MemoizedSelector<object, Entity>;
  getGridODataState: MemoizedSelector<object, ODataState>;
  getPagerSettings: MemoizedSelector<object, false | PagerSettings>;
}
