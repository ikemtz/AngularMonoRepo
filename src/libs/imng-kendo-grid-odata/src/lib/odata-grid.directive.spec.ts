import { ImngODataGridDirective } from './kendo-odata-grid.directive';
import { of } from 'rxjs';
import { GridComponent } from '@progress/kendo-angular-grid';
import { ChangeDetectorRef } from '@angular/core';

describe('ImngODataGridDirective', () => {
  it('should create an instance', () => {
    const gridComponent = {};
    const changeDetectorRef = {};
    const directive = new ImngODataGridDirective(gridComponent as GridComponent, changeDetectorRef as ChangeDetectorRef);
    expect(gridComponent).toMatchSnapshot();
    expect(directive).toBeTruthy();
  });
  it('should fire OnInit', () => {
    const gridComponent = {};
    const changeDetectorRef = {};
    const odataComponent = {
      facade: {
        gridData$: of({}),
        loading$: of(true),
        gridPagerSettings$: of(false),
        gridODataState$: of({}),
      },
      dataStateChange: jest.fn(),
    };
    const directive = new ImngODataGridDirective(gridComponent as GridComponent, changeDetectorRef as ChangeDetectorRef);
    directive.odataComponent = odataComponent as never;
    directive.ngOnInit();
    expect(gridComponent).toMatchSnapshot();
    expect(directive).toBeTruthy();
  });
  it('should fire AfterViewInit', () => {
    const gridComponent = { dataStateChange: of({}) };
    const changeDetectorRef = {};
    const odataComponent = {
      facade: {
        gridData$: of({}),
        loading$: of(false),
        gridPagerSettings$: of(false),
        gridODataState$: of({}),
      },
      dataStateChange: jest.fn(),
    };
    const directive = new ImngODataGridDirective(gridComponent as GridComponent, changeDetectorRef as ChangeDetectorRef);
    directive.odataComponent = odataComponent as never;
    directive.ngOnInit();
    directive.ngAfterViewInit();

    expect(gridComponent).toMatchSnapshot();
    expect(directive).toBeTruthy();
    expect(odataComponent.dataStateChange).toBeCalledTimes(1);
    expect((directive as unknown as { allSubscriptions: []; }).allSubscriptions.length).toBe(5);
  });

  it('should fire AfterViewInit', () => {
    const gridComponent = { dataStateChange: of({}) };
    const changeDetectorRef = {};
    const odataComponent = {
      facade: {
        gridData$: of({}),
        loading$: of(false),
        gridPagerSettings$: of(false),
        gridODataState$: of({}),
      },
      dataStateChange: jest.fn(),
    };
    const directive = new ImngODataGridDirective(gridComponent as GridComponent, changeDetectorRef as ChangeDetectorRef);
    directive.odataComponent = odataComponent as never;
    directive.ngOnInit();
    directive.ngAfterViewInit();
    directive.ngOnDestroy();
  });
});
