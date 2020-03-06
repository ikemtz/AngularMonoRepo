import { ImngODataGridDirective } from './imng-odata-grid.directive';
import { of, Subscription } from 'rxjs';

describe('ImngODataGridDirective', () => {
  it('should create an instance', () => {
    const gridComponent: any = {};
    const changeDetectorRef: any = {};
    const directive = new ImngODataGridDirective(gridComponent, changeDetectorRef);
    expect(gridComponent).toMatchSnapshot();
    expect(directive).toBeTruthy();
  });
  it('should fire OnInit', () => {
    const gridComponent: any = {};
    const changeDetectorRef: any = {};
    const directive = new ImngODataGridDirective(gridComponent, changeDetectorRef);
    directive.ngOnInit();
    expect(gridComponent).toMatchSnapshot();
    expect(directive).toBeTruthy();
  });
  it('should fire AfterViewInit', () => {
    const gridComponent: any = { dataStateChange: of({}) };
    const changeDetectorRef: any = {};
    const odataComponent: any = {
      facade: {
        gridData$: of({}),
        loading$: of(false),
        gridPagerSettings$: of(false),
        gridODataState$: of({}),
      },
      dataStateChange: jest.fn(),
    };
    const directive = new ImngODataGridDirective(gridComponent, changeDetectorRef);
    directive.odataComponent = odataComponent;
    directive.ngOnInit();
    directive.ngAfterViewInit();

    expect(gridComponent).toMatchSnapshot();
    expect(directive).toBeTruthy();
    expect(odataComponent.dataStateChange).toBeCalledTimes(1);
    expect((directive as any).subscriptions.length).toBe(5);
  });

  it('should fire AfterViewInit', () => {
    const gridComponent: any = { dataStateChange: of({}) };
    const changeDetectorRef: any = {};
    const odataComponent: any = {
      facade: {
        gridData$: of({}),
        loading$: of(false),
        gridPagerSettings$: of(false),
        gridODataState$: of({}),
      },
      dataStateChange: jest.fn(),
    };
    const directive = new ImngODataGridDirective(gridComponent, changeDetectorRef);
    directive.odataComponent = odataComponent;
    directive.ngOnInit();
    directive.ngAfterViewInit();
    directive.ngOnDestroy();
    const subscriptions: Subscription[] = (directive as any).subscriptions;
    subscriptions.forEach(subs => {
      expect(subs.closed).toBe(true);
    });
  });
});
