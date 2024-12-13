import { ChangeDetectorRef } from '@angular/core';
import { IdType } from 'imng-nrsrx-client-utils';
import { FilterMetadata, LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import {
  MockTable,
  createODataTableMockFacade,
  ODataTableMockFacade,
} from '../../testing/src';
import { PrimeTableState } from './models/prime-table-state';
import { ImngPrimeODataTableBaseComponent } from './prime-odata-component-base';
import { IPrimeODataTableFacade } from './prime-odata-table-facade';
import { ImngPrimeODataTableDirective } from './prime-odata-table.directive';
import { IEnumValue } from 'openapi-ts-generator/interfaces';

describe('ImngPrimeODataTableDirective', () => {
  let tableComponent: Table;
  let changeDetectorRef: ChangeDetectorRef;
  let directive: ImngPrimeODataTableDirective;
  let odataComponent: ImngPrimeODataTableBaseComponent<
    { id?: IdType | null },
    ODataTableMockFacade
  >;
  let facade: IPrimeODataTableFacade<{ id?: IdType | null }>;

  beforeEach(() => {
    tableComponent = new MockTable() as unknown as Table;
    changeDetectorRef = {} as ChangeDetectorRef;
    odataComponent = {
      facade: createODataTableMockFacade({
        tableState$: new Subject<PrimeTableState>(),
      }),
      validateSortParameters: (x) => x,
    } as never;
    directive = new ImngPrimeODataTableDirective(
      tableComponent,
      changeDetectorRef,
    );
    directive.odataTableComponent = odataComponent;
    facade = directive.odataTableComponent.facade;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
    expect(facade).toBeTruthy();
  });
  it('should fire OnInit', () => {
    directive.ngOnInit();
    expect(tableComponent).toMatchSnapshot();
    expect(directive).toBeTruthy();
  });
  it('should handle lazyload', () => {
    directive.ngOnInit();
    tableComponent.globalFilterFields = ['xyz'];
    (tableComponent.onLazyLoad as unknown as Subject<LazyLoadEvent>).next({
      first: 20,
      multiSortMeta: [{ field: 'x', order: 1 }],
      filters: {
        xyz: [
          { value: '💩💩', operator: 'and', matchMode: 'contains' },
        ] as FilterMetadata,
        global: [{ operator: 'or', matchMode: 'contains' }] as FilterMetadata,
      },
      globalFilter: 'b',
    });
    expect(tableComponent).toMatchSnapshot();
    expect(facade.loadEntities).toHaveBeenCalledTimes(1);
  });
  it('should handle lazyload no sorting', () => {
    directive.ngOnInit();
    (tableComponent.onLazyLoad as unknown as Subject<LazyLoadEvent>).next({
      first: 20,
      filters: {
        xyz: [
          { value: '💩💩', operator: 'and', matchMode: 'contains' },
        ] as FilterMetadata,
      },
    });
    expect(tableComponent).toMatchSnapshot();
    expect(facade.loadEntities).toHaveBeenCalledTimes(1);
  });
  it('should handle lazyload no filters', () => {
    directive.ngOnInit();
    (tableComponent.onLazyLoad as unknown as Subject<LazyLoadEvent>).next({
      first: 20,
      multiSortMeta: [{ field: 'x', order: 1 }],
    });
    expect(tableComponent).toMatchSnapshot();
    expect(facade.loadEntities).toHaveBeenCalledTimes(1);
  });

  it('should handle tableState Changes', () => {
    directive.ngOnInit();
    (
      odataComponent.facade.tableState$ as unknown as Subject<PrimeTableState>
    ).next({
      first: 20,
      multiSortMeta: [{ field: 'x', order: 1 }],
      filters: {
        xyz: [{ value: '💩💩', operator: 'and', matchMode: 'contains' }],
      },
    });
    expect(tableComponent).toMatchSnapshot();
    expect(facade.loadEntities).toHaveBeenCalledTimes(0);
  });

  it('should handle tableState Changes no filters', () => {
    directive.ngOnInit();
    (
      odataComponent.facade.tableState$ as unknown as Subject<PrimeTableState>
    ).next({
      first: 20,
      multiSortMeta: [{ field: 'x', order: 1 }],
    });
    expect(tableComponent).toMatchSnapshot();
    expect(facade.loadEntities).toHaveBeenCalledTimes(0);
  });

  it('should handle tableState Changes no sorting', () => {
    directive.ngOnInit();
    (
      odataComponent.facade.tableState$ as unknown as Subject<PrimeTableState>
    ).next({
      first: 20,
      filters: {
        xyz: [{ value: '💩💩', operator: 'and', matchMode: 'contains' }],
      },
    });
    expect(tableComponent).toMatchSnapshot();
    expect(facade.loadEntities).toHaveBeenCalledTimes(0);
  });
  it('should fire destory', () => {
    directive.ngOnInit();
    directive.ngOnDestroy();
    expect(directive.allSubscriptions.length).toBe(0);
  });

  it('should support getEnumKey', () => {
    const enums: IEnumValue[] = [
      { key: 1, name: 'value1', displayText: 'Value 1' },
      { key: 2, name: 'value2', displayText: 'Value 2' },
    ];
    expect(directive.odataTableComponent.getEnumKey(enums, 'value1')).toEqual(
      1,
    );
  });
});
