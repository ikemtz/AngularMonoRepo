import { PagerSettings } from '@progress/kendo-angular-grid';
import { ODataState } from 'imng-kendo-odata';
import { IPrimeODataTableFacade } from '../../src/lib/prime-odata-table-facade';
import { Observable, of } from 'rxjs';

export class ODataTableMockFacade
  implements IPrimeODataTableFacade<{ id?: string; }>
{
  public loading$: Observable<boolean> = of(false);
  public tableODataQueryState$: Observable<ODataState> = of({});
  public tableData$: Observable<{ id?: string; }[]> = of([{ id: 'apples' }]);
  public totalRecordCount$ = of(1);
  public gridPagerSettings$: Observable<false | PagerSettings> = of({});
  public loadEntities = jest.fn();
  public reloadEntities = jest.fn();
}
