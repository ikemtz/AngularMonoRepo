import { MemoizedSelector } from '@ngrx/store';
import { GridDataResult, PagerSettings } from '@progress/kendo-angular-grid';
import { ODataState } from 'imng-kendo-odata';

export interface KendoODataSelector<PartialState> {
  getLoading: (partialState: PartialState) => boolean;
  getError: MemoizedSelector<Record<string, unknown>, unknown>;
  getGridData: (partialState: PartialState) => GridDataResult;
  getGridODataState: (partialState: PartialState) => ODataState;
  getPagerSettings: (partialState: PartialState) => false | PagerSettings;
}
