import { IKendoODataGridFacade } from 'imng-kendo-grid-odata';
import { BehaviorSubject, of } from 'rxjs';
import { testGridPagerSettings } from '.';
import { testGridODataState } from './kendo-odata-tests';

describe('OData Test Helpers', () => {
  const facade = (): IKendoODataGridFacade<unknown> => {
    const gridODataState$ = new BehaviorSubject({});
    return {
      loading$: of(false),
      gridODataState$,
      gridData$: of({ total: 1, data: [{ id: 1, value: 'xyz' }] }),

      gridPagerSettings$: of(false),
      loadEntities: jest.fn((x) => gridODataState$.next(x)),
      reloadEntities: jest.fn(),
    };
  };
  it('testGridODataState() should work', async () => {
    const result = testGridODataState(facade());
    expect(result).toMatchSnapshot();
  });

  it('testGridPagerSettings() should work', async () => {
    const result = await testGridPagerSettings(facade());
    expect(result).toMatchSnapshot();
  });
});
