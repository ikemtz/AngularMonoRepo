import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, inject as inject_1 } from '@angular/core';
import { ImngPrimeODataTableBaseComponent } from './prime-odata-component-base';
import {
  ODataTableMockFacade,
  createODataTableMockFacade,
} from '../../testing/src';
import { readFirst } from 'imng-ngrx-utils/testing';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PrimeTableState } from './models/prime-table-state';

describe('PrimeODataBasedComponentRouted', () => {
  let component: PrimeODataTableTestComponent;
  let fixture: ComponentFixture<PrimeODataTableTestComponent>;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, PrimeODataTableTestComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            routerState: {
              snapshot: {
                root: {
                  queryParams: {
                    tableState:
                      'eyJ0YWtlIjoyMCwic2tpcCI6MCwic29ydCI6W3siZmllbGQiOiJpZCIsImRpciI6ImFzYyJ9XX0=',
                  },
                },
              },
            },
            navigate: jest.fn(),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimeODataTableTestComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenNthCalledWith(1, [], {
      queryParams: {
        tableState: 'e30=',
      },
      queryParamsHandling: 'merge',
      relativeTo: undefined,
      skipLocationChange: false,
    });
  });

  it('should export to Excel', async () => {
    const data = await readFirst(component.excelData());
    expect(data).toMatchSnapshot();
  });

  it('should reset', async () => {
    component.tableState = {
      ...component.tableState,
      filters: { y: [{ operator: 'contains', value: 56 }] },
      multiSortMeta: [
        { field: 'y', order: 1 },
        { field: 'z', order: -1 },
      ],
    };
    component.resetFilters();
    expect(component.tableState).toMatchSnapshot();
    expect(router.navigate).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenNthCalledWith(1, [], {
      queryParams: {
        tableState: 'e30=',
      },
      queryParamsHandling: 'merge',
      relativeTo: undefined,
      skipLocationChange: false,
    });
  });
});
const initialGridState: PrimeTableState = {
  select: ['x', 'y', 'z'],
  multiSortMeta: [{ field: 'x', order: 1 }],
  first: 20,
  filters: { x: [{ matchMode: 'equals', operator: 'all', value: 1 }] },
};
@Component({
  selector: 'imng-test-component',
  standalone: true,
  imports: [CommonModule],
  template: '<h1>{{ hasHiddenColumns$ | async }}</h1>',
})
export class PrimeODataTableTestComponent extends ImngPrimeODataTableBaseComponent<
  object,
  ODataTableMockFacade
> {
  override readonly router: Router;

  props = {};
  constructor() {
    const router = inject_1(Router);

    super(createODataTableMockFacade(), initialGridState, router);
  
    this.router = router;
  }
}
