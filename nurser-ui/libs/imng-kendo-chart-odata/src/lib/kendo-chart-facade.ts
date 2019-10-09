import { Observable } from 'rxjs';
import { GroupResult } from '@progress/kendo-data-query';
import { ODataState } from 'imng-kendo-odata';

export interface KendoChartFacade<ENTITY> {
  readonly seriesData$: Observable<ENTITY[] | GroupResult[]>;
  loadSeriesData(state: ODataState): void;
}
