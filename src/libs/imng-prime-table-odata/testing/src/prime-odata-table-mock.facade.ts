import { IdType } from 'imng-nrsrx-client-utils';
import {
  IPrimeODataTableFacade,
  PrimeTableState,
} from 'imng-prime-table-odata';
import { Observable, of } from 'rxjs';

export class ODataTableMockFacade
  implements IPrimeODataTableFacade<{ id?: IdType | null }>
{
  public activeEffectCount$: Observable<number> = of(0);
  public tableState$: Observable<PrimeTableState> = of({});
  public tableData$: Observable<{ id?: IdType | null }[]> = of([
    { id: 'apples' },
  ]);
  public totalRecordCount$ = of(1);
  public loadEntities = jest.fn();
  public reloadEntities = jest.fn();
}
