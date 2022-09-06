import {
  IPrimeODataTableFacade,
  PrimeTableState,
} from 'imng-prime-table-odata';
import { Observable, of } from 'rxjs';

export class ODataTableMockFacade
  implements IPrimeODataTableFacade<{ id?: string | null }>
{
  public loading$: Observable<boolean> = of(false);
  public tableState$: Observable<PrimeTableState> = of({});
  public tableData$: Observable<{ id?: string | null }[]> = of([
    { id: 'apples' },
  ]);
  public totalRecordCount$ = of(1);
  public loadEntities = jest.fn();
  public reloadEntities = jest.fn();
}
