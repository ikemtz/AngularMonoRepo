import { ChangeDetectorRef } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { MockTable, createODataGridMockFacade, ODataTableMockFacade } from '../../testing/src';
import { ImngPrimeODataTableBaseComponent } from './prime-odata-component-base';
import { IPrimeODataTableFacade } from './prime-odata-table-facade';
import { ImngPrimeODataTableDirective } from './prime-odata-table.directive';

describe('ImngPrimeODataTableDirective', () => {

  let tableComponent: Table;
  let changeDetectorRef: ChangeDetectorRef;
  let directive: ImngPrimeODataTableDirective;
  let odataComponent: ImngPrimeODataTableBaseComponent<{ id?: string | null; }, ODataTableMockFacade>;
  let facade: IPrimeODataTableFacade<{ id?: string; }>;

  beforeEach(() => {
    tableComponent = new MockTable() as Table;
    changeDetectorRef = {} as ChangeDetectorRef;
    odataComponent = {
      facade: createODataGridMockFacade(),
    } as never;
    directive = new ImngPrimeODataTableDirective(tableComponent, changeDetectorRef);
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
    (tableComponent.onLazyLoad as unknown as Subject<LazyLoadEvent>).next({ first: 20 });
    expect(tableComponent).toMatchSnapshot();
    expect(facade.loadEntities).toBeCalledTimes(1);
  });
  it('should fire destory', () => {
    directive.ngOnInit();
    directive.ngOnDestroy();
    expect(directive.allSubscriptions.length).toBe(0);
  });
});
