import { ODataQuery } from 'imng-odata-client';
import { IPrimeODataTableFacade } from 'imng-prime-table-odata';
import { Observable, of } from 'rxjs';

export class ODataTableMockFacade
  implements IPrimeODataTableFacade<{ id?: string | null }>
{
  public loading$: Observable<boolean> = of(false);
  public tableODataQueryState$: Observable<ODataQuery> = of({});
  public tableData$: Observable<{ id?: string | null }[]> = of([
    { id: 'apples' },
  ]);
  public totalRecordCount$ = of(1);
  public gridPagerSettings$: Observable<false> = of(false);
  public loadEntities = jest.fn();
  public reloadEntities = jest.fn();
}
