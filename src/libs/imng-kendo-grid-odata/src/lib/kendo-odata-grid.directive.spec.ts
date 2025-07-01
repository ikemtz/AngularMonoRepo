import { ImngODataGridDirective } from './kendo-odata-grid.directive';
import { waitForAsync, TestBed, ComponentFixture } from '@angular/core/testing';
import { GridComponent } from '@progress/kendo-angular-grid';
import {
  ChangeDetectorRef,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { MockGridComponent } from 'imng-kendo-grid/testing';

describe('ImngODataGridDirective', () => {
  let gridComponent: MockGridComponent;
  let fixture: ComponentFixture<MockGridComponent>;
  let directive: ImngODataGridDirective;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ChangeDetectorRef, useValue: { markForCheck: jest.fn() } },
        ImngODataGridDirective,
        { provide: GridComponent, useClass: MockGridComponent },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockGridComponent);
    gridComponent = fixture.componentInstance;
    directive = TestBed.inject(ImngODataGridDirective);
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
    expect(allSubscriptions.length).toBe(5);

    directive.ngOnDestroy();
    expect(allSubscriptions.length).toBe(0);
  });

  it('should fire AfterViewInit', () => {
    directive.odataComponent = gridComponent as never;
    directive.ngOnInit();
    directive.ngAfterViewInit();
    directive.ngOnDestroy();
  });
});
