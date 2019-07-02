import { MemoizedSelector } from '@ngrx/store';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { ODataGridState } from './odata-grid-state';

export interface KendoODataSelector<Entity> {
  getLoading: MemoizedSelector<object, boolean>;
  getError: MemoizedSelector<object, any>;
  getGridDataResult: MemoizedSelector<object, GridDataResult>;
  getCurrentEntity: MemoizedSelector<object, Entity>;
  getGridRowCount: MemoizedSelector<object, number>;
  getGridODataState: MemoizedSelector<object, ODataGridState>;
  getPagerSettings: MemoizedSelector<object, false | PagerSettings>;
  getCurrentEntityHasValue: MemoizedSelector<object, boolean>;
}
