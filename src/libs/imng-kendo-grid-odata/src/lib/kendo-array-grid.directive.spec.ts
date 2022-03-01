import { ImngArrayGridDirective } from './kendo-array-grid.directive';
import { Subject } from 'rxjs';
import { ODataGridStateChangeEvent } from './kendo-odata-grid-state-change-event';
import { ColumnVisibilityChangeEvent, PageChangeEvent } from '@progress/kendo-angular-grid';
import { CompositeFilterDescriptor, SortDescriptor } from '@progress/kendo-data-query';
import { ODataResult } from 'imng-kendo-odata';

describe('ImngArrayGridDirective', () => {
  const directive = new ImngArrayGridDirective({
    dataStateChange: new Subject<ODataGridStateChangeEvent>(),
    pageChange: new Subject<PageChangeEvent>(),
    sortChange: new Subject<SortDescriptor>(),
    filterChange: new Subject<CompositeFilterDescriptor>(),
    columnVisibilityChange: new Subject<ColumnVisibilityChangeEvent>(),
  } as never);

  beforeEach(() => {
    directive.arrayComponent = {
      state: {},
      dataStateChange: jest.fn(),
      pageChange: jest.fn(),
      sortChange: jest.fn(),
      filterChange: jest.fn(),
      markForCheck: jest.fn(),
      gridData$: new Subject<ODataResult<unknown>>(),
    } as never;

    directive.ngOnInit();
  });
  afterEach(() => {
    directive.ngOnDestroy();
  });

  it('should handle dataStateChange', () => {
    directive.gridComponent.dataStateChange.next({ take: 3, skip: 7, sort: [{ field: 'id', dir: 'desc' }] });
    expect(directive.arrayComponent.state).toStrictEqual({ take: 3, skip: 7, sort: [{ field: 'id', dir: 'desc' }] });
    expect((directive as unknown as { _gridData })._gridData).toMatchSnapshot();
    expect(directive.arrayComponent.dataStateChange).toBeCalledTimes(1);
    expect(directive.arrayComponent.dataStateChange).toBeCalledWith({
      skip: 7,
      sort: [{ dir: 'desc', field: 'id' }],
      take: 3,
    });
  });

  it('should handle pageChange', () => {
    directive.gridComponent.pageChange.next({ take: 3, skip: 7 });
    expect(directive.arrayComponent.pageChange).toBeCalledTimes(1);
    expect(directive.arrayComponent.pageChange).toBeCalledWith({ skip: 7, take: 3 });
  });

  it('should handle sortChange', () => {
    directive.gridComponent.sortChange.next([{ field: 'id', dir: 'desc' }]);
    expect(directive.arrayComponent.sortChange).toBeCalledTimes(1);
    expect(directive.arrayComponent.sortChange).toBeCalledWith([{ dir: 'desc', field: 'id' }]);
  });

  it('should handle filterChange', () => {
    directive.gridComponent.filterChange.next({ logic: 'and', filters: [{ field: 'x', operator: 'eq', value: 'x' }] });
    expect(directive.arrayComponent.filterChange).toBeCalledTimes(1);
    expect(directive.arrayComponent.filterChange).toBeCalledWith({
      filters: [{ field: 'x', operator: 'eq', value: 'x' }],
      logic: 'and',
    });
  });

  it('should handle gridData change', () => {
    directive.arrayComponent.gridData$.next({ total: 1, data: [{ field: 'x', operator: 'eq', value: 'x' }] });
    expect(directive.gridComponent.data).toStrictEqual({
      total: 1,
      data: [{ field: 'x', operator: 'eq', value: 'x' }],
    });
  });

  it('should handle ngAfterViewInit', () => {
    directive.ngAfterViewInit();
    expect(directive.arrayComponent.markForCheck).toBeCalledTimes(1);
  });

  it('should destroy', () => {
    directive.ngOnDestroy();
    expect(directive.allSubscriptions.length).toBe(0);
  });
});
