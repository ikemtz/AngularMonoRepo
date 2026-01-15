import { IMNG_KENDO_GRID_ODATA } from './kendo-odata-grid.directive';
import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { GridComponent } from '@progress/kendo-angular-grid';
import {
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { MockGridComponent } from 'imng-kendo-grid/testing';

describe('IMNG_KENDO_GRID_ODATA', () => {
  let gridComponent: MockGridComponent;
  let fixture: ComponentFixture<MockGridComponent>;
  let directive: IMNG_KENDO_GRID_ODATA;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: jest.fn() } },
        IMNG_KENDO_GRID_ODATA,
        { provide: GridComponent, useClass: MockGridComponent },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockGridComponent);
    gridComponent = fixture.componentInstance;
    directive = TestBed.inject(IMNG_KENDO_GRID_ODATA);
    fixture.detectChanges();
  });
  it('should create an instance', () => {
    expect({
      data: gridComponent.data,
      sortable: gridComponent.sortable,
      filterable: gridComponent.filterable,
    }).toMatchSnapshot();
    expect(directive).toBeTruthy();
  });
  it('should fire OnInit', () => {
    expect({
      data: gridComponent.data,
      sortable: gridComponent.sortable,
      filterable: gridComponent.filterable,
    }).toMatchSnapshot();
    expect(directive).toBeTruthy();
  });
  it('should fire AfterViewInit', () => {
    jest.spyOn(gridComponent.dataStateChange, 'subscribe');
    directive.odataComponent = gridComponent as never;
    directive.ngOnInit();
    directive.ngAfterViewInit();

    expect({
      data: gridComponent.data,
      sortable: gridComponent.sortable,
      filterable: gridComponent.filterable,
    }).toMatchSnapshot();
    expect(directive).toBeTruthy();
    expect(gridComponent.dataStateChange.subscribe).toHaveBeenCalledTimes(0);
    const allSubscriptions = (directive as unknown as { allSubscriptions: [] })
      .allSubscriptions;
    expect(allSubscriptions).toHaveLength(5);

    directive.ngOnDestroy();
    expect(allSubscriptions).toHaveLength(0);
  });
});
